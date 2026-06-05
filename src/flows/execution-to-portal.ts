/**
 * execution-to-portal.ts
 *
 * Constrói o ClientPortalData a partir do estado VIVO da ServiceExecution,
 * não mais do template original. O portal reflete o que está acontecendo
 * agora — etapas dinâmicas, ocorrências, aprovações, etc.
 */

import type { ServiceExecution } from "@/types/execution";
import type {
  ClientPortalData,
  PortalApproval,
  PortalJourneyStep,
  PortalTimelineItem,
} from "@/types/portal";
import { portalGradient } from "@/modules/client-portal/portal-utils";

interface BuildPortalFromExecutionOptions {
  token: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  companyName?: string;
  responsibleName?: string;
  serviceTheme?: ClientPortalData["serviceTheme"];
}

function inferJourneyStep(execution: ServiceExecution): PortalJourneyStep {
  if (execution.approvals.some((a) => a.status === "pendente")) {
    return "aguardando_aprovacao";
  }
  const allDone = execution.steps.every((s) => s.status === "concluida");
  if (allDone) return "finalizado";
  if (execution.currentStepIndex === 0 && execution.steps[0]?.status === "atual") {
    return "em_execucao";
  }
  return "em_execucao";
}

function buildJourneySteps(current: PortalJourneyStep) {
  const order: PortalJourneyStep[] = [
    "recebido",
    "em_analise",
    "em_execucao",
    "aguardando_aprovacao",
    "finalizado",
  ];
  const labels: Record<PortalJourneyStep, string> = {
    recebido: "Recebido",
    em_analise: "Em análise",
    em_execucao: "Em execução",
    aguardando_aprovacao: "Aguardando aprovação",
    finalizado: "Finalizado",
  };
  const currentIdx = order.indexOf(current);
  return order.map((id, i) => ({
    id,
    label: labels[id],
    completed: i < currentIdx,
    current: i === currentIdx,
  }));
}

export function buildPortalFromExecution(
  execution: ServiceExecution,
  opts: BuildPortalFromExecutionOptions
): ClientPortalData {
  const { token, serviceId, serviceTitle, clientName } = opts;

  const completedSteps = execution.steps.filter((s) => s.status === "concluida").length;
  const progressPercent = execution.steps.length > 0
    ? Math.round((completedSteps / execution.steps.length) * 100)
    : 0;

  const currentStep = execution.steps[execution.currentStepIndex];
  const journeyStep = inferJourneyStep(execution);

  const timeline: PortalTimelineItem[] = [];

  timeline.push({
    id: `${token}-welcome`,
    type: "status",
    title: "Serviço iniciado",
    description: `${clientName} — acompanhe cada etapa em tempo real.`,
    createdAt: execution.timeline[execution.timeline.length - 1]?.createdAt ?? new Date().toISOString(),
    statusTone: "info",
    feedSize: "compact",
  });

  const visibleSteps = execution.steps.filter(
    (s) => s.clientVisible !== false
  );

  visibleSteps.slice(0, 6).forEach((step, i) => {
    const done = step.status === "concluida";
    const active = step.status === "atual";
    timeline.push({
      id: `${token}-step-${i}`,
      type: "etapa",
      title: step.name,
      description: done
        ? "Etapa concluída pela equipe."
        : active
          ? "Em andamento agora."
          : "Prevista no plano do serviço.",
      createdAt: new Date(Date.now() - (visibleSteps.length - i) * 3_600_000).toISOString(),
      statusTone: done ? "success" : active ? "info" : "neutral",
      feedSize: active ? "large" : "compact",
    });
  });

  execution.occurrences.slice(0, 3).forEach((occ) => {
    timeline.push({
      id: `${token}-occ-${occ.id}`,
      type: "ocorrencia",
      title: occ.title,
      description: occ.description,
      createdAt: occ.registeredAt,
      statusTone: "warning",
      feedSize: "compact",
    });
  });

  const media = execution.uploads.map((u) => ({
    id: u.id,
    type: "foto" as const,
    title: u.name,
    thumbnailUrl: u.previewUrl,
    gradient: portalGradient(u.id),
    createdAt: u.createdAt,
    stepLabel: currentStep?.name,
  }));

  const pendingApprovals: PortalApproval[] = execution.approvals
    .filter((a) => a.status === "pendente")
    .map((a) => ({
      id: a.id,
      stepName: a.stepName,
      status: "pendente",
      requestedAt: a.requestedAt,
      note: a.note ?? "Revise o progresso e confirme para liberar a próxima etapa.",
      mediaGradient: portalGradient(`${token}-${a.id}`),
      mediaLabel: "Evidências da etapa",
    }));

  const pendingApproval = pendingApprovals[0];

  const nextPendingStep = execution.steps.find((s) => s.status === "pendente");

  return {
    token,
    serviceId,
    serviceTitle,
    companyName: opts.companyName ?? clientName,
    responsibleName: opts.responsibleName ?? "Equipe Operiva",
    serviceTheme: opts.serviceTheme ?? "default",
    currentJourneyStep: journeyStep,
    progressPercent,
    statusLabel: currentStep
      ? `Etapa atual: ${currentStep.name}`
      : "Em preparação",
    lastUpdate: new Date().toISOString(),
    nextStep: nextPendingStep?.name,
    journeySteps: buildJourneySteps(journeyStep),
    timeline,
    media,
    pendingApproval,
    pendingApprovals,
    liveActivity: {
      teamMemberName: "Equipe de campo",
      actionLabel: `Atualizou «${currentStep?.name ?? "serviço"}»`,
    },
  };
}

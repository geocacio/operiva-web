import type { OperivaTemplate } from "@/types/operiva-template";
import type {
  ClientPortalData,
  PortalJourneyStep,
  PortalTimelineItem,
} from "@/types/portal";
import type { ServiceExecution } from "@/types/execution";
import { portalGradient } from "@/modules/client-portal/portal-utils";

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

export function buildPortalFromTemplate(
  template: OperivaTemplate,
  serviceId: string,
  token: string,
  serviceTitle: string,
  clientName: string,
  execution: ServiceExecution
): ClientPortalData {
  const vis = template.clientVisibility;
  const visibleSteps = template.steps.filter(
    (s) => s.clientVisible && (!vis.hideInternalSteps || s.needsApproval || s.needsPhoto)
  );

  const currentStep = execution.steps[execution.currentStepIndex];
  const progressPercent = Math.round(
    (execution.steps.filter((s) => s.status === "concluida").length /
      execution.steps.length) *
      100
  );

  const timeline: PortalTimelineItem[] = [];

  if (vis.showTimeline) {
    timeline.push({
      id: `${token}-welcome`,
      type: "status",
      title: "Serviço recebido pela Operiva",
      description: `${clientName} — acompanhe cada etapa em tempo real.`,
      createdAt: new Date().toISOString(),
      statusTone: "info",
      feedSize: "compact",
    });
  }

  if (vis.showSteps) {
    visibleSteps.slice(0, 5).forEach((step, i) => {
      const execStep = execution.steps.find((es) => es.name === step.name);
      const done = execStep?.status === "concluida";
      timeline.push({
        id: `${token}-step-${i}`,
        type: "etapa",
        title: step.name,
        description: done
          ? "Etapa concluída pela equipe."
          : execStep?.status === "atual"
            ? "Em andamento agora."
            : "Prevista no fluxo.",
        createdAt: new Date(Date.now() - (visibleSteps.length - i) * 3600_000).toISOString(),
        statusTone: done ? "success" : execStep?.status === "atual" ? "info" : "neutral",
        feedSize: execStep?.status === "atual" ? "large" : "compact",
      });
    });
  }

  const media = vis.showPhotos
    ? execution.uploads.map((u) => ({
        id: u.id,
        type: "foto" as const,
        title: u.name,
        thumbnailUrl: u.previewUrl,
        gradient: portalGradient(u.id),
        createdAt: u.createdAt,
        stepLabel: currentStep?.name,
      }))
    : [];

  const theme =
    template.nicheId === "funilaria"
      ? "vehicle"
      : template.nicheId === "construcao"
        ? "construction"
        : "default";

  const pendingApproval =
    vis.showApprovals && currentStep && template.steps.find((s) => s.name === currentStep.name)?.needsApproval
      ? {
          id: `ap-${token}`,
          stepName: currentStep.name,
          status: "pendente" as const,
          requestedAt: new Date().toISOString(),
          note: vis.showComments
            ? "Revise as evidências e confirme para liberar a próxima etapa."
            : undefined,
          mediaGradient: portalGradient(`${token}-approval`),
          mediaLabel: "Evidências da etapa",
        }
      : undefined;

  return {
    token,
    serviceId,
    serviceTitle,
    companyName: clientName,
    responsibleName: "Equipe Operiva",
    serviceTheme: theme,
    currentJourneyStep: pendingApproval ? "aguardando_aprovacao" : "em_execucao",
    progressPercent,
    statusLabel: `Etapa atual: ${currentStep?.name ?? "Em preparação"}`,
    lastUpdate: new Date().toISOString(),
    journeySteps: buildJourneySteps(
      pendingApproval ? "aguardando_aprovacao" : "em_execucao"
    ),
    timeline,
    media,
    pendingApproval,
    liveActivity: vis.showNotifications
      ? {
          teamMemberName: "Equipe de campo",
          actionLabel: `Atualizou «${currentStep?.name ?? "serviço"}»`,
        }
      : undefined,
  };
}

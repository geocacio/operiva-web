import { resolvePortalToken } from "@/lib/portal-routes";
import { mockServices } from "./services";
import { getMockExecution } from "./execution";
import { portalGradient } from "@/modules/client-portal/portal-utils";
import type {
  ClientPortalData,
  PortalJourneyStep,
  PortalTimelineItem,
} from "@/types/portal";
import type { ServiceStatus } from "@/types";

const JOURNEY_LABELS: Record<PortalJourneyStep, string> = {
  recebido: "Recebido",
  em_analise: "Em análise",
  em_execucao: "Em execução",
  aguardando_aprovacao: "Aguardando aprovação",
  finalizado: "Finalizado",
};

function statusToJourney(status: ServiceStatus): PortalJourneyStep {
  switch (status) {
    case "em_analise":
      return "em_analise";
    case "em_andamento":
    case "atrasado":
      return "em_execucao";
    case "aguardando_aprovacao":
      return "aguardando_aprovacao";
    case "concluido":
      return "finalizado";
    default:
      return "recebido";
  }
}

function buildJourneySteps(current: PortalJourneyStep) {
  const order: PortalJourneyStep[] = [
    "recebido",
    "em_analise",
    "em_execucao",
    "aguardando_aprovacao",
    "finalizado",
  ];
  const currentIdx = order.indexOf(current);
  return order.map((id, i) => ({
    id,
    label: JOURNEY_LABELS[id],
    completed: i < currentIdx,
    current: i === currentIdx,
  }));
}

const solarPortal: ClientPortalData = {
  token: "svc-194",
  serviceId: "s3",
  serviceTitle: "Instalação Solar #194",
  companyName: "Operiva Energia",
  responsibleName: "Carla Ribeiro",
  currentJourneyStep: "aguardando_aprovacao",
  progressPercent: 85,
  statusLabel: "Quase lá — falta só sua aprovação no comissionamento",
  lastUpdate: "2026-05-19T10:15:00Z",
  journeySteps: buildJourneySteps("aguardando_aprovacao"),
  timeline: [
    {
      id: "pt-s3-0",
      type: "aprovacao",
      title: "Sua aprovação no comissionamento",
      description:
        "Revise o vídeo e as fotos do inversor. A equipe aguarda seu ok para liberar a entrega.",
      createdAt: "2026-05-19T10:15:00Z",
      statusTone: "warning",
    },
    {
      id: "pt-s3-audio",
      type: "audio",
      title: "Carla explica os testes finais",
      description:
        "Áudio de 28s sobre tensão na string e checklist antes do comissionamento.",
      createdAt: "2026-05-19T09:30:00Z",
      authorName: "Carla Ribeiro",
      audioDurationSeconds: 28,
    },
    {
      id: "pt-s3-video",
      type: "video",
      title: "Inversor energizado — quadro CA",
      description: "12 segundos mostrando LEDs de operação e disjuntor dedicado.",
      createdAt: "2026-05-18T14:05:00Z",
      authorName: "Equipe campo",
      videoDurationSeconds: 12,
      videoGradient: portalGradient("solar-inversor"),
      videoPosterLabel: "Inversor híbrido · 8 kW",
    },
    {
      id: "pt-s3-fotos",
      type: "foto",
      title: "4 fotos do telhado sul",
      description: "Arranjo completo das 12 placas — inclinação e fixação conferidas.",
      createdAt: "2026-05-17T11:20:00Z",
      authorName: "João (instalador)",
      photos: [
        {
          id: "ph-s3-1",
          label: "Vista geral sul",
          gradient: portalGradient("placas-1"),
        },
        {
          id: "ph-s3-2",
          label: "Detalhe fixação",
          gradient: portalGradient("placas-2"),
        },
        {
          id: "ph-s3-3",
          label: "String box",
          gradient: portalGradient("placas-3"),
        },
        {
          id: "ph-s3-4",
          label: "Medidor bidirecional",
          gradient: portalGradient("placas-4"),
        },
      ],
    },
    {
      id: "pt-s3-marco1",
      type: "marco",
      title: "Placas instaladas no telhado",
      description: "Seu sistema está gerando — próximo passo: comissionamento do inversor.",
      createdAt: "2026-05-17T09:00:00Z",
      celebration: true,
      emoji: "☀️",
    },
    {
      id: "pt-s3-msg",
      type: "mensagem",
      title: "Bom dia! Equipe no telhado",
      description:
        "Hoje finalizamos a montagem. Qualquer dúvida, responda por aqui — sem precisar ligar.",
      createdAt: "2026-05-17T07:15:00Z",
      authorName: "Carla Ribeiro",
    },
    {
      id: "pt-s3-etapa",
      type: "etapa",
      title: "Estrutura e trilhos fixados",
      description: "Inclinação 18° conferida. Pronto para receber as placas.",
      createdAt: "2026-05-14T16:40:00Z",
      statusTone: "success",
    },
    {
      id: "pt-s3-status",
      type: "status",
      title: "Pedido recebido pela Operiva",
      description:
        "GreenVolt confirmou escopo: 12 placas 550W + inversor híbrido 8 kW.",
      createdAt: "2026-05-12T07:00:00Z",
      statusTone: "info",
    },
  ],
  media: [
    {
      id: "pm-s3-1",
      type: "foto",
      title: "Placas — telhado sul",
      gradient: portalGradient("gallery-1"),
      createdAt: "2026-05-17T11:20:00Z",
      stepLabel: "Montagem",
    },
    {
      id: "pm-s3-2",
      type: "foto",
      title: "Quadro CA",
      gradient: portalGradient("gallery-2"),
      createdAt: "2026-05-18T13:50:00Z",
      stepLabel: "Inversor",
    },
    {
      id: "pm-s3-3",
      type: "video",
      title: "Inversor em operação",
      gradient: portalGradient("gallery-video"),
      durationSeconds: 12,
      createdAt: "2026-05-18T14:05:00Z",
      stepLabel: "Comissionamento",
    },
    {
      id: "pm-s3-4",
      type: "audio",
      title: "Atualização da Carla",
      durationSeconds: 28,
      createdAt: "2026-05-19T09:30:00Z",
      stepLabel: "Campo",
    },
    {
      id: "pm-s3-5",
      type: "foto",
      title: "String box",
      gradient: portalGradient("gallery-3"),
      createdAt: "2026-05-19T09:45:00Z",
      stepLabel: "Comissionamento",
    },
  ],
  pendingApproval: {
    id: "ap-s3-1",
    stepName: "Comissionamento do inversor",
    status: "pendente",
    requestedAt: "2026-05-19T10:15:00Z",
    note: "Confirme se o disjuntor geral suporta a carga antes de aprovar a entrega.",
  },
};

function buildGenericPortal(serviceId: string, token: string): ClientPortalData {
  const service = mockServices.find((s) => s.id === serviceId);
  const execution = getMockExecution(serviceId);
  const journey = service ? statusToJourney(service.status) : "em_execucao";

  return {
    token,
    serviceId,
    serviceTitle: service?.title ?? "Seu serviço",
    companyName: "Operiva",
    responsibleName: "Equipe Operiva",
    currentJourneyStep: journey,
    progressPercent: service?.progress ?? 40,
    statusLabel: service?.description ?? "Seu serviço está evoluindo em tempo real",
    lastUpdate: service?.updatedAt ?? new Date().toISOString(),
    journeySteps: buildJourneySteps(journey),
    timeline: execution.timeline.slice(0, 6).map((e) => ({
      id: e.id,
      type:
        e.type === "foto"
          ? "foto"
          : e.type === "video"
            ? "video"
            : e.type === "aprovacao"
              ? "aprovacao"
              : e.type === "etapa"
                ? "etapa"
                : "status",
      title: e.title,
      description: e.description,
      createdAt: e.createdAt,
    })),
    media: execution.uploads.map((u) => ({
      id: u.id,
      type: "foto" as const,
      title: u.name,
      thumbnailUrl: u.previewUrl,
      gradient: portalGradient(u.id),
      createdAt: u.createdAt,
    })),
    pendingApproval:
      service?.status === "aguardando_aprovacao"
        ? {
            id: `ap-${serviceId}`,
            stepName: execution.steps[execution.currentStepIndex]?.name ?? "Etapa atual",
            status: "pendente",
            requestedAt: service.updatedAt,
          }
        : undefined,
  };
}

const portalByToken: Record<string, ClientPortalData> = {
  "svc-194": solarPortal,
};

export function getMockPortal(token: string): ClientPortalData | null {
  if (portalByToken[token]) {
    return structuredClone(portalByToken[token]);
  }
  const serviceId = resolvePortalToken(token);
  if (!serviceId) return null;
  const built = buildGenericPortal(serviceId, token);
  portalByToken[token] = built;
  return structuredClone(built);
}

/** Simulated live update for mock refresh */
export function mockAppendTimelineUpdate(
  portal: ClientPortalData
): PortalTimelineItem {
  const item: PortalTimelineItem = {
    id: `pt-live-${Date.now()}`,
    type: "mensagem",
    title: "Nova atualização da equipe",
    description: "Tudo certo por aqui — continuamos no comissionamento.",
    createdAt: new Date().toISOString(),
    authorName: portal.responsibleName,
  };
  portal.timeline.unshift(item);
  portal.lastUpdate = item.createdAt;
  return item;
}

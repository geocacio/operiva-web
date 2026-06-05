export type PortalJourneyStep =
  | "recebido"
  | "em_analise"
  | "em_execucao"
  | "aguardando_aprovacao"
  | "finalizado";

export type PortalServiceTheme = "solar" | "construction" | "vehicle" | "default";

export type PortalMediaType = "foto" | "video" | "audio";

export type PortalTimelineItemType =
  | "status"
  | "foto"
  | "video"
  | "audio"
  | "aprovacao"
  | "etapa"
  | "mensagem"
  | "marco"
  | "antes_depois"
  | "ocorrencia";

export interface PortalBeforeAfterPair {
  label: string;
  gradient: string;
}

export interface PortalTimelinePhoto {
  id: string;
  label: string;
  gradient: string;
}

export interface PortalMediaItem {
  id: string;
  type: PortalMediaType;
  title: string;
  thumbnailUrl?: string;
  gradient?: string;
  durationSeconds?: number;
  createdAt: string;
  stepLabel?: string;
}

export interface PortalTimelineItem {
  id: string;
  type: PortalTimelineItemType;
  title: string;
  description?: string;
  createdAt: string;
  authorName?: string;
  celebration?: boolean;
  emoji?: string;
  momentVariant?: "success" | "finishing" | "thanks";
  photos?: PortalTimelinePhoto[];
  videoDurationSeconds?: number;
  videoGradient?: string;
  videoPosterLabel?: string;
  videoProgress?: number;
  audioDurationSeconds?: number;
  statusTone?: "neutral" | "success" | "info" | "warning";
  beforeAfter?: {
    before: PortalBeforeAfterPair;
    after: PortalBeforeAfterPair;
  };
  feedSize?: "large" | "compact";
}

export interface PortalLiveActivity {
  teamMemberName: string;
  actionLabel: string;
}

export interface PortalApproval {
  id: string;
  stepName: string;
  status: "pendente" | "aprovado" | "ajuste_solicitado";
  requestedAt: string;
  note?: string;
  mediaGradient?: string;
  mediaLabel?: string;
}

export interface ClientPortalData {
  token: string;
  serviceId: string;
  serviceTitle: string;
  companyName: string;
  companyLogo?: string;
  responsibleName: string;
  serviceTheme?: PortalServiceTheme;
  teamActive?: boolean;
  liveActivity?: PortalLiveActivity;
  currentJourneyStep: PortalJourneyStep;
  progressPercent: number;
  statusLabel: string;
  lastUpdate: string;
  /** Próxima etapa visível ao cliente */
  nextStep?: string;
  /** Previsão de conclusão (ISO ou texto legível) */
  estimatedCompletion?: string;
  journeySteps: {
    id: PortalJourneyStep;
    label: string;
    completed: boolean;
    current: boolean;
  }[];
  timeline: PortalTimelineItem[];
  media: PortalMediaItem[];
  /** Aprovação pendente única (mantido para compatibilidade com componente portal-approval-panel) */
  pendingApproval?: PortalApproval;
  /** Lista completa de aprovações pendentes — pode haver múltiplas em serviços complexos */
  pendingApprovals?: PortalApproval[];
}

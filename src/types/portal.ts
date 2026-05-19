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
  | "antes_depois";

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
  /** Celebration milestone (e.g. pintura concluída) */
  celebration?: boolean;
  emoji?: string;
  /** Emotional micro-moment variant */
  momentVariant?: "success" | "finishing" | "thanks";
  photos?: PortalTimelinePhoto[];
  videoDurationSeconds?: number;
  videoGradient?: string;
  videoPosterLabel?: string;
  /** Mock watch progress 0–1 for thumbnail bar */
  videoProgress?: number;
  audioDurationSeconds?: number;
  statusTone?: "neutral" | "success" | "info" | "warning";
  beforeAfter?: {
    before: PortalBeforeAfterPair;
    after: PortalBeforeAfterPair;
  };
  /** Visual weight in feed — large for hero moments */
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
  /** Mock thumbnail for decision context */
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
  /** e.g. "Carlos acabou de enviar uma atualização" */
  liveActivity?: PortalLiveActivity;
  currentJourneyStep: PortalJourneyStep;
  progressPercent: number;
  statusLabel: string;
  lastUpdate: string;
  journeySteps: {
    id: PortalJourneyStep;
    label: string;
    completed: boolean;
    current: boolean;
  }[];
  timeline: PortalTimelineItem[];
  media: PortalMediaItem[];
  pendingApproval?: PortalApproval;
}

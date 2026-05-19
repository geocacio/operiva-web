export type PortalJourneyStep =
  | "recebido"
  | "em_analise"
  | "em_execucao"
  | "aguardando_aprovacao"
  | "finalizado";

export type PortalMediaType = "foto" | "video" | "audio";

export type PortalTimelineItemType =
  | "status"
  | "foto"
  | "video"
  | "audio"
  | "aprovacao"
  | "etapa"
  | "mensagem"
  | "marco";

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
  photos?: PortalTimelinePhoto[];
  videoDurationSeconds?: number;
  videoGradient?: string;
  videoPosterLabel?: string;
  audioDurationSeconds?: number;
  statusTone?: "neutral" | "success" | "info" | "warning";
}

export interface PortalApproval {
  id: string;
  stepName: string;
  status: "pendente" | "aprovado" | "ajuste_solicitado";
  requestedAt: string;
  note?: string;
}

export interface ClientPortalData {
  token: string;
  serviceId: string;
  serviceTitle: string;
  companyName: string;
  companyLogo?: string;
  responsibleName: string;
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

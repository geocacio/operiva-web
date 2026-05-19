export type ExecutionEventType =
  | "etapa"
  | "foto"
  | "video"
  | "audio"
  | "status"
  | "comentario"
  | "problema"
  | "aprovacao"
  | "pausa";

export type ExecutionStepStatus = "concluida" | "atual" | "pendente";

export type ClientEngagementStatus =
  | "acompanhando"
  | "pendente_aprovacao"
  | "sem_interacao";

export interface ExecutionStep {
  id: string;
  name: string;
  description: string;
  order: number;
  status: ExecutionStepStatus;
}

export interface ExecutionEvent {
  id: string;
  type: ExecutionEventType;
  title: string;
  description?: string;
  createdAt: string;
}

export interface ClientMessage {
  id: string;
  from: "cliente" | "sistema";
  authorName: string;
  content: string;
  createdAt: string;
}

export interface ExecutionUpload {
  id: string;
  name: string;
  previewUrl: string;
  createdAt: string;
}

export interface ServiceExecution {
  serviceId: string;
  currentStepIndex: number;
  steps: ExecutionStep[];
  estimatedMinutesRemaining: number;
  paused: boolean;
  pauseReason?: string;
  clientStatus: ClientEngagementStatus;
  timeline: ExecutionEvent[];
  messages: ClientMessage[];
  uploads: ExecutionUpload[];
}

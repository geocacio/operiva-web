import type { Occurrence } from "./occurrence";

export type ExecutionEventType =
  | "etapa"
  | "foto"
  | "video"
  | "audio"
  | "status"
  | "comentario"
  | "ocorrencia"
  | "aprovacao"
  | "pausa"
  | "retomada"
  | "etapa_adicionada"
  | "subetapa";

/** @deprecated Use "ocorrencia" — mantido para compatibilidade com mocks existentes */
export type LegacyProblemType = "problema";

export type ExecutionStepStatus = "concluida" | "atual" | "pendente" | "cancelada";

export type ClientEngagementStatus =
  | "acompanhando"
  | "pendente_aprovacao"
  | "sem_interacao";

export interface ExecutionSubStep {
  id: string;
  name: string;
  done: boolean;
  addedAt: string;
}

export interface ExecutionStep {
  id: string;
  name: string;
  description: string;
  order: number;
  status: ExecutionStepStatus;
  /** Sub-etapas opcionais — adicionáveis durante execução */
  subSteps?: ExecutionSubStep[];
  /** true = etapa adicionada dinamicamente durante a execução (não veio do template) */
  addedDuringExecution?: boolean;
  clientVisible?: boolean;
  needsApproval?: boolean;
}

export interface ExecutionApprovalRequest {
  id: string;
  stepId?: string;
  stepName: string;
  requestedAt: string;
  status: "pendente" | "aprovado" | "ajuste_solicitado";
  note?: string;
  requestedByName?: string;
}

export interface ExecutionEvent {
  id: string;
  type: ExecutionEventType | LegacyProblemType;
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
  clientId?: string;
  teamId?: string;
  currentStepIndex: number;
  steps: ExecutionStep[];
  estimatedMinutesRemaining: number;
  /** ISO date — prazo estimado para conclusão total */
  estimatedDeadline?: string;
  paused: boolean;
  pauseReason?: string;
  clientStatus: ClientEngagementStatus;
  timeline: ExecutionEvent[];
  messages: ClientMessage[];
  uploads: ExecutionUpload[];
  /** Ocorrências registradas durante a execução do serviço */
  occurrences: Occurrence[];
  /** Solicitações de aprovação emitidas (múltiplas ao longo do serviço) */
  approvals: ExecutionApprovalRequest[];
  /** IDs de serviços extras vinculados durante execução */
  extraServices?: string[];
  /** Notas de mudança de escopo */
  scopeChanges?: string[];
}

export type OccurrenceType =
  | "pausa"
  | "escopo_extra"
  | "retrabalho"
  | "imprevisto"
  | "material"
  | "clima"
  | "cliente"
  | "outro";

export type OccurrenceEffect =
  | "atraso_prazo"
  | "custo_adicional"
  | "mudanca_escopo"
  | "pausa_servico"
  | "nenhum";

export const OCCURRENCE_TYPE_LABELS: Record<OccurrenceType, string> = {
  pausa: "Pausa operacional",
  escopo_extra: "Escopo adicional",
  retrabalho: "Retrabalho",
  imprevisto: "Imprevisto",
  material: "Aguardando material",
  clima: "Condição climática",
  cliente: "Pendência do cliente",
  outro: "Outro",
};

export const OCCURRENCE_EFFECT_LABELS: Record<OccurrenceEffect, string> = {
  atraso_prazo: "Atraso no prazo",
  custo_adicional: "Custo adicional",
  mudanca_escopo: "Mudança de escopo",
  pausa_servico: "Pausa do serviço",
  nenhum: "Sem efeito imediato",
};

export interface Occurrence {
  id: string;
  type: OccurrenceType;
  title: string;
  description: string;
  effects: OccurrenceEffect[];
  registeredAt: string;
  registeredByName?: string;
  /** ID da etapa em que a ocorrência foi registrada */
  stepId?: string;
  resolved: boolean;
  resolvedAt?: string;
}

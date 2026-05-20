export interface FlowStepChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface FlowStepConfig {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
  icon: string;
  responsibleTeamId?: string;
  responsibleRole?: string;
  slaHours: number;
  required: boolean;
  clientVisible: boolean;
  needsApproval: boolean;
  needsPhoto: boolean;
  needsComment: boolean;
  blocksNext: boolean;
  internalChecklist: FlowStepChecklistItem[];
  autoStatus: string;
  dependsOnStepId?: string | null;
}

export type FlowStepDraft = FlowStepConfig;

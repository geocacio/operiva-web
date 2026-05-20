import type { FlowStepConfig } from "./flow-step";
import type { NicheId } from "./niche";

export interface ClientVisibilitySettings {
  showSteps: boolean;
  showPhotos: boolean;
  showComments: boolean;
  showNotifications: boolean;
  showTimeline: boolean;
  showApprovals: boolean;
  hideInternalSteps: boolean;
}

export interface TemplateTeamRole {
  id: string;
  name: string;
  nicheId: NicheId;
  color: string;
  memberCount: number;
}

export interface OperivaTemplate {
  id: string;
  name: string;
  description: string;
  nicheId: NicheId;
  stepCount: number;
  avgDays: number;
  teamIds: string[];
  steps: FlowStepConfig[];
  teamAssignments: Record<string, string[]>;
  clientVisibility: ClientVisibilitySettings;
  badges: string[];
  isBuiltin: boolean;
  updatedAt: string;
}

export interface CreateServiceFromTemplateInput {
  templateId: string;
  clientId: string;
  clientName: string;
  title: string;
  dueDate: string;
  teamId: string;
  notes?: string;
  priority?: "alta" | "media" | "baixa";
}

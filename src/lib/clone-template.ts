import type { FlowStepChecklistItem, FlowStepConfig } from "@/types/flow-step";
import type { OperivaTemplate } from "@/types/operiva-template";

function cloneChecklistItem(item: FlowStepChecklistItem): FlowStepChecklistItem {
  return { ...item };
}

export function cloneFlowStep(step: FlowStepConfig): FlowStepConfig {
  return {
    ...step,
    internalChecklist: step.internalChecklist.map(cloneChecklistItem),
  };
}

export function cloneTemplate(template: OperivaTemplate): OperivaTemplate {
  return {
    ...template,
    steps: template.steps.map(cloneFlowStep),
    teamIds: [...template.teamIds],
    badges: [...template.badges],
    teamAssignments: Object.fromEntries(
      Object.entries(template.teamAssignments).map(([stepId, roleIds]) => [
        stepId,
        [...roleIds],
      ])
    ),
    clientVisibility: { ...template.clientVisibility },
  };
}

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { cloneFlowStep, cloneTemplate } from "@/lib/clone-template";
import { duplicateTemplate, getTemplateById, mockTemplates } from "@/mocks/templates";
import type { FlowStepConfig } from "@/types/flow-step";
import type { NicheId } from "@/types/niche";
import type {
  ClientVisibilitySettings,
  OperivaTemplate,
} from "@/types/operiva-template";
import { buildStepsFromNames } from "@/flows/build-flow-steps";
import { mockNiches } from "@/mocks/niches";

interface TemplateState {
  templates: OperivaTemplate[];
  activeTemplateId: string | null;
  draftTemplate: OperivaTemplate | null;
  libraryLoading: boolean;
}

const initialState: TemplateState = {
  templates: mockTemplates,
  activeTemplateId: null,
  draftTemplate: null,
  libraryLoading: false,
};

function ensureDraft(state: TemplateState): OperivaTemplate | null {
  if (state.draftTemplate) return state.draftTemplate;
  if (!state.activeTemplateId) return null;
  const t = state.templates.find((x) => x.id === state.activeTemplateId);
  if (!t) return null;
  state.draftTemplate = cloneTemplate(t);
  return state.draftTemplate;
}

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setLibraryLoading(state, action: PayloadAction<boolean>) {
      state.libraryLoading = action.payload;
    },
    selectTemplate(state, action: PayloadAction<string>) {
      state.activeTemplateId = action.payload;
      const t = state.templates.find((x) => x.id === action.payload);
      state.draftTemplate = t ? cloneTemplate(t) : null;
    },
    clearDraft(state) {
      state.draftTemplate = null;
      state.activeTemplateId = null;
    },
    loadTemplateForEdit(state, action: PayloadAction<string>) {
      const t =
        state.templates.find((x) => x.id === action.payload) ??
        getTemplateById(action.payload);
      if (!t) return;
      state.activeTemplateId = t.id;
      state.draftTemplate = cloneTemplate(t);
    },
    createBlankTemplate(state, action: PayloadAction<NicheId>) {
      const niche = mockNiches.find((n) => n.id === action.payload);
      if (!niche) return;
      const id = `tpl-new-${Date.now()}`;
      const steps = buildStepsFromNames(action.payload, niche.defaultSteps);
      const draft: OperivaTemplate = {
        id,
        name: "Novo template",
        description: "Template personalizado em rascunho",
        nicheId: action.payload,
        stepCount: steps.length,
        avgDays: action.payload === "construcao" ? 30 : 5,
        teamIds: [],
        steps,
        teamAssignments: {},
        clientVisibility: {
          showSteps: true,
          showPhotos: true,
          showComments: true,
          showNotifications: true,
          showTimeline: true,
          showApprovals: true,
          hideInternalSteps: true,
        },
        badges: ["Rascunho"],
        isBuiltin: false,
        updatedAt: new Date().toISOString(),
      };
      state.templates.push(draft);
      state.activeTemplateId = id;
      state.draftTemplate = draft;
    },
    duplicateTemplateById(state, action: PayloadAction<string>) {
      const source = state.templates.find((t) => t.id === action.payload);
      if (!source) return;
      const copy = duplicateTemplate(source);
      state.templates.push(copy);
      state.activeTemplateId = copy.id;
      state.draftTemplate = copy;
    },
    updateDraftMeta(
      state,
      action: PayloadAction<Partial<Pick<OperivaTemplate, "name" | "description" | "avgDays">>>
    ) {
      const draft = ensureDraft(state);
      if (!draft) return;
      Object.assign(draft, action.payload);
      draft.updatedAt = new Date().toISOString();
    },
    updateDraftStep(state, action: PayloadAction<FlowStepConfig>) {
      const draft = ensureDraft(state);
      if (!draft) return;
      const idx = draft.steps.findIndex((s) => s.id === action.payload.id);
      if (idx >= 0) draft.steps[idx] = action.payload;
      draft.stepCount = draft.steps.length;
      draft.updatedAt = new Date().toISOString();
    },
    reorderDraftSteps(state, action: PayloadAction<string[]>) {
      const draft = ensureDraft(state);
      if (!draft) return;
      const byId = Object.fromEntries(draft.steps.map((s) => [s.id, s]));
      draft.steps = action.payload
        .map((id, i) => {
          const step = byId[id];
          if (!step) return null;
          return { ...step, order: i + 1 };
        })
        .filter(Boolean) as FlowStepConfig[];
      draft.stepCount = draft.steps.length;
    },
    addDraftStep(state) {
      const draft = ensureDraft(state);
      if (!draft) return;
      const order = draft.steps.length + 1;
      draft.steps.push({
        id: `step-new-${Date.now()}`,
        name: `Nova etapa ${order}`,
        description: "Descreva o que acontece nesta etapa.",
        order,
        color: "#6366f1",
        icon: "Circle",
        slaHours: 24,
        required: false,
        clientVisible: true,
        needsApproval: false,
        needsPhoto: false,
        needsComment: false,
        blocksNext: false,
        internalChecklist: [],
        autoStatus: "pendente",
        dependsOnStepId: draft.steps[draft.steps.length - 1]?.id ?? null,
      });
      draft.stepCount = draft.steps.length;
    },
    duplicateDraftStep(state, action: PayloadAction<string>) {
      const draft = ensureDraft(state);
      if (!draft) return;
      const source = draft.steps.find((s) => s.id === action.payload);
      if (!source) return;
      const copy = {
        ...cloneFlowStep(source),
        id: `step-dup-${Date.now()}`,
        name: `${source.name} (cópia)`,
        order: draft.steps.length + 1,
      };
      draft.steps.push(copy);
      draft.stepCount = draft.steps.length;
    },
    removeDraftStep(state, action: PayloadAction<string>) {
      const draft = ensureDraft(state);
      if (!draft || draft.steps.length <= 1) return;
      draft.steps = draft.steps
        .filter((s) => s.id !== action.payload)
        .map((s, i) => ({ ...s, order: i + 1 }));
      draft.stepCount = draft.steps.length;
    },
    setTeamAssignments(
      state,
      action: PayloadAction<{ stepId: string; roleIds: string[] }>
    ) {
      const draft = ensureDraft(state);
      if (!draft) return;
      draft.teamAssignments[action.payload.stepId] = action.payload.roleIds;
    },
    setClientVisibility(state, action: PayloadAction<ClientVisibilitySettings>) {
      const draft = ensureDraft(state);
      if (!draft) return;
      draft.clientVisibility = action.payload;
    },
    saveDraftTemplate(state) {
      const draft = ensureDraft(state);
      if (!draft) return;
      draft.updatedAt = new Date().toISOString();
      draft.stepCount = draft.steps.length;
      const idx = state.templates.findIndex((t) => t.id === draft.id);
      if (idx >= 0) state.templates[idx] = cloneTemplate(draft);
      else state.templates.push(cloneTemplate(draft));
    },
  },
});

export const {
  setLibraryLoading,
  selectTemplate,
  clearDraft,
  loadTemplateForEdit,
  createBlankTemplate,
  duplicateTemplateById,
  updateDraftMeta,
  updateDraftStep,
  reorderDraftSteps,
  addDraftStep,
  duplicateDraftStep,
  removeDraftStep,
  setTeamAssignments,
  setClientVisibility,
  saveDraftTemplate,
} = templateSlice.actions;

export default templateSlice.reducer;

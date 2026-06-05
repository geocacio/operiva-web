import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getMockExecution } from "@/mocks/execution";
import type {
  ClientEngagementStatus,
  ExecutionApprovalRequest,
  ExecutionEvent,
  ExecutionStep,
  ExecutionUpload,
  ServiceExecution,
} from "@/types/execution";
import type { Occurrence, OccurrenceEffect, OccurrenceType } from "@/types/occurrence";
import type { ServiceStatus } from "@/types";

interface ExecutionState {
  byServiceId: Record<string, ServiceExecution>;
  activeServiceId: string | null;
  loading: boolean;
  error: string | null;
  lastActionFeedback: string | null;
}

const initialState: ExecutionState = {
  byServiceId: {},
  activeServiceId: null,
  loading: false,
  error: null,
  lastActionFeedback: null,
};

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function pushTimeline(
  execution: ServiceExecution,
  event: Omit<ExecutionEvent, "id" | "createdAt"> & { createdAt?: string }
) {
  execution.timeline.unshift({
    id: newId("ev"),
    createdAt: event.createdAt ?? new Date().toISOString(),
    type: event.type,
    title: event.title,
    description: event.description,
  });
}

function buildMessageWithAudio(text?: string, audioDurationSeconds?: number) {
  const parts: string[] = [];
  const trimmed = text?.trim();
  if (trimmed) parts.push(trimmed);
  if (audioDurationSeconds) {
    parts.push(`Áudio enviado (${audioDurationSeconds}s)`);
  }
  return parts.join("\n\n");
}

function pushAudioTimeline(
  execution: ServiceExecution,
  audioDurationSeconds: number,
  context: string
) {
  pushTimeline(execution, {
    type: "audio",
    title: "Áudio enviado",
    description: `Mensagem de voz de ${audioDurationSeconds}s registrada ${context}.`,
  });
}

/** Garante que arrays de ocorrências e aprovações existam (migração de estado legado) */
function ensureArrays(ex: ServiceExecution) {
  if (!ex.occurrences) ex.occurrences = [];
  if (!ex.approvals) ex.approvals = [];
}

export const fetchExecution = createAsyncThunk(
  "execution/fetch",
  async (serviceId: string) => getMockExecution(serviceId)
);

const executionSlice = createSlice({
  name: "execution",
  initialState,
  reducers: {
    setActiveService(state, action: PayloadAction<string | null>) {
      state.activeServiceId = action.payload;
    },
    clearActionFeedback(state) {
      state.lastActionFeedback = null;
    },

    // ── Progresso de etapas ────────────────────────────────────────────
    completeStep(state, action: PayloadAction<{ serviceId: string }>) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex || ex.paused) return;
      ensureArrays(ex);

      const idx = ex.currentStepIndex;
      const current = ex.steps[idx];
      if (!current || current.status !== "atual") return;

      current.status = "concluida";
      pushTimeline(ex, {
        type: "etapa",
        title: `Trabalho concluído: ${current.name}`,
        description: "Avanço registrado pelo profissional.",
      });

      if (idx < ex.steps.length - 1) {
        ex.currentStepIndex = idx + 1;
        ex.steps[idx + 1].status = "atual";
        ex.estimatedMinutesRemaining = Math.max(
          15,
          ex.estimatedMinutesRemaining - 25
        );
        state.lastActionFeedback = `Avançou para «${ex.steps[idx + 1].name}»`;
      } else {
        ex.estimatedMinutesRemaining = 0;
        state.lastActionFeedback = "Todos os trabalhos concluídos!";
      }
    },

    /** Adiciona trabalho dinamicamente durante execução */
    addStep(
      state,
      action: PayloadAction<{
        serviceId: string;
        name: string;
        description?: string;
        position?: "end" | "after_current" | "before_step";
        beforeStepId?: string;
      }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;
      ensureArrays(ex);

      const position = action.payload.position ?? "end";
      let insertAt: number;

      switch (position) {
        case "after_current":
          insertAt = ex.currentStepIndex + 1;
          break;
        case "before_step": {
          const targetIndex = ex.steps.findIndex(
            (s) => s.id === action.payload.beforeStepId
          );
          insertAt = targetIndex >= 0 ? targetIndex : ex.steps.length;
          break;
        }
        case "end":
        default:
          insertAt = ex.steps.length;
      }

      insertAt = Math.max(0, Math.min(insertAt, ex.steps.length));

      const newStep: ExecutionStep = {
        id: newId("step"),
        name: action.payload.name,
        description: action.payload.description ?? "",
        order: insertAt + 1,
        status: "pendente",
        addedDuringExecution: true,
        clientVisible: true,
      };

      ex.steps.splice(insertAt, 0, newStep);
      ex.steps.forEach((s, i) => (s.order = i + 1));

      if (insertAt <= ex.currentStepIndex) {
        ex.currentStepIndex += 1;
      }

      pushTimeline(ex, {
        type: "etapa_adicionada",
        title: `Trabalho adicionado: ${newStep.name}`,
        description: "Novo trabalho inserido durante a execução do serviço.",
      });

      state.lastActionFeedback = `Trabalho «${newStep.name}» adicionado`;
    },

    /** Remove etapa (somente etapas pendentes ou adicionadas dinamicamente) */
    removeStep(
      state,
      action: PayloadAction<{ serviceId: string; stepId: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      const step = ex.steps.find((s) => s.id === action.payload.stepId);
      if (!step || step.status === "concluida" || step.status === "atual") return;

      ex.steps = ex.steps
        .filter((s) => s.id !== action.payload.stepId)
        .map((s, i) => ({ ...s, order: i + 1 }));

      if (ex.currentStepIndex >= ex.steps.length) {
        ex.currentStepIndex = Math.max(0, ex.steps.length - 1);
      }

      state.lastActionFeedback = `Trabalho «${step.name}» removido`;
    },

    /** Reordena etapas por array de IDs */
    reorderSteps(
      state,
      action: PayloadAction<{ serviceId: string; orderedIds: string[] }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      const byId = Object.fromEntries(ex.steps.map((s) => [s.id, s]));
      ex.steps = action.payload.orderedIds
        .map((id, i) => {
          const step = byId[id];
          if (!step) return null;
          return { ...step, order: i + 1 };
        })
        .filter(Boolean) as ExecutionStep[];

      const currentStep = ex.steps.find((s) => s.status === "atual");
      if (currentStep) {
        ex.currentStepIndex = ex.steps.indexOf(currentStep);
      }
    },

    /** Adiciona sub-etapa a uma etapa existente */
    addSubStep(
      state,
      action: PayloadAction<{ serviceId: string; stepId: string; name: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      const step = ex.steps.find((s) => s.id === action.payload.stepId);
      if (!step) return;

      if (!step.subSteps) step.subSteps = [];
      step.subSteps.push({
        id: newId("sub"),
        name: action.payload.name,
        done: false,
        addedAt: new Date().toISOString(),
      });

      pushTimeline(ex, {
        type: "subetapa",
        title: `Sub-trabalho adicionado: ${action.payload.name}`,
        description: `Em «${step.name}»`,
      });

      state.lastActionFeedback = `Sub-trabalho «${action.payload.name}» adicionado`;
    },

    /** Marca/desmarca sub-etapa como concluída */
    toggleSubStep(
      state,
      action: PayloadAction<{
        serviceId: string;
        stepId: string;
        subStepId: string;
      }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      const step = ex.steps.find((s) => s.id === action.payload.stepId);
      const sub = step?.subSteps?.find((ss) => ss.id === action.payload.subStepId);
      if (sub) sub.done = !sub.done;
    },

    // ── Ocorrências ────────────────────────────────────────────────────
    registerOccurrence(
      state,
      action: PayloadAction<{
        serviceId: string;
        type: OccurrenceType;
        title: string;
        description?: string;
        effects: OccurrenceEffect[];
        registeredByName?: string;
        audioDurationSeconds?: number;
      }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;
      ensureArrays(ex);

      const currentStep = ex.steps[ex.currentStepIndex];
      const { audioDurationSeconds } = action.payload;
      const description = buildMessageWithAudio(
        action.payload.description,
        audioDurationSeconds
      );

      const occurrence: Occurrence = {
        id: newId("occ"),
        type: action.payload.type,
        title: action.payload.title,
        description,
        effects: action.payload.effects,
        registeredAt: new Date().toISOString(),
        registeredByName: action.payload.registeredByName,
        stepId: currentStep?.id,
        resolved: false,
      };

      ex.occurrences.unshift(occurrence);

      pushTimeline(ex, {
        type: "ocorrencia",
        title: `Ocorrência: ${occurrence.title}`,
        description: occurrence.description,
      });

      if (audioDurationSeconds) {
        pushAudioTimeline(ex, audioDurationSeconds, "na ocorrência");
      }

      if (action.payload.effects.includes("pausa_servico")) {
        ex.paused = true;
        ex.pauseReason = occurrence.description;
      }

      ex.messages.unshift({
        id: newId("msg"),
        from: "sistema",
        authorName: "Operiva",
        content: `Ocorrência registrada: ${occurrence.title}`,
        createdAt: new Date().toISOString(),
      });

      state.lastActionFeedback = audioDurationSeconds
        ? "Ocorrência registrada com áudio"
        : "Ocorrência registrada na operação";
    },

    /** Registra mudança de escopo no serviço */
    recordScopeChange(
      state,
      action: PayloadAction<{ serviceId: string; note: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      if (!ex.scopeChanges) ex.scopeChanges = [];
      ex.scopeChanges.push(action.payload.note);

      pushTimeline(ex, {
        type: "status",
        title: "Mudança de escopo registrada",
        description: action.payload.note,
      });

      state.lastActionFeedback = "Mudança de escopo registrada";
    },

    /** Vincula serviço extra (ex: serviço complementar necessário) */
    addExtraService(
      state,
      action: PayloadAction<{ serviceId: string; extraServiceId: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      if (!ex.extraServices) ex.extraServices = [];
      if (!ex.extraServices.includes(action.payload.extraServiceId)) {
        ex.extraServices.push(action.payload.extraServiceId);
      }
      state.lastActionFeedback = "Serviço extra vinculado";
    },

    // ── Mídia ─────────────────────────────────────────────────────────
    addPhoto(
      state,
      action: PayloadAction<{ serviceId: string; fileName?: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      const name = action.payload.fileName ?? `foto-${ex.uploads.length + 1}.jpg`;
      const upload: ExecutionUpload = {
        id: newId("up"),
        name,
        previewUrl: `https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`,
        createdAt: new Date().toISOString(),
      };
      ex.uploads.unshift(upload);
      pushTimeline(ex, {
        type: "foto",
        title: "Foto adicionada",
        description: name,
      });
      state.lastActionFeedback = "Foto enviada com sucesso";
    },

    addVideo(state, action: PayloadAction<{ serviceId: string }>) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      pushTimeline(ex, {
        type: "video",
        title: "Vídeo registrado",
        description: "Clipe de 12s salvo na timeline do serviço.",
      });
      state.lastActionFeedback = "Vídeo adicionado à timeline";
    },

    addAudio(state, action: PayloadAction<{ serviceId: string }>) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      pushTimeline(ex, {
        type: "audio",
        title: "Áudio enviado",
        description: "Mensagem de voz de 18s registrada no serviço.",
      });
      state.lastActionFeedback = "Áudio enviado com sucesso";
    },

    // ── Aprovações ────────────────────────────────────────────────────
    requestApproval(
      state,
      action: PayloadAction<{
        serviceId: string;
        note?: string;
        audioDurationSeconds?: number;
      }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;
      ensureArrays(ex);

      const currentStep = ex.steps[ex.currentStepIndex];
      const { audioDurationSeconds } = action.payload;
      const note = buildMessageWithAudio(
        action.payload.note,
        audioDurationSeconds
      );

      const approval: ExecutionApprovalRequest = {
        id: newId("ap"),
        stepId: currentStep?.id,
        stepName: currentStep?.name ?? "Trabalho atual",
        requestedAt: new Date().toISOString(),
        status: "pendente",
        note: note || undefined,
      };

      ex.approvals.unshift(approval);
      ex.clientStatus = "pendente_aprovacao";

      pushTimeline(ex, {
        type: "aprovacao",
        title: "Aprovação solicitada ao cliente",
        description:
          note ||
          `Trabalho: ${currentStep?.name ?? "atual"} — aguardando confirmação.`,
      });

      if (audioDurationSeconds) {
        pushAudioTimeline(ex, audioDurationSeconds, "na solicitação de aprovação");
      }

      ex.messages.unshift({
        id: newId("msg"),
        from: "sistema",
        authorName: "Operiva",
        content: "Solicitação de aprovação enviada ao cliente.",
        createdAt: new Date().toISOString(),
      });
      state.lastActionFeedback = audioDurationSeconds
        ? "Cliente notificado com áudio para aprovação"
        : "Cliente notificado para aprovação";
    },

    // ── Pausa/retomada ────────────────────────────────────────────────
    pauseService(
      state,
      action: PayloadAction<{ serviceId: string; reason: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      ex.paused = true;
      ex.pauseReason = action.payload.reason;
      pushTimeline(ex, {
        type: "pausa",
        title: "Serviço pausado",
        description: action.payload.reason,
      });
      state.lastActionFeedback = "Serviço pausado";
    },

    resumeService(state, action: PayloadAction<{ serviceId: string }>) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      ex.paused = false;
      ex.pauseReason = undefined;
      pushTimeline(ex, {
        type: "retomada",
        title: "Serviço retomado",
        description: "Execução reiniciada pelo profissional.",
      });
      state.lastActionFeedback = "Serviço retomado";
    },

    setClientStatus(
      state,
      action: PayloadAction<{
        serviceId: string;
        status: ClientEngagementStatus;
      }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (ex) ex.clientStatus = action.payload.status;
    },

    syncServiceStatus(
      state,
      action: PayloadAction<{ serviceId: string; status: ServiceStatus }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;
      if (action.payload.status === "aguardando_aprovacao") {
        ex.clientStatus = "pendente_aprovacao";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExecution.fulfilled, (state, action) => {
        state.loading = false;
        const ex = action.payload;
        if (!ex.occurrences) ex.occurrences = [];
        if (!ex.approvals) ex.approvals = [];
        state.byServiceId[ex.serviceId] = ex;
        state.activeServiceId = ex.serviceId;
      })
      .addCase(fetchExecution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar execução";
      });
  },
});

export const {
  setActiveService,
  clearActionFeedback,
  completeStep,
  addStep,
  removeStep,
  reorderSteps,
  addSubStep,
  toggleSubStep,
  registerOccurrence,
  recordScopeChange,
  addExtraService,
  addPhoto,
  addVideo,
  addAudio,
  requestApproval,
  pauseService,
  resumeService,
  setClientStatus,
  syncServiceStatus,
} = executionSlice.actions;

export default executionSlice.reducer;

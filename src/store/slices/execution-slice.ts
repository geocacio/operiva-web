import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getMockExecution } from "@/mocks/execution";
import type {
  ClientEngagementStatus,
  ExecutionEvent,
  ExecutionUpload,
  ServiceExecution,
} from "@/types/execution";
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
    completeStep(state, action: PayloadAction<{ serviceId: string }>) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex || ex.paused) return;

      const idx = ex.currentStepIndex;
      const current = ex.steps[idx];
      if (!current || current.status !== "atual") return;

      current.status = "concluida";
      pushTimeline(ex, {
        type: "etapa",
        title: `Etapa concluída: ${current.name}`,
        description: "Avanço registrado no modo profissional.",
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
        state.lastActionFeedback = "Todas as etapas concluídas!";
      }
    },
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
    requestApproval(
      state,
      action: PayloadAction<{ serviceId: string; note?: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      ex.clientStatus = "pendente_aprovacao";
      pushTimeline(ex, {
        type: "aprovacao",
        title: "Aprovação solicitada ao cliente",
        description: action.payload.note ?? "Aguardando confirmação.",
      });
      ex.messages.unshift({
        id: newId("msg"),
        from: "sistema",
        authorName: "Operiva",
        content: "Solicitação de aprovação enviada ao cliente.",
        createdAt: new Date().toISOString(),
      });
      state.lastActionFeedback = "Cliente notificado para aprovação";
    },
    reportProblem(
      state,
      action: PayloadAction<{ serviceId: string; description: string }>
    ) {
      const ex = state.byServiceId[action.payload.serviceId];
      if (!ex) return;

      pushTimeline(ex, {
        type: "problema",
        title: "Problema reportado",
        description: action.payload.description,
      });
      ex.messages.unshift({
        id: newId("msg"),
        from: "sistema",
        authorName: "Operiva",
        content: `Problema registrado: ${action.payload.description}`,
        createdAt: new Date().toISOString(),
      });
      state.lastActionFeedback = "Problema registrado na operação";
    },
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
        type: "status",
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
        state.byServiceId[action.payload.serviceId] = action.payload;
        state.activeServiceId = action.payload.serviceId;
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
  addPhoto,
  addVideo,
  requestApproval,
  reportProblem,
  pauseService,
  resumeService,
} = executionSlice.actions;

export default executionSlice.reducer;

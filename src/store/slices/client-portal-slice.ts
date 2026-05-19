import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getMockPortal, mockAppendTimelineUpdate } from "@/mocks/portal";
import type { ClientPortalData } from "@/types/portal";

interface ClientPortalState {
  byToken: Record<string, ClientPortalData>;
  loading: boolean;
  error: string | null;
  lastActionFeedback: string | null;
  refreshing: boolean;
}

const initialState: ClientPortalState = {
  byToken: {},
  loading: false,
  error: null,
  lastActionFeedback: null,
  refreshing: false,
};

function newId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

export const fetchClientPortal = createAsyncThunk(
  "clientPortal/fetch",
  async (token: string) => {
    const data = getMockPortal(token);
    if (!data) throw new Error("Portal não encontrado");
    return data;
  }
);

export const refreshPortalTimeline = createAsyncThunk(
  "clientPortal/refreshTimeline",
  async (token: string, { getState }) => {
    const state = getState() as { clientPortal: ClientPortalState };
    const portal = state.clientPortal.byToken[token];
    if (!portal) {
      const data = getMockPortal(token);
      if (!data) throw new Error("Portal não encontrado");
      return data;
    }
    await new Promise((r) => setTimeout(r, 600));
    const clone = structuredClone(portal);
    mockAppendTimelineUpdate(clone);
    return clone;
  }
);

const clientPortalSlice = createSlice({
  name: "clientPortal",
  initialState,
  reducers: {
    clearPortalFeedback(state) {
      state.lastActionFeedback = null;
    },
    approveStep(state, action: PayloadAction<{ token: string }>) {
      const portal = state.byToken[action.payload.token];
      if (!portal?.pendingApproval) return;

      portal.pendingApproval.status = "aprovado";
      portal.statusLabel = "Etapa aprovada — equipe já foi notificada ✓";
      portal.currentJourneyStep = "finalizado";
      portal.progressPercent = 100;
      portal.journeySteps = portal.journeySteps.map((s) => ({
        ...s,
        completed: true,
        current: s.id === "finalizado",
      }));
      portal.timeline.unshift({
        id: newId("pt"),
        type: "marco",
        title: "Obrigado pela aprovação",
        description: portal.pendingApproval.stepName,
        createdAt: new Date().toISOString(),
        celebration: true,
        emoji: "✅",
        momentVariant: "thanks",
      });
      state.lastActionFeedback = "Aprovação registrada. Obrigado pela confiança!";
    },
    requestAdjustment(
      state,
      action: PayloadAction<{ token: string; message: string }>
    ) {
      const portal = state.byToken[action.payload.token];
      if (!portal?.pendingApproval) return;

      portal.pendingApproval.status = "ajuste_solicitado";
      portal.statusLabel = "Ajuste solicitado — Carla retorna em breve";
      portal.timeline.unshift({
        id: newId("pt"),
        type: "mensagem",
        title: "Você solicitou um ajuste",
        description: action.payload.message,
        createdAt: new Date().toISOString(),
        authorName: "Você",
      });
      state.lastActionFeedback = "Solicitação enviada — a equipe já viu";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientPortal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientPortal.fulfilled, (state, action) => {
        state.loading = false;
        state.byToken[action.payload.token] = action.payload;
      })
      .addCase(fetchClientPortal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar portal";
      })
      .addCase(refreshPortalTimeline.pending, (state) => {
        state.refreshing = true;
      })
      .addCase(refreshPortalTimeline.fulfilled, (state, action) => {
        state.refreshing = false;
        state.byToken[action.payload.token] = action.payload;
        state.lastActionFeedback = "Nova atualização no feed";
      })
      .addCase(refreshPortalTimeline.rejected, (state) => {
        state.refreshing = false;
      });
  },
});

export const { clearPortalFeedback, approveStep, requestAdjustment } =
  clientPortalSlice.actions;

export default clientPortalSlice.reducer;

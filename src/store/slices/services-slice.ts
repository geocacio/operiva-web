import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import { registerTemplateExecution } from "@/mocks/execution";
import { registerTemplatePortal } from "@/mocks/portal";
import { getTemplateById } from "@/mocks/templates";
import { buildExecutionFromTemplate } from "@/flows/template-to-execution";
import { buildPortalFromTemplate } from "@/flows/template-to-portal";
import { getPortalTokenForService } from "@/lib/portal-routes";
import type { CreateServiceFromTemplateInput } from "@/types/operiva-template";
import type { Priority, Service, ServiceStatus } from "@/types";
import type { RootState } from "@/store";

interface ServicesState {
  items: Service[];
  loading: boolean;
  error: string | null;
  filter: string;
  statusFilter: ServiceStatus | "todos";
  priorityFilter: Priority | "todos";
  viewMode: "lista" | "kanban";
}

const initialState: ServicesState = {
  items: [],
  loading: false,
  error: null,
  filter: "",
  statusFilter: "todos",
  priorityFilter: "todos",
  viewMode: "lista",
};

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  () => fakeApi.getServices()
);

export const createServiceFromTemplate = createAsyncThunk(
  "services/createFromTemplate",
  async (input: CreateServiceFromTemplateInput, { getState }) => {
    const state = getState() as RootState;
    const template =
      state.template.draftTemplate ??
      getTemplateById(input.templateId) ??
      state.template.templates.find((t) => t.id === input.templateId);

    if (!template) throw new Error("Template não encontrado");

    const serviceId = `svc-${Date.now()}`;
    const portalToken = getPortalTokenForService(serviceId);
    const now = new Date().toISOString();

    const service: Service = {
      id: serviceId,
      title: input.title,
      description: input.notes ?? `Criado a partir de «${template.name}»`,
      clientId: input.clientId,
      clientName: input.clientName,
      status: "em_andamento",
      priority: input.priority ?? "media",
      progress: 0,
      assigneeId: "u1",
      teamId: input.teamId,
      dueDate: input.dueDate,
      createdAt: now,
      updatedAt: now,
      category: template.nicheId === "funilaria" ? "Funilaria" : "Construção",
      stepsCompleted: 0,
      stepsTotal: template.steps.length,
      templateId: template.id,
      nicheId: template.nicheId,
      portalToken,
    };

    const execution = buildExecutionFromTemplate(template, serviceId, {
      clientName: input.clientName,
    });
    registerTemplateExecution(serviceId, execution);

    const portal = buildPortalFromTemplate(
      template,
      serviceId,
      portalToken,
      input.title,
      input.clientName,
      execution
    );
    registerTemplatePortal(portalToken, portal);

    return service;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setFilter(state, action: { payload: string }) {
      state.filter = action.payload;
    },
    setStatusFilter(state, action: { payload: ServiceStatus | "todos" }) {
      state.statusFilter = action.payload;
    },
    setPriorityFilter(state, action: { payload: Priority | "todos" }) {
      state.priorityFilter = action.payload;
    },
    setViewMode(state, action: { payload: "lista" | "kanban" }) {
      state.viewMode = action.payload;
    },
    addServiceLocally(state, action: PayloadAction<Service>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(
          state.items
            .filter((s) => s.templateId)
            .map((s) => s.id)
        );
        const fromApi = action.payload.filter((s) => !existingIds.has(s.id));
        state.items = [
          ...state.items.filter((s) => s.templateId),
          ...fromApi,
        ];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar serviços";
      })
      .addCase(createServiceFromTemplate.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createServiceFromTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createServiceFromTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao criar serviço";
      });
  },
});

export const { setFilter, setStatusFilter, setPriorityFilter, setViewMode } =
  servicesSlice.actions;
export default servicesSlice.reducer;

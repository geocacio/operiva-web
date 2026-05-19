import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { Priority, Service, ServiceStatus } from "@/types";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar serviços";
      });
  },
});

export const { setFilter, setStatusFilter, setPriorityFilter, setViewMode } =
  servicesSlice.actions;
export default servicesSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { Service } from "@/types";

interface ServicesState {
  items: Service[];
  loading: boolean;
  error: string | null;
  filter: string;
}

const initialState: ServicesState = {
  items: [],
  loading: false,
  error: null,
  filter: "",
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

export const { setFilter } = servicesSlice.actions;
export default servicesSlice.reducer;

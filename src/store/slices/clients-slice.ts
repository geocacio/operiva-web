import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { Client } from "@/types";

interface ClientsState {
  items: Client[];
  loading: boolean;
}

const initialState: ClientsState = {
  items: [],
  loading: false,
};

export const fetchClients = createAsyncThunk("clients/fetch", () =>
  fakeApi.getClients()
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default clientsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { Notification } from "@/types";

interface NotificationsState {
  items: Notification[];
  loading: boolean;
}

const initialState: NotificationsState = {
  items: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  () => fakeApi.getNotifications()
);

export const markRead = createAsyncThunk(
  "notifications/markRead",
  async (id: string) => {
    await fakeApi.markNotificationRead(id);
    return id;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(markRead.fulfilled, (state, action) => {
        const item = state.items.find((n) => n.id === action.payload);
        if (item) item.read = true;
      });
  },
});

export default notificationsSlice.reducer;

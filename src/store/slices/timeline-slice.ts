import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { TimelineEvent } from "@/types";

interface TimelineState {
  items: TimelineEvent[];
  loading: boolean;
}

const initialState: TimelineState = {
  items: [],
  loading: false,
};

export const fetchTimeline = createAsyncThunk("timeline/fetch", () =>
  fakeApi.getTimeline()
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeline.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTimeline.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default timelineSlice.reducer;

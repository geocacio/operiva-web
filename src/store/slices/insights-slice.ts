import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { InsightsPeriod, InsightsPeriodData } from "@/types/insights";
import type { RootState } from "@/store";

interface InsightsState {
  period: InsightsPeriod;
  data: InsightsPeriodData | null;
  loading: boolean;
  lastRefreshed: string | null;
}

const initialState: InsightsState = {
  period: "week",
  data: null,
  loading: false,
  lastRefreshed: null,
};

export const fetchInsights = createAsyncThunk(
  "insights/fetch",
  async (period: InsightsPeriod) => {
    const data = await fakeApi.getInsights(period);
    return { data, period };
  }
);

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    setInsightsPeriod(state, action: PayloadAction<InsightsPeriod>) {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.period = action.payload.period;
        state.lastRefreshed = new Date().toISOString();
      })
      .addCase(fetchInsights.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setInsightsPeriod } = insightsSlice.actions;

export const selectInsightsPeriod = (s: RootState) => s.insights.period;
export const selectInsightsLoading = (s: RootState) => s.insights.loading;
export const selectInsightsData = (s: RootState) => s.insights.data;

export default insightsSlice.reducer;

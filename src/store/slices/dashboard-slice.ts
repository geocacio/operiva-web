import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { ActivityItem, ChartDataPoint, DashboardKpi } from "@/types";

interface DashboardState {
  kpis: DashboardKpi[];
  weeklyChart: ChartDataPoint[];
  statusChart: ChartDataPoint[];
  activities: ActivityItem[];
  loading: boolean;
}

const initialState: DashboardState = {
  kpis: [],
  weeklyChart: [],
  statusChart: [],
  activities: [],
  loading: false,
};

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async () => {
  const [kpis, weeklyChart, statusChart, activities] = await Promise.all([
    fakeApi.getKpis(),
    fakeApi.getWeeklyChart(),
    fakeApi.getStatusDistribution(),
    fakeApi.getActivities(),
  ]);
  return { kpis, weeklyChart, statusChart, activities };
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload.kpis;
        state.weeklyChart = action.payload.weeklyChart;
        state.statusChart = action.payload.statusChart;
        state.activities = action.payload.activities;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;

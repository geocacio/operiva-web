import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "@/lib/fake-api";
import type { Team, User } from "@/types";

interface TeamState {
  teams: Team[];
  users: User[];
  loading: boolean;
}

const initialState: TeamState = {
  teams: [],
  users: [],
  loading: false,
};

export const fetchTeam = createAsyncThunk("team/fetch", async () => {
  const [teams, users] = await Promise.all([
    fakeApi.getTeams(),
    fakeApi.getUsers(),
  ]);
  return { teams, users };
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.teams;
        state.users = action.payload.users;
      })
      .addCase(fetchTeam.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default teamSlice.reducer;

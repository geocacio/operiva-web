import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NicheId } from "@/types/niche";

interface NicheState {
  selectedNiche: NicheId | null;
}

const initialState: NicheState = {
  selectedNiche: null,
};

const nicheSlice = createSlice({
  name: "niche",
  initialState,
  reducers: {
    setSelectedNiche(state, action: PayloadAction<NicheId>) {
      state.selectedNiche = action.payload;
    },
    clearSelectedNiche(state) {
      state.selectedNiche = null;
    },
  },
});

export const { setSelectedNiche, clearSelectedNiche } = nicheSlice.actions;
export default nicheSlice.reducer;

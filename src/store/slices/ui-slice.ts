import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  mobileNavOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setMobileNavOpen(state, action: { payload: boolean }) {
      state.mobileNavOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setMobileNavOpen } = uiSlice.actions;
export default uiSlice.reducer;

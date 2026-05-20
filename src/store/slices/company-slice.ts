import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  clearCompanyStorage,
  loadCompanyFromStorage,
  saveCompanyToStorage,
  type StoredCompanyState,
} from "@/lib/company-storage";
import type { NicheId } from "@/types/niche";

export interface CompanyState extends StoredCompanyState {
  hydrated: boolean;
}

const defaultState: CompanyState = {
  companyName: "",
  nicheId: null,
  onboardingComplete: false,
  selectedTemplateIds: [],
  initialTeamRoleIds: [],
  hydrated: false,
};

const companySlice = createSlice({
  name: "company",
  initialState: defaultState,
  reducers: {
    hydrateCompany(state) {
      const stored = loadCompanyFromStorage();
      if (stored) {
        state.companyName = stored.companyName;
        state.nicheId = stored.nicheId;
        state.onboardingComplete = stored.onboardingComplete;
        state.selectedTemplateIds = stored.selectedTemplateIds;
        state.initialTeamRoleIds = stored.initialTeamRoleIds;
      }
      state.hydrated = true;
    },
    setCompanyName(state, action: PayloadAction<string>) {
      state.companyName = action.payload;
      persist(state);
    },
    setCompanyNiche(state, action: PayloadAction<NicheId>) {
      state.nicheId = action.payload;
      persist(state);
    },
    setSelectedTemplateIds(state, action: PayloadAction<string[]>) {
      state.selectedTemplateIds = action.payload;
      persist(state);
    },
    setInitialTeamRoleIds(state, action: PayloadAction<string[]>) {
      state.initialTeamRoleIds = action.payload;
      persist(state);
    },
    completeOnboarding(
      state,
      action: PayloadAction<{
        companyName: string;
        nicheId: NicheId;
        selectedTemplateIds: string[];
        initialTeamRoleIds: string[];
      }>
    ) {
      state.companyName = action.payload.companyName;
      state.nicheId = action.payload.nicheId;
      state.selectedTemplateIds = action.payload.selectedTemplateIds;
      state.initialTeamRoleIds = action.payload.initialTeamRoleIds;
      state.onboardingComplete = true;
      persist(state);
    },
    resetOnboarding(state) {
      state.companyName = "";
      state.nicheId = null;
      state.onboardingComplete = false;
      state.selectedTemplateIds = [];
      state.initialTeamRoleIds = [];
      clearCompanyStorage();
    },
  },
});

function persist(state: CompanyState) {
  saveCompanyToStorage({
    companyName: state.companyName,
    nicheId: state.nicheId,
    onboardingComplete: state.onboardingComplete,
    selectedTemplateIds: state.selectedTemplateIds,
    initialTeamRoleIds: state.initialTeamRoleIds,
  });
}

export const {
  hydrateCompany,
  setCompanyName,
  setCompanyNiche,
  setSelectedTemplateIds,
  setInitialTeamRoleIds,
  completeOnboarding,
  resetOnboarding,
} = companySlice.actions;

export default companySlice.reducer;

import type { NicheId } from "@/types/niche";

export const ONBOARDING_COMPLETE_KEY = "operiva-onboarding-complete";
export const COMPANY_STORAGE_KEY = "operiva-company";

export interface StoredCompanyState {
  companyName: string;
  nicheId: NicheId | null;
  onboardingComplete: boolean;
  selectedTemplateIds: string[];
  initialTeamRoleIds: string[];
}

export function loadCompanyFromStorage(): StoredCompanyState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
    if (!raw) {
      const legacyComplete =
        localStorage.getItem(ONBOARDING_COMPLETE_KEY) === "true";
      if (legacyComplete) {
        return {
          companyName: "Minha empresa",
          nicheId: "funilaria",
          onboardingComplete: true,
          selectedTemplateIds: [],
          initialTeamRoleIds: [],
        };
      }
      return null;
    }
    return JSON.parse(raw) as StoredCompanyState;
  } catch {
    return null;
  }
}

export function saveCompanyToStorage(state: StoredCompanyState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(state));
  if (state.onboardingComplete) {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
  } else {
    localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
  }
}

export function clearCompanyStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COMPANY_STORAGE_KEY);
  localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
}

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const PORTAL_SESSION_KEY = "operiva-portal-session";

export interface PortalSessionState {
  loggedIn: boolean;
  clientName: string;
  clientPhone: string;
  accessCode: string;
  hydrated: boolean;
}

function loadPortalSession(): Partial<PortalSessionState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PORTAL_SESSION_KEY);
    return raw ? (JSON.parse(raw) as Partial<PortalSessionState>) : null;
  } catch {
    return null;
  }
}

function savePortalSession(state: PortalSessionState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    PORTAL_SESSION_KEY,
    JSON.stringify({
      loggedIn: state.loggedIn,
      clientName: state.clientName,
      clientPhone: state.clientPhone,
      accessCode: state.accessCode,
    })
  );
}

const initialState: PortalSessionState = {
  loggedIn: false,
  clientName: "",
  clientPhone: "",
  accessCode: "",
  hydrated: false,
};

const portalSessionSlice = createSlice({
  name: "portalSession",
  initialState,
  reducers: {
    hydratePortalSession(state) {
      const stored = loadPortalSession();
      if (stored) {
        state.loggedIn = stored.loggedIn ?? false;
        state.clientName = stored.clientName ?? "";
        state.clientPhone = stored.clientPhone ?? "";
        state.accessCode = stored.accessCode ?? "";
      }
      state.hydrated = true;
    },
    loginPortalClient(
      state,
      action: PayloadAction<{ name: string; phone: string; code: string }>
    ) {
      state.loggedIn = true;
      state.clientName = action.payload.name;
      state.clientPhone = action.payload.phone;
      state.accessCode = action.payload.code;
      savePortalSession(state);
    },
    logoutPortalClient(state) {
      state.loggedIn = false;
      state.clientName = "";
      state.clientPhone = "";
      state.accessCode = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem(PORTAL_SESSION_KEY);
      }
    },
  },
});

export const { hydratePortalSession, loginPortalClient, logoutPortalClient } =
  portalSessionSlice.actions;

export default portalSessionSlice.reducer;

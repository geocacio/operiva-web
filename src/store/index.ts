import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./slices/clients-slice";
import dashboardReducer from "./slices/dashboard-slice";
import notificationsReducer from "./slices/notifications-slice";
import servicesReducer from "./slices/services-slice";
import teamReducer from "./slices/team-slice";
import timelineReducer from "./slices/timeline-slice";
import uiReducer from "./slices/ui-slice";
import executionReducer from "./slices/execution-slice";
import clientPortalReducer from "./slices/client-portal-slice";
import nicheReducer from "./slices/niche-slice";
import templateReducer from "./slices/template-slice";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    execution: executionReducer,
    clientPortal: clientPortalReducer,
    niche: nicheReducer,
    template: templateReducer,
    notifications: notificationsReducer,
    dashboard: dashboardReducer,
    timeline: timelineReducer,
    team: teamReducer,
    clients: clientsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

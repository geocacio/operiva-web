import {
  mockActivities,
  mockClients,
  mockKpis,
  mockNotifications,
  mockServices,
  mockStatusDistribution,
  mockTeams,
  mockTimelineEvents,
  mockUsers,
  mockWeeklyChart,
  getMockExecution,
  getMockPortal,
  getInsightsData,
} from "@/mocks";
import type { InsightsPeriod } from "@/types/insights";
import type { ServiceExecution } from "@/types/execution";
import type { ClientPortalData } from "@/types/portal";
import type {
  ActivityItem,
  ChartDataPoint,
  Client,
  DashboardKpi,
  Notification,
  Service,
  Team,
  TimelineEvent,
  User,
} from "@/types";

const delay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function simulate<T>(data: T, ms?: number): Promise<T> {
  await delay(ms);
  return structuredClone(data);
}

export const fakeApi = {
  getServices: () => simulate<Service[]>(mockServices),
  getServiceById: async (id: string) => {
    await delay();
    return mockServices.find((s) => s.id === id) ?? null;
  },
  getExecution: (serviceId: string) =>
    simulate<ServiceExecution>(getMockExecution(serviceId)),
  getClientPortal: (token: string) => {
    const data = getMockPortal(token);
    if (!data) return Promise.reject(new Error("Portal não encontrado"));
    return simulate<ClientPortalData>(data);
  },
  approvePortalStep: async (token: string) => {
    await delay(300);
    const data = getMockPortal(token);
    if (data?.pendingApproval) data.pendingApproval.status = "aprovado";
    return true;
  },
  requestPortalAdjustment: async (token: string, _message: string) => {
    await delay(300);
    const data = getMockPortal(token);
    if (data?.pendingApproval) data.pendingApproval.status = "ajuste_solicitado";
    return true;
  },
  completeExecutionStep: async (serviceId: string) => {
    await delay(200);
    return getMockExecution(serviceId);
  },
  getUsers: () => simulate<User[]>(mockUsers),
  getTeams: () => simulate<Team[]>(mockTeams),
  getClients: () => simulate<Client[]>(mockClients),
  getTimeline: () => simulate<TimelineEvent[]>(mockTimelineEvents),
  getNotifications: () => simulate<Notification[]>(mockNotifications),
  getActivities: () => simulate<ActivityItem[]>(mockActivities),
  getKpis: () => simulate<DashboardKpi[]>(mockKpis),
  getWeeklyChart: () => simulate<ChartDataPoint[]>(mockWeeklyChart),
  getStatusDistribution: () =>
    simulate<ChartDataPoint[]>(mockStatusDistribution),
  getInsights: (period: InsightsPeriod) =>
    simulate(getInsightsData(period), 550),
  markNotificationRead: async (id: string) => {
    await delay(200);
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = true;
    return true;
  },
};

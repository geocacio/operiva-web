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
} from "@/mocks";
import type { ServiceExecution } from "@/types/execution";
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
  markNotificationRead: async (id: string) => {
    await delay(200);
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = true;
    return true;
  },
};

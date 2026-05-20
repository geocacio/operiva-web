export type ServiceStatus =
  | "em_andamento"
  | "aguardando_aprovacao"
  | "atrasado"
  | "concluido"
  | "em_analise"
  | "cancelado";

export type Priority = "alta" | "media" | "baixa";

export type UserStatus = "online" | "offline" | "ocupado";

export type NotificationType = "alerta" | "info" | "sucesso" | "atraso";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  status: UserStatus;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  color: string;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  servicesCount: number;
  lastContact: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  status: ServiceStatus;
  priority: Priority;
  progress: number;
  assigneeId: string;
  teamId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  stepsCompleted: number;
  stepsTotal: number;
  /** Serviço originado de template operacional */
  templateId?: string;
  nicheId?: string;
  portalToken?: string;
}

export interface TimelineEvent {
  id: string;
  serviceId: string;
  serviceTitle: string;
  userId: string;
  userName: string;
  type: "etapa" | "foto" | "comentario" | "status" | "aprovacao";
  title: string;
  description: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  serviceId?: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface DashboardKpi {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

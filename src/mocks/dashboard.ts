import type { ChartDataPoint, DashboardKpi } from "@/types";

export const mockKpis: DashboardKpi[] = [
  {
    label: "Serviços ativos",
    value: 12,
    change: 8,
    trend: "up",
  },
  {
    label: "Concluídos (mês)",
    value: 24,
    change: 12,
    trend: "up",
  },
  {
    label: "Atrasados",
    value: 3,
    change: -2,
    trend: "down",
  },
  {
    label: "Aguardando aprovação",
    value: 5,
    change: 1,
    trend: "neutral",
  },
];

export const mockWeeklyChart: ChartDataPoint[] = [
  { label: "Seg", value: 4 },
  { label: "Ter", value: 6 },
  { label: "Qua", value: 5 },
  { label: "Qui", value: 8 },
  { label: "Sex", value: 7 },
  { label: "Sáb", value: 3 },
  { label: "Dom", value: 2 },
];

export const mockStatusDistribution: ChartDataPoint[] = [
  { label: "Em andamento", value: 5 },
  { label: "Aguardando", value: 2 },
  { label: "Atrasado", value: 1 },
  { label: "Concluído", value: 1 },
  { label: "Em análise", value: 1 },
];

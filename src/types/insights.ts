export type InsightsPeriod = "today" | "week" | "month";

export type InsightSeverity = "positive" | "critical" | "operational";

export type FlowSpeed = "fast" | "normal" | "slow" | "bottleneck";

export interface OperivaScoreBreakdown {
  key: string;
  label: string;
  score: number;
  maxScore: number;
}

export interface InsightsKpi {
  id: string;
  label: string;
  value: string;
  sublabel?: string;
  trend?: "up" | "down" | "neutral";
  change?: number;
  variant?: "default" | "success" | "warning" | "danger";
  bars?: { label: string; value: number; color: string }[];
}

export interface BottleneckRow {
  etapa: string;
  tempoMedio: string;
  severity: "high" | "medium" | "low";
}

export interface HeatmapCell {
  team: string;
  step: string;
  load: number; // 0-100
}

export interface AutoInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  metric?: string;
}

export interface FlowStep {
  id: string;
  name: string;
  speed: FlowSpeed;
  avgTime: string;
  servicesCount: number;
}

export interface TeamRankingEntry {
  id: string;
  name: string;
  productivity: number;
  stepsCompleted: number;
  avgTimeHours: number;
  delays: number;
  rework: number;
}

export interface EmployeeRankingEntry extends TeamRankingEntry {
  teamName: string;
}

export interface TrendMetric {
  label: string;
  current: string;
  previous: string;
  changePercent: number;
  positive: boolean;
  insight?: string;
}

export interface InsightsPeriodData {
  operivaScore: number;
  scoreBreakdown: OperivaScoreBreakdown[];
  kpis: InsightsKpi[];
  bottlenecks: BottleneckRow[];
  heatmap: HeatmapCell[];
  autoInsights: AutoInsight[];
  flowSteps: FlowStep[];
  teamRanking: TeamRankingEntry[];
  employeeRanking: EmployeeRankingEntry[];
  trends: TrendMetric[];
  healthLabel: string;
  healthStatus: "healthy" | "attention";
}

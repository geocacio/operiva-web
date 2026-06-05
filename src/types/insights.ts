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
  load: number;
}

export interface AutoInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  metric?: string;
}

/**
 * Representa o desempenho de uma etapa operacional.
 * Renomeado de FlowStep → OperationStep para refletir modelo serviço-cêntrico.
 */
export interface OperationStep {
  id: string;
  name: string;
  speed: FlowSpeed;
  avgTime: string;
  servicesCount: number;
}

/** @deprecated Use OperationStep — alias mantido para compatibilidade */
export type FlowStep = OperationStep;

export interface OccurrenceStatRow {
  type: string;
  count: number;
  percentOfTotal: number;
}

export interface OccurrenceStats {
  totalInPeriod: number;
  resolved: number;
  pending: number;
  byType: OccurrenceStatRow[];
  mostCommon?: string;
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
  /** @deprecated Use operationSteps */
  flowSteps: OperationStep[];
  /** Desempenho por etapa operacional */
  operationSteps: OperationStep[];
  teamRanking: TeamRankingEntry[];
  employeeRanking: EmployeeRankingEntry[];
  trends: TrendMetric[];
  healthLabel: string;
  healthStatus: "healthy" | "attention";
  /** Estatísticas de ocorrências registradas no período */
  occurrenceStats?: OccurrenceStats;
}

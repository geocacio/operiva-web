import type { InsightsPeriod, InsightsPeriodData } from "@/types/insights";

const baseHeatmapTeams = [
  "Funilaria Norte",
  "Funilaria Sul",
  "Pintura A",
  "Pintura B",
  "Montagem",
];
const baseHeatmapSteps = [
  "Recepção",
  "Orçamento",
  "Funilaria",
  "Pintura",
  "Montagem",
  "Entrega",
];

function buildHeatmap(
  loads: Record<string, number>
): InsightsPeriodData["heatmap"] {
  return baseHeatmapTeams.flatMap((team) =>
    baseHeatmapSteps.map((step) => ({
      team,
      step,
      load: loads[`${team}|${step}`] ?? Math.floor(20 + Math.random() * 40),
    }))
  );
}

const todayData: InsightsPeriodData = {
  operivaScore: 86,
  healthLabel: "Operação saudável",
  healthStatus: "healthy",
  scoreBreakdown: [
    { key: "velocidade", label: "Velocidade", score: 88, maxScore: 100 },
    { key: "organizacao", label: "Organização", score: 91, maxScore: 100 },
    { key: "atrasos", label: "Controle de atrasos", score: 79, maxScore: 100 },
    { key: "aprovacoes", label: "Aprovações", score: 82, maxScore: 100 },
    { key: "sla", label: "SLA", score: 87, maxScore: 100 },
    { key: "produtividade", label: "Produtividade", score: 85, maxScore: 100 },
  ],
  kpis: [
    {
      id: "health",
      label: "Saúde operacional",
      value: "Operação saudável",
      sublabel: "3 etapas dentro do SLA",
      variant: "success",
    },
    {
      id: "risk",
      label: "Serviços em risco",
      value: "7",
      sublabel: "4 atrasados · 2 perto do SLA · 1 aguardando aprovação",
      variant: "warning",
    },
    {
      id: "avg-time",
      label: "Tempo médio por etapa",
      value: "4,2h",
      sublabel: "Hoje · ontem 4,8h",
      trend: "down",
      change: -12,
    },
    {
      id: "efficiency",
      label: "Eficiência",
      value: "87%",
      bars: [
        { label: "Produtividade", value: 87, color: "#10B981" },
        { label: "Atrasos", value: 18, color: "#F59E0B" },
        { label: "Retrabalho", value: 9, color: "#EF4444" },
      ],
    },
  ],
  bottlenecks: [
    { etapa: "Pintura", tempoMedio: "3,2 dias", severity: "high" },
    { etapa: "Aprovação", tempoMedio: "18h", severity: "high" },
    { etapa: "Montagem", tempoMedio: "6h", severity: "medium" },
    { etapa: "Funilaria", tempoMedio: "1,4 dias", severity: "low" },
    { etapa: "Recepção", tempoMedio: "45min", severity: "low" },
  ],
  heatmap: buildHeatmap({
    "Funilaria Norte|Pintura": 92,
    "Funilaria Norte|Funilaria": 78,
    "Pintura A|Pintura": 95,
    "Pintura B|Pintura": 88,
    "Pintura A|Montagem": 72,
    "Montagem|Montagem": 65,
    "Funilaria Sul|Orçamento": 58,
  }),
  autoInsights: [
    {
      id: "ai-1",
      severity: "critical",
      title: "Gargalo em Pintura",
      description: "83% dos atrasos acontecem na etapa Pintura.",
      metric: "83%",
    },
    {
      id: "ai-2",
      severity: "operational",
      title: "Funilaria Norte acima da média",
      description:
        "A equipe Funilaria Norte está 42% acima da média operacional.",
      metric: "+42%",
    },
    {
      id: "ai-3",
      severity: "operational",
      title: "Aprovação de orçamento",
      description: "Clientes levam em média 18h para aprovar orçamento.",
      metric: "18h",
    },
    {
      id: "ai-4",
      severity: "operational",
      title: "Aguardando peças",
      description: "Serviços ficam parados em média 2,4 dias aguardando peças.",
      metric: "2,4d",
    },
    {
      id: "ai-5",
      severity: "positive",
      title: "Destaque: Carlos",
      description: "Carlos conclui etapas 31% mais rápido que a média.",
      metric: "+31%",
    },
    {
      id: "ai-6",
      severity: "critical",
      title: "Atrasos em alta",
      description: "Os atrasos aumentaram 12% esta semana.",
      metric: "+12%",
    },
  ],
  flowSteps: [
    {
      id: "recepcao",
      name: "Recepção",
      speed: "fast",
      avgTime: "45min",
      servicesCount: 12,
    },
    {
      id: "orcamento",
      name: "Orçamento",
      speed: "normal",
      avgTime: "18h",
      servicesCount: 8,
    },
    {
      id: "funilaria",
      name: "Funilaria",
      speed: "normal",
      avgTime: "1,4 dias",
      servicesCount: 14,
    },
    {
      id: "pintura",
      name: "Pintura",
      speed: "bottleneck",
      avgTime: "3,2 dias",
      servicesCount: 11,
    },
    {
      id: "montagem",
      name: "Montagem",
      speed: "normal",
      avgTime: "6h",
      servicesCount: 9,
    },
    {
      id: "entrega",
      name: "Entrega",
      speed: "fast",
      avgTime: "2h",
      servicesCount: 6,
    },
  ],
  teamRanking: [
    {
      id: "t1",
      name: "Funilaria Norte",
      productivity: 94,
      stepsCompleted: 48,
      avgTimeHours: 3.2,
      delays: 2,
      rework: 1,
    },
    {
      id: "t2",
      name: "Pintura A",
      productivity: 72,
      stepsCompleted: 31,
      avgTimeHours: 5.8,
      delays: 9,
      rework: 4,
    },
    {
      id: "t3",
      name: "Pintura B",
      productivity: 78,
      stepsCompleted: 28,
      avgTimeHours: 5.1,
      delays: 6,
      rework: 3,
    },
    {
      id: "t4",
      name: "Montagem",
      productivity: 88,
      stepsCompleted: 36,
      avgTimeHours: 2.4,
      delays: 3,
      rework: 2,
    },
  ],
  employeeRanking: [
    {
      id: "e1",
      name: "Carlos Mendes",
      teamName: "Funilaria Norte",
      productivity: 112,
      stepsCompleted: 22,
      avgTimeHours: 2.1,
      delays: 0,
      rework: 0,
    },
    {
      id: "e2",
      name: "Ana Paula",
      teamName: "Pintura A",
      productivity: 68,
      stepsCompleted: 14,
      avgTimeHours: 6.2,
      delays: 5,
      rework: 2,
    },
    {
      id: "e3",
      name: "Roberto Lima",
      teamName: "Montagem",
      productivity: 95,
      stepsCompleted: 18,
      avgTimeHours: 2.3,
      delays: 1,
      rework: 1,
    },
    {
      id: "e4",
      name: "Juliana Costa",
      teamName: "Pintura B",
      productivity: 81,
      stepsCompleted: 16,
      avgTimeHours: 4.9,
      delays: 3,
      rework: 1,
    },
  ],
  trends: [
    {
      label: "Atrasos",
      current: "12",
      previous: "10,7",
      changePercent: 12,
      positive: false,
    },
    {
      label: "Tempo médio",
      current: "4,2h",
      previous: "4,9h",
      changePercent: -14,
      positive: true,
      insight: "Redução de 14% no tempo médio — boa tendência",
    },
    {
      label: "SLA cumprido",
      current: "91%",
      previous: "89%",
      changePercent: 2,
      positive: true,
    },
    {
      label: "Retrabalho",
      current: "9%",
      previous: "11%",
      changePercent: -18,
      positive: true,
    },
  ],
};

const weekData: InsightsPeriodData = {
  ...todayData,
  operivaScore: 84,
  healthLabel: "Atenção em Pintura",
  healthStatus: "attention",
  kpis: [
    {
      id: "health",
      label: "Saúde operacional",
      value: "Atenção em Pintura",
      sublabel: "Gargalo persistente na semana",
      variant: "warning",
    },
    {
      id: "risk",
      label: "Serviços em risco",
      value: "19",
      sublabel: "11 atrasados · 5 perto do SLA · 3 aguardando aprovação",
      variant: "danger",
    },
    {
      id: "avg-time",
      label: "Tempo médio por etapa",
      value: "1,8 dias",
      sublabel: "Semana · semana anterior 2,1 dias",
      trend: "down",
      change: -14,
    },
    {
      id: "efficiency",
      label: "Eficiência",
      value: "84%",
      bars: [
        { label: "Produtividade", value: 84, color: "#10B981" },
        { label: "Atrasos", value: 22, color: "#F59E0B" },
        { label: "Retrabalho", value: 11, color: "#EF4444" },
      ],
    },
  ],
  trends: [
    {
      label: "Atrasos",
      current: "47",
      previous: "42",
      changePercent: 12,
      positive: false,
      insight: "Os atrasos aumentaram 12% esta semana",
    },
    {
      label: "Tempo médio",
      current: "1,8 dias",
      previous: "2,1 dias",
      changePercent: -14,
      positive: true,
      insight: "Tempo médio caiu 14% — impacto positivo na operação",
    },
    {
      label: "Etapa concluídas",
      current: "186",
      previous: "172",
      changePercent: 8,
      positive: true,
    },
    {
      label: "Aprovações",
      current: "34",
      previous: "29",
      changePercent: 17,
      positive: true,
    },
  ],
};

const monthData: InsightsPeriodData = {
  ...weekData,
  operivaScore: 82,
  healthLabel: "Atenção em Pintura",
  healthStatus: "attention",
  kpis: [
    {
      id: "health",
      label: "Saúde operacional",
      value: "Atenção em Pintura",
      sublabel: "Pintura concentra 78% dos gargalos do mês",
      variant: "warning",
    },
    {
      id: "risk",
      label: "Serviços em risco",
      value: "62",
      sublabel: "38 atrasados · 15 perto do SLA · 9 aguardando aprovação",
      variant: "danger",
    },
    {
      id: "avg-time",
      label: "Tempo médio por etapa",
      value: "2,1 dias",
      sublabel: "Mês · mês anterior 2,4 dias",
      trend: "down",
      change: -8,
    },
    {
      id: "efficiency",
      label: "Eficiência",
      value: "81%",
      bars: [
        { label: "Produtividade", value: 81, color: "#10B981" },
        { label: "Atrasos", value: 26, color: "#F59E0B" },
        { label: "Retrabalho", value: 13, color: "#EF4444" },
      ],
    },
  ],
  trends: [
    {
      label: "Atrasos",
      current: "198",
      previous: "176",
      changePercent: 12,
      positive: false,
    },
    {
      label: "Tempo médio",
      current: "2,1 dias",
      previous: "2,4 dias",
      changePercent: -8,
      positive: true,
    },
    {
      label: "Operiva Score",
      current: "82",
      previous: "79",
      changePercent: 4,
      positive: true,
    },
    {
      label: "Serviços concluídos",
      current: "124",
      previous: "108",
      changePercent: 15,
      positive: true,
    },
  ],
};

export const insightsMockByPeriod: Record<InsightsPeriod, InsightsPeriodData> = {
  today: todayData,
  week: weekData,
  month: monthData,
};

export function getInsightsData(period: InsightsPeriod): InsightsPeriodData {
  return structuredClone(insightsMockByPeriod[period]);
}

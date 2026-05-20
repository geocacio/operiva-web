"use client";

import { BarChart3, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { SimpleBarChart } from "@/components/shared/simple-bar-chart";
import { GlassCard } from "@/components/shared/glass-card";
import {
  mockKpis,
  mockStatusDistribution,
  mockWeeklyChart,
} from "@/mocks";

export function RelatoriosView() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Métricas simuladas — dados reais após integração com backend.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={i * 0.05} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleBarChart
          title="Serviços por semana"
          data={mockWeeklyChart}
        />

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="size-5 text-[#10B981]" />
            <h3 className="font-semibold">Distribuição por status</h3>
          </div>
          <ul className="space-y-3">
            {mockStatusDistribution.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard className="flex items-center gap-4 p-5">
          <CheckCircle2 className="size-10 text-[#10B981]" />
          <div>
            <p className="text-2xl font-semibold">94%</p>
            <p className="text-xs text-muted-foreground">SLA no prazo (mock)</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4 p-5">
          <Clock className="size-10 text-[#F59E0B]" />
          <div>
            <p className="text-2xl font-semibold">2,4d</p>
            <p className="text-xs text-muted-foreground">Tempo médio por etapa</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4 p-5">
          <BarChart3 className="size-10 text-[#06B6D4]" />
          <div>
            <p className="text-2xl font-semibold">18</p>
            <p className="text-xs text-muted-foreground">Aprovações esta semana</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

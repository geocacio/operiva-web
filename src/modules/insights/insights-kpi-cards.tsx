"use client";

import {
  Activity,
  AlertTriangle,
  Clock,
  HeartPulse,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { InsightsKpi } from "@/types/insights";

const icons: Record<string, typeof HeartPulse> = {
  health: HeartPulse,
  risk: AlertTriangle,
  "avg-time": Clock,
  efficiency: Activity,
};

const variantStyles = {
  default: "text-cyan-400",
  success: "text-emerald-400",
  warning: "text-amber-400",
  danger: "text-red-400",
};

export function InsightsKpiCards({
  kpis,
  baseDelay = 0,
}: {
  kpis: InsightsKpi[];
  baseDelay?: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, i) => {
        const Icon = icons[kpi.id] ?? Activity;
        const color =
          variantStyles[kpi.variant ?? "default"] ?? variantStyles.default;

        return (
          <GlassCard key={kpi.id} delay={baseDelay + i * 0.06} className="p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <Icon className={cn("size-4 shrink-0", color)} />
            </div>
            <p className={cn("mt-2 text-2xl font-semibold tracking-tight", color)}>
              {kpi.value}
            </p>
            {kpi.sublabel && (
              <p className="mt-1 text-xs text-muted-foreground">{kpi.sublabel}</p>
            )}
            {kpi.change !== undefined && kpi.trend && (
              <p
                className={cn(
                  "mt-2 text-xs",
                  kpi.trend === "down" && kpi.change < 0
                    ? "text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {kpi.change > 0 ? "+" : ""}
                {kpi.change}% vs. período anterior
              </p>
            )}
            {kpi.bars && (
              <div className="mt-4 space-y-2">
                {kpi.bars.map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-0.5 flex justify-between text-[10px] text-muted-foreground">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${bar.value}%`,
                          backgroundColor: bar.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
}

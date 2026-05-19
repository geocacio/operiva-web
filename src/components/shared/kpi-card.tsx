"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { DashboardKpi } from "@/types";

export function KpiCard({ kpi, delay = 0 }: { kpi: DashboardKpi; delay?: number }) {
  const TrendIcon =
    kpi.trend === "up"
      ? ArrowUpRight
      : kpi.trend === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <GlassCard delay={delay} className="p-5">
      <p className="text-sm text-muted-foreground">{kpi.label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{kpi.value}</p>
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
          kpi.trend === "up" && "bg-emerald-500/10 text-emerald-400",
          kpi.trend === "down" && "bg-emerald-500/10 text-emerald-400",
          kpi.trend === "neutral" && "bg-white/5 text-muted-foreground"
        )}
      >
        <TrendIcon className="size-3" />
        <span>
          {kpi.change > 0 ? "+" : ""}
          {kpi.change}% vs. semana anterior
        </span>
      </div>
    </GlassCard>
  );
}

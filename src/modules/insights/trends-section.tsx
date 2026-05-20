"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { TrendMetric } from "@/types/insights";

export function TrendsSection({
  trends,
  delay = 0,
}: {
  trends: TrendMetric[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="p-6">
      <h3 className="font-semibold">Tendências</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Comparação com o período anterior
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {trends.map((t) => {
          const Icon = t.positive ? TrendingUp : TrendingDown;
          const up = t.changePercent > 0;
          const good = t.positive;

          return (
            <div
              key={t.label}
              className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
            >
              <p className="text-xs text-muted-foreground">{t.label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-xl font-semibold tabular-nums">{t.current}</p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                    good
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  )}
                >
                  <Icon className="size-3" />
                  {up ? "+" : ""}
                  {t.changePercent}%
                </span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Anterior: {t.previous}
              </p>
              {t.insight && (
                <p className="mt-2 text-xs text-cyan-400/90">{t.insight}</p>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

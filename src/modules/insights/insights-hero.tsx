"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LiveBadge } from "@/components/landing/landing-shared";
import { useMotionConfig } from "@/hooks/use-motion";
import { InsightsPeriodTabs } from "./insights-period-tabs";
import { useAnimatedNumber } from "./use-animated-number";
import type { InsightsPeriod } from "@/types/insights";

export function InsightsHero({
  period,
  onPeriodChange,
  healthLabel,
  score,
}: {
  period: InsightsPeriod;
  onPeriodChange: (p: InsightsPeriod) => void;
  healthLabel: string;
  score: number;
}) {
  const { reduced, fade } = useMotionConfig();
  const scoreDisplay = useAnimatedNumber(score, 900, 0);

  return (
    <motion.section
      className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#111827] via-[#0B0F19] to-[#0B0F19] p-6 sm:p-8"
      {...(reduced ? {} : { initial: fade.initial, animate: fade.animate, transition: fade.transition })}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/3 size-48 rounded-full bg-cyan-500/8 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <LiveBadge>Copiloto ativo</LiveBadge>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/20 text-emerald-400 shadow-[0_0_32px_rgba(16,185,129,0.2)]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Operiva Insights
              </h1>
              <p className="text-sm text-cyan-400/90">
                Seu copiloto operacional
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Entenda sua operação em 30 segundos — gargalos, equipes, tendências e
            recomendações automáticas para funilaria e construção.
          </p>
          <p className="mt-3 text-sm font-medium text-emerald-400/90">
            {healthLabel}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <InsightsPeriodTabs value={period} onChange={onPeriodChange} />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Operiva Score
            </p>
            <p className="text-4xl font-bold tabular-nums tracking-tight text-emerald-400">
              {scoreDisplay}
              <span className="text-lg text-muted-foreground">/100</span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

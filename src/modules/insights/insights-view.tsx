"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchInsights,
  setInsightsPeriod,
  selectInsightsData,
  selectInsightsLoading,
  selectInsightsPeriod,
} from "@/store/slices/insights-slice";
import { InsightsHero } from "./insights-hero";
import { OperivaScore } from "./operiva-score";
import { InsightsKpiCards } from "./insights-kpi-cards";
import { BottlenecksSection } from "./bottlenecks-section";
import { OperationalHeatmap } from "./operational-heatmap";
import { AutoInsightsFeed } from "./auto-insights-feed";
import { TeamRanking } from "./team-ranking";
import { FlowAnalysis } from "./flow-analysis";
import { TrendsSection } from "./trends-section";
import type { InsightsPeriod } from "@/types/insights";

function InsightsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}

export function InsightsView() {
  const dispatch = useAppDispatch();
  const period = useAppSelector(selectInsightsPeriod);
  const data = useAppSelector(selectInsightsData);
  const loading = useAppSelector(selectInsightsLoading);
  const { reduced, fade } = useMotionConfig();

  useEffect(() => {
    dispatch(fetchInsights(period));
  }, [dispatch, period]);

  const handlePeriod = (p: InsightsPeriod) => {
    dispatch(setInsightsPeriod(p));
    dispatch(fetchInsights(p));
  };

  if (loading && !data) {
    return <InsightsSkeleton />;
  }

  if (!data) return null;

  const sectionMotion = reduced
    ? {}
    : {
        initial: fade.initial,
        whileInView: fade.animate,
        viewport: { once: true, margin: "-40px" },
        transition: fade.transition,
      };

  return (
    <div className="space-y-8">
      <InsightsHero
        period={period}
        onPeriodChange={handlePeriod}
        healthLabel={data.healthLabel}
        score={data.operivaScore}
      />

      <motion.section {...sectionMotion}>
        <InsightsKpiCards kpis={data.kpis} baseDelay={0.05} />
      </motion.section>

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <motion.div className="min-w-0 lg:col-span-1" {...sectionMotion}>
          <OperivaScore
            score={data.operivaScore}
            breakdown={data.scoreBreakdown}
            delay={0.1}
          />
        </motion.div>
        <motion.div
          className="min-w-0 space-y-6 lg:col-span-2"
          {...sectionMotion}
        >
          <FlowAnalysis steps={data.operationSteps ?? data.flowSteps} delay={0.12} />
          <BottlenecksSection rows={data.bottlenecks} delay={0.14} />
        </motion.div>
      </div>

      <motion.section {...sectionMotion}>
        <OperationalHeatmap cells={data.heatmap} delay={0.16} />
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div {...sectionMotion}>
          <AutoInsightsFeed insights={data.autoInsights} delay={0.18} />
        </motion.div>
        <motion.div {...sectionMotion}>
          <TrendsSection trends={data.trends} delay={0.2} />
        </motion.div>
      </div>

      <motion.section {...sectionMotion}>
        <TeamRanking
          teams={data.teamRanking}
          employees={data.employeeRanking}
          delay={0.22}
        />
      </motion.section>

      <p className="text-center text-[10px] text-muted-foreground/70">
        Dados simulados · Operiva Insights MVP
      </p>
    </div>
  );
}

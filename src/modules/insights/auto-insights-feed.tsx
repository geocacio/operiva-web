"use client";

import { Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { InsightCard } from "@/components/operiva/insight-card";
import type { AutoInsight } from "@/types/insights";

export function AutoInsightsFeed({
  insights,
  delay = 0,
}: {
  insights: AutoInsight[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="size-5 text-emerald-400" />
        <h3 className="font-semibold">Insights automáticos</h3>
      </div>
      <div className="space-y-3">
        {insights.map((item, i) => (
          <InsightCard
            key={item.id}
            severity={item.severity}
            title={item.title}
            description={item.description}
            metric={item.metric}
            delay={delay + 0.05 + i * 0.04}
          />
        ))}
      </div>
    </GlassCard>
  );
}

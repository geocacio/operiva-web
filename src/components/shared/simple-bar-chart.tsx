"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import type { ChartDataPoint } from "@/types";

export function SimpleBarChart({
  title,
  subtitle,
  data,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  delay?: number;
}) {
  const { reduced } = useMotionConfig();
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <GlassCard delay={delay} className="p-5">
      <div className="mb-6">
        <h3 className="font-medium">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex h-36 items-end justify-between gap-2">
        {data.map((point, i) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-indigo-600/80 to-violet-400/90"
              initial={reduced ? { height: `${(point.value / max) * 100}%` } : { height: 0 }}
              animate={{ height: `${(point.value / max) * 100}%` }}
              transition={{ delay: reduced ? 0 : 0.1 + i * 0.05, duration: 0.5 }}
              style={{ minHeight: 4 }}
            />
            <span className="text-[10px] text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

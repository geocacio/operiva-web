"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/hooks/use-motion";
import type { InsightSeverity } from "@/types/insights";

const severityConfig: Record<
  InsightSeverity,
  { icon: LucideIcon; border: string; glow: string; iconColor: string }
> = {
  positive: {
    icon: CheckCircle2,
    border: "border-emerald-500/25",
    glow: "shadow-[0_0_24px_rgba(16,185,129,0.12)]",
    iconColor: "text-emerald-400",
  },
  critical: {
    icon: AlertTriangle,
    border: "border-amber-500/30",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.1)]",
    iconColor: "text-amber-400",
  },
  operational: {
    icon: Info,
    border: "border-cyan-500/25",
    glow: "shadow-[0_0_24px_rgba(6,182,212,0.1)]",
    iconColor: "text-cyan-400",
  },
};

export function InsightCard({
  severity,
  title,
  description,
  metric,
  delay = 0,
  className,
}: {
  severity: InsightSeverity;
  title: string;
  description: string;
  metric?: string;
  delay?: number;
  className?: string;
}) {
  const { reduced, fade } = useMotionConfig();
  const config = severityConfig[severity];
  const Icon = config.icon;

  const content = (
    <div
      className={cn(
        "operiva-glass flex gap-3 rounded-xl border p-4 transition-colors",
        config.border,
        config.glow,
        className
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5",
          config.iconColor
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">{title}</p>
          {metric && (
            <span
              className={cn(
                "shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-xs font-semibold tabular-nums",
                config.iconColor
              )}
            >
              {metric}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );

  if (reduced) return content;

  return (
    <motion.div
      initial={fade.initial}
      animate={fade.animate}
      transition={{ ...fade.transition, delay }}
    >
      {content}
    </motion.div>
  );
}

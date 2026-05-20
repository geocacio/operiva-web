"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAnimatedNumber } from "./use-animated-number";
import type { OperivaScoreBreakdown } from "@/types/insights";
import { cn } from "@/lib/utils";

export function OperivaScore({
  score,
  breakdown,
  delay = 0,
}: {
  score: number;
  breakdown: OperivaScoreBreakdown[];
  delay?: number;
}) {
  const { reduced, fade } = useMotionConfig();
  const scoreText = useAnimatedNumber(score, 1000, 0);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <GlassCard delay={delay} className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground">
        Operiva Score
      </h3>
      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <svg width="128" height="128" className="-rotate-90">
            <circle
              cx="64"
              cy="64"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="52"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reduced ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tabular-nums text-emerald-400">
              {scoreText}
            </span>
            <span className="text-xs text-muted-foreground">de 100</span>
          </div>
        </div>

        <motion.ul
          className="w-full flex-1 space-y-3"
          {...(reduced
            ? {}
            : {
                initial: fade.initial,
                animate: fade.animate,
                transition: { ...fade.transition, delay: delay + 0.15 },
              })}
        >
          {breakdown.map((item) => (
            <li key={item.key}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium tabular-nums">{item.score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r from-emerald-500/80 to-cyan-500/70"
                  )}
                  initial={reduced ? { width: `${item.score}%` } : { width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: reduced ? 0 : 0.8, delay: delay + 0.1 }}
                />
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </GlassCard>
  );
}

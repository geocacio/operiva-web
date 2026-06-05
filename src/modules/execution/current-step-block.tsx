"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { ExecutionStep } from "@/types/execution";

export function CurrentStepBlock({
  steps,
  currentStepIndex,
  progressPercent,
}: {
  steps: ExecutionStep[];
  currentStepIndex: number;
  progressPercent: number;
}) {
  const { reduced, stagger } = useMotionConfig();
  const current = steps[currentStepIndex];
  const completedCount = steps.filter((s) => s.status === "concluida").length;

  if (!current) return null;

  return (
    <GlassCard className="border-[#1F2937] bg-[#111827]/80 p-5">
      <motion.div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-[#06B6D4]">
          Trabalho atual
        </p>
        <span className="text-xs text-[#9CA3AF]">
          {completedCount}/{steps.length} trabalhos
        </span>
      </motion.div>

      <motion.h2
        className="text-xl font-semibold text-[#F9FAFB]"
        initial={reduced ? false : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        key={current.id}
      >
        {current.name}
      </motion.h2>

      <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
        {current.description}
      </p>

      <motion.div className="mt-5">
        <ProgressBar
          value={progressPercent}
          barClassName="from-[#3B82F6] to-[#06B6D4]"
        />
      </motion.div>

      <motion.div className="mt-5 flex gap-1">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              step.status === "concluida" && "bg-[#10B981]",
              step.status === "atual" && "bg-[#3B82F6]",
              step.status === "pendente" && "bg-[#1F2937]"
            )}
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * stagger, duration: 0.35 }}
            style={{ transformOrigin: "left" }}
            title={step.name}
          />
        ))}
      </motion.div>
    </GlassCard>
  );
}

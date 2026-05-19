"use client";

import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { ClientPortalData } from "@/types/portal";

export function PortalProgressJourney({ portal }: { portal: ClientPortalData }) {
  const { reduced, stagger } = useMotionConfig();
  const current = portal.journeySteps.find((s) => s.current);

  return (
    <section className="px-5 py-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-[#9CA3AF]">Jornada do serviço</h2>
        <motion.span
          className="text-lg font-bold tabular-nums text-[#06B6D4]"
          initial={reduced ? false : { opacity: 0 }}
          animate={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, scale: [1, 1.04, 1] }
          }
          transition={{ duration: 3, repeat: Infinity }}
        >
          {portal.progressPercent}%
        </motion.span>
      </div>

      <motion.div
        className="relative h-2 overflow-hidden rounded-full bg-[#1F2937]"
        aria-hidden
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981]"
          initial={{ width: 0 }}
          animate={{ width: `${portal.progressPercent}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {!reduced && (
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-white/20 blur-sm"
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: `${portal.progressPercent}%` }}
          />
        )}
      </motion.div>

      <motion.div className="relative mt-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ol className="relative flex min-w-max gap-0 px-1">
          {portal.journeySteps.map((step, i) => (
            <motion.li
              key={step.id}
              className="flex w-[4.25rem] flex-col items-center sm:w-[5rem]"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * stagger }}
            >
              <motion.div
                className={cn(
                  "relative z-10 flex size-9 items-center justify-center rounded-2xl text-xs font-semibold sm:size-10",
                  step.completed &&
                    "bg-gradient-to-br from-[#10B981] to-[#059669] text-[#0B0F19] shadow-lg shadow-[#10B981]/25",
                  step.current &&
                    "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/35 ring-2 ring-[#3B82F6]/40 ring-offset-2 ring-offset-[#0B0F19]",
                  !step.completed &&
                    !step.current &&
                    "border border-[#1F2937] bg-[#111827] text-[#6B7280]"
                )}
                animate={
                  step.current && !reduced
                    ? { scale: [1, 1.06, 1] }
                    : undefined
                }
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {step.completed ? "✓" : i + 1}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-center text-[10px] leading-tight",
                  step.current
                    ? "font-semibold text-[#F9FAFB]"
                    : step.completed
                      ? "text-[#10B981]"
                      : "text-[#6B7280]"
                )}
              >
                {step.label}
              </span>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {current && (
        <motion.p
          className="mt-4 rounded-xl border border-[#1F2937]/80 bg-[#111827]/50 px-4 py-3 text-center text-sm text-[#F9FAFB]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Agora: <span className="text-[#06B6D4]">{current.label}</span>
        </motion.p>
      )}
    </section>
  );
}

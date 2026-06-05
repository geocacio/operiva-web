"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, AlertCircle, Plus } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { ExecutionStep } from "@/types/execution";

export function ExecutionHeroStep({
  steps,
  currentStepIndex,
  progressPercent,
  occurrencesCount = 0,
}: {
  steps: ExecutionStep[];
  currentStepIndex: number;
  progressPercent: number;
  occurrencesCount?: number;
}) {
  const { reduced, stagger } = useMotionConfig();
  const [showAllSteps, setShowAllSteps] = useState(false);

  const current = steps[currentStepIndex];
  const completedCount = steps.filter((s) => s.status === "concluida").length;
  const dynamicCount = steps.filter((s) => s.addedDuringExecution).length;

  if (!current) return null;

  return (
    <motion.section
      className="mx-4 mt-5 rounded-2xl border border-[#1F2937] bg-gradient-to-br from-[#111827] to-[#0B0F19] shadow-lg shadow-[#3B82F6]/5"
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      key={current.id}
    >
      {/* Current step hero */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#06B6D4]">
              Trabalho {completedCount + 1} de {steps.length}
              {dynamicCount > 0 && (
                <span className="ml-2 rounded-full bg-[#6366F1]/20 px-2 py-0.5 text-[9px] text-[#A5B4FC]">
                  +{dynamicCount} adicionada{dynamicCount > 1 ? "s" : ""}
                </span>
              )}
            </p>

            <motion.h2
              className="mt-3 text-2xl font-bold leading-tight text-[#F9FAFB] sm:text-3xl"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {current.name}
            </motion.h2>
          </div>

          {occurrencesCount > 0 && (
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2.5 py-1 text-xs text-[#FCD34D]">
              <AlertCircle className="size-3" />
              <span>{occurrencesCount}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-base leading-relaxed text-[#9CA3AF]">
          {current.description}
        </p>

        {/* Sub-steps */}
        {current.subSteps && current.subSteps.length > 0 && (
          <div className="mt-4 space-y-2 rounded-xl border border-[#1F2937] bg-[#0B0F19]/60 p-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
              Sub-trabalhos
            </p>
            {current.subSteps.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center gap-2.5 text-sm"
              >
                <div
                  className={cn(
                    "size-4 shrink-0 rounded border",
                    sub.done
                      ? "border-[#10B981] bg-[#10B981]/20 text-[#10B981]"
                      : "border-[#374151] bg-transparent"
                  )}
                >
                  {sub.done && (
                    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
                      <path d="M6.5 11L3 7.5l1-1L6.5 9l5.5-5.5 1 1z" />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    sub.done ? "text-[#6B7280] line-through" : "text-[#D1D5DB]"
                  )}
                >
                  {sub.name}
                </span>
                {sub.done && (
                  <Plus className="ml-auto size-3 rotate-45 text-[#10B981]" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <motion.div
          className="mt-6 h-2 overflow-hidden rounded-full bg-[#1F2937]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Mini step dots */}
        <div className="mt-4 flex gap-1">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className={cn(
                "h-1 flex-1 rounded-full",
                step.status === "concluida" && "bg-[#10B981]",
                step.status === "atual" && "bg-[#3B82F6]",
                step.status === "pendente" && !step.addedDuringExecution && "bg-[#1F2937]",
                step.status === "pendente" && step.addedDuringExecution && "bg-[#6366F1]/40"
              )}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * stagger, duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>
      </div>

      {/* Toggle to show all steps */}
      <button
        type="button"
        onClick={() => setShowAllSteps((v) => !v)}
        className="flex w-full items-center justify-between border-t border-[#1F2937] px-6 py-3 text-xs text-[#6B7280] transition-colors hover:bg-[#1F2937]/30 hover:text-[#9CA3AF]"
      >
        <span>
          {showAllSteps
            ? "Ocultar todos os trabalhos"
            : `Ver todos os trabalhos (${steps.length})`}
        </span>
        {showAllSteps ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>

      {/* Full step list */}
      <AnimatePresence>
        {showAllSteps && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-4">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                    step.id === current.id &&
                      "border border-[#3B82F6]/30 bg-[#3B82F6]/10"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      step.status === "concluida" &&
                        "bg-[#10B981]/20 text-[#10B981]",
                      step.status === "atual" && "bg-[#3B82F6]/20 text-[#3B82F6]",
                      step.status === "pendente" && !step.addedDuringExecution &&
                        "bg-[#1F2937] text-[#6B7280]",
                      step.status === "pendente" && step.addedDuringExecution &&
                        "bg-[#6366F1]/20 text-[#A5B4FC]"
                    )}
                  >
                    {step.status === "concluida" ? "✓" : i + 1}
                  </div>
                  <span
                    className={cn(
                      "flex-1 leading-snug",
                      step.status === "concluida" && "text-[#6B7280] line-through",
                      step.status === "atual" && "font-medium text-[#F9FAFB]",
                      step.status === "pendente" && "text-[#9CA3AF]"
                    )}
                  >
                    {step.name}
                  </span>
                  {step.addedDuringExecution && (
                    <span className="rounded-full bg-[#6366F1]/20 px-1.5 py-0.5 text-[9px] text-[#A5B4FC]">
                      nova
                    </span>
                  )}
                  {step.subSteps && step.subSteps.length > 0 && (
                    <span className="text-[10px] text-[#6B7280]">
                      {step.subSteps.filter((s) => s.done).length}/{step.subSteps.length}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

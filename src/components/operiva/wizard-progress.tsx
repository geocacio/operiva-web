"use client";

import { cn } from "@/lib/utils";

export function WizardProgress({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const active = stepNum === currentStep;
          const done = stepNum < currentStep;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  done && "bg-[#10B981]/20 text-[#10B981]",
                  active && "bg-[#3B82F6] text-white",
                  !done && !active && "bg-[#1F2937] text-[#9CA3AF]"
                )}
              >
                {done ? "✓" : stepNum}
              </div>
              <span
                className={cn(
                  "hidden text-center text-[10px] sm:block",
                  active ? "text-[#F9FAFB]" : "text-[#9CA3AF]"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#1F2937]">
        <div
          className="h-full rounded-full bg-[#3B82F6] transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

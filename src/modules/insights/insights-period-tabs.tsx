"use client";

import { cn } from "@/lib/utils";
import type { InsightsPeriod } from "@/types/insights";

const PERIODS: { id: InsightsPeriod; label: string }[] = [
  { id: "today", label: "Hoje" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mês" },
];

export function InsightsPeriodTabs({
  value,
  onChange,
}: {
  value: InsightsPeriod;
  onChange: (p: InsightsPeriod) => void;
}) {
  return (
    <div
      className="flex w-full rounded-lg border border-white/10 bg-[#111827]/80 p-1 backdrop-blur-sm sm:inline-flex sm:w-auto"
      role="tablist"
      aria-label="Período de análise"
    >
      {PERIODS.map((p) => (
        <button
          key={p.id}
          type="button"
          role="tab"
          aria-selected={value === p.id}
          onClick={() => onChange(p.id)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:flex-none sm:px-4 sm:text-sm",
            value === p.id
              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.15)]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

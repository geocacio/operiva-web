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
      className="inline-flex rounded-lg border border-white/10 bg-[#111827]/80 p-1 backdrop-blur-sm"
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
            "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
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

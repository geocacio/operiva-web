"use client";

import { Gauge } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { BottleneckRow } from "@/types/insights";

const severityDot = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};

function BottleneckCard({
  row,
  highlighted,
}: {
  row: BottleneckRow;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/8 bg-white/[0.03] p-4",
        highlighted && "border-amber-500/25 bg-amber-500/5"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium">
          <span
            className={cn(
              "size-2 shrink-0 rounded-full",
              severityDot[row.severity]
            )}
          />
          <span className="break-words">{row.etapa}</span>
        </span>
        <span className="shrink-0 text-right text-sm font-semibold tabular-nums">
          {row.tempoMedio}
        </span>
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">Tempo médio</p>
    </div>
  );
}

export function BottlenecksSection({
  rows,
  delay = 0,
}: {
  rows: BottleneckRow[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="w-full min-w-0 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Gauge className="size-5 shrink-0 text-amber-400" />
        <h3 className="font-semibold">Gargalos por etapa</h3>
      </div>

      <ul className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <li key={row.etapa}>
            <BottleneckCard row={row} highlighted={i === 0} />
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Etapa</th>
              <th className="pb-3 font-medium text-right">Tempo médio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.etapa}
                className={cn(
                  "border-b border-white/5",
                  i === 0 && "bg-amber-500/5"
                )}
              >
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        severityDot[row.severity]
                      )}
                    />
                    {row.etapa}
                  </span>
                </td>
                <td className="py-3 text-right font-medium tabular-nums">
                  {row.tempoMedio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

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

export function BottlenecksSection({
  rows,
  delay = 0,
}: {
  rows: BottleneckRow[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Gauge className="size-5 text-amber-400" />
        <h3 className="font-semibold">Gargalos por etapa</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] text-sm">
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

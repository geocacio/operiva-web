"use client";

import { Fragment } from "react";
import { Grid3X3 } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { HeatmapCell } from "@/types/insights";

function loadColor(load: number): string {
  if (load >= 85) return "bg-red-500/70";
  if (load >= 70) return "bg-amber-500/60";
  if (load >= 50) return "bg-cyan-500/40";
  return "bg-emerald-500/25";
}

export function OperationalHeatmap({
  cells,
  delay = 0,
}: {
  cells: HeatmapCell[];
  delay?: number;
}) {
  const teams = [...new Set(cells.map((c) => c.team))];
  const steps = [...new Set(cells.map((c) => c.step))];

  const getLoad = (team: string, step: string) =>
    cells.find((c) => c.team === team && c.step === step)?.load ?? 0;

  return (
    <GlassCard delay={delay} className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Grid3X3 className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Mapa de carga operacional</h3>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Intensidade por equipe e etapa — verde leve, vermelho sobrecarga
      </p>

      <div className="-mx-2 overflow-x-auto pb-2">
        <div
          className="inline-grid min-w-full gap-1 px-2"
          style={{
            gridTemplateColumns: `minmax(7rem, auto) repeat(${steps.length}, minmax(3.5rem, 1fr))`,
          }}
        >
          <div />
          {steps.map((step) => (
            <div
              key={step}
              className="px-1 py-2 text-center text-[10px] font-medium text-muted-foreground"
            >
              {step}
            </div>
          ))}
          {teams.map((team) => (
            <Fragment key={team}>
              <div
                className="flex items-center pr-2 text-xs text-muted-foreground"
              >
                {team}
              </div>
              {steps.map((step) => {
                const load = getLoad(team, step);
                return (
                  <div
                    key={`${team}-${step}`}
                    title={`${team} · ${step}: ${load}%`}
                    className={cn(
                      "flex aspect-square min-h-8 items-center justify-center rounded-md text-[10px] font-medium tabular-nums transition-transform hover:scale-105",
                      loadColor(load),
                      load >= 85 && "ring-1 ring-red-400/50"
                    )}
                  >
                    {load > 0 ? load : ""}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded bg-emerald-500/40" /> Leve
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded bg-cyan-500/40" /> Moderado
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded bg-amber-500/60" /> Alto
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded bg-red-500/70" /> Crítico
        </span>
      </div>
    </GlassCard>
  );
}

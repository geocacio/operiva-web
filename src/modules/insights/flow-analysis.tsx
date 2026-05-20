"use client";

import { ArrowRight, Zap } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type { FlowStep, FlowSpeed } from "@/types/insights";

const speedConfig: Record<
  FlowSpeed,
  { label: string; className: string; pulse?: boolean }
> = {
  fast: {
    label: "Rápido",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  normal: {
    label: "Normal",
    className: "border-white/10 bg-white/5 text-muted-foreground",
  },
  slow: {
    label: "Lento",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  bottleneck: {
    label: "Gargalo",
    className: "border-red-500/40 bg-red-500/15 text-red-400",
    pulse: true,
  },
};

export function FlowAnalysis({
  steps,
  delay = 0,
}: {
  steps: FlowStep[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Análise de fluxo</h3>
      </div>
      <p className="mb-6 text-xs text-muted-foreground">
        Recepção → Funilaria → Pintura → Entrega — velocidade por etapa
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max items-center gap-2">
          {steps.map((step, i) => {
            const cfg = speedConfig[step.speed];
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "min-w-[7.5rem] rounded-xl border px-3 py-3 text-center",
                    cfg.className,
                    cfg.pulse && "shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                  )}
                >
                  <p className="text-xs font-semibold">{step.name}</p>
                  <p className="mt-1 text-[10px] opacity-80">{cfg.label}</p>
                  <p className="mt-2 text-sm font-medium tabular-nums">
                    {step.avgTime}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {step.servicesCount} serviços
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="size-4 shrink-0 text-white/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

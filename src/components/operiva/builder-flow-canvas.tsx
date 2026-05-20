"use client";

import { motion } from "framer-motion";
import { ArrowRight, Link2 } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { FlowStepConfig } from "@/types/flow-step";
import { IconByName } from "./icon-by-name";
import { cn } from "@/lib/utils";

export function BuilderFlowCanvas({
  steps,
  selectedStepId,
  onSelect,
}: {
  steps: FlowStepConfig[];
  selectedStepId: string | null;
  onSelect: (id: string) => void;
}) {
  const { reduced, stagger } = useMotionConfig();

  return (
    <div className="relative h-full overflow-auto rounded-xl border border-white/8 bg-gradient-to-b from-[#111827]/80 to-[#0B0F19]/90 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Canvas visual do fluxo</h3>
          <p className="text-xs text-muted-foreground">
            Timeline conectada · dependências · estados
          </p>
        </div>
        <div className="flex gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-emerald-500" /> Concluída
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-indigo-500" /> Atual
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-white/20" /> Pendente
          </span>
        </div>
      </div>

      <div className="relative min-h-[320px]">
        <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-emerald-500/30" />

        <div className="space-y-4">
          {steps.map((step, i) => {
            const selected = selectedStepId === step.id;
            const hasDep = !!step.dependsOnStepId;

            return (
              <motion.div
                key={step.id}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * stagger }}
                className="relative pl-14"
              >
                <div
                  className={cn(
                    "absolute left-5 top-5 size-6 rounded-full border-2 bg-[#0B0F19]",
                    selected ? "border-indigo-400 shadow-[0_0_12px_oklch(0.55_0.2_264/40%)]" : "border-white/20"
                  )}
                  style={{ backgroundColor: selected ? `${step.color}33` : undefined }}
                />

                <button
                  type="button"
                  onClick={() => onSelect(step.id)}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-all",
                    selected
                      ? "border-indigo-500/40 bg-indigo-500/10 shadow-lg"
                      : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${step.color}25` }}
                      >
                        <IconByName name={step.icon} className="size-5" />
                      </span>
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {step.needsPhoto && (
                        <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-300">
                          Foto
                        </span>
                      )}
                      {step.needsApproval && (
                        <span className="rounded bg-violet-500/15 px-2 py-0.5 text-[10px] text-violet-300">
                          Aprovação
                        </span>
                      )}
                      {step.clientVisible && (
                        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                          Cliente
                        </span>
                      )}
                      {step.blocksNext && (
                        <span className="rounded bg-rose-500/15 px-2 py-0.5 text-[10px] text-rose-300">
                          Bloqueia
                        </span>
                      )}
                    </div>
                  </div>

                  {hasDep && (
                    <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Link2 className="size-3" />
                      Depende da etapa anterior
                    </p>
                  )}

                  {step.responsibleRole && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Responsável: {step.responsibleRole.replace("role-", "")}
                    </p>
                  )}
                </button>

                {i < steps.length - 1 && (
                  <div className="absolute left-[1.65rem] -bottom-2 flex items-center text-muted-foreground/40">
                    <ArrowRight className="size-3 rotate-90" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

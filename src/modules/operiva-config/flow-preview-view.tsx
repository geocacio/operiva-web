"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Play } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { ConfigWizardNav } from "@/components/operiva/config-wizard-nav";
import { IconByName } from "@/components/operiva/icon-by-name";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadTemplateForEdit } from "@/store/slices/template-slice";

export function FlowPreviewView({ templateId }: { templateId: string }) {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.template.draftTemplate);
  const { reduced } = useMotionConfig();
  const [simIndex, setSimIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    dispatch(loadTemplateForEdit(templateId));
  }, [dispatch, templateId]);

  useEffect(() => {
    if (!simulating || !draft) return;
    const t = setInterval(() => {
      setSimIndex((i) => {
        if (i >= draft.steps.length - 1) {
          setSimulating(false);
          return i;
        }
        return i + 1;
      });
    }, 1800);
    return () => clearInterval(t);
  }, [simulating, draft]);

  if (!draft) return <p className="text-muted-foreground">Carregando…</p>;

  return (
    <div>
      <ConfigBreadcrumbs
        items={[
          { label: "Templates", href: `${CONFIG_ROUTES.templates}?nicho=${draft.nicheId}` },
          { label: draft.name },
          { label: "Preview" },
        ]}
      />
      <ConfigWizardNav templateId={templateId} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Preview do fluxo</h2>
          <p className="text-sm text-muted-foreground">
            Simulação visual com sensação de tempo real
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 border-white/10"
            onClick={() => {
              setSimIndex(0);
              setSimulating(true);
            }}
            disabled={simulating}
          >
            {simulating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            Auto-avançar
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-500" asChild>
            <Link href={`${CONFIG_ROUTES.newService}?template=${templateId}`}>
              Gerar serviço
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F19] p-8">
        <div className="absolute inset-0 operiva-grid-bg opacity-30" />
        <div className="relative flex gap-4 overflow-x-auto pb-4">
          <AnimatePresence mode="popLayout">
            {draft.steps.map((step, i) => {
              const done = i < simIndex;
              const current = i === simIndex;
              return (
                <motion.div
                  key={step.id}
                  layout
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-w-[200px] shrink-0"
                >
                  <GlassCard
                    className={
                      current
                        ? "border-indigo-500/40 ring-2 ring-indigo-500/20"
                        : done
                          ? "border-emerald-500/30"
                          : ""
                    }
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span
                          className="flex size-10 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${step.color}30` }}
                        >
                          <IconByName name={step.icon} className="size-5" />
                        </span>
                        {done && <CheckCircle2 className="size-5 text-emerald-400" />}
                        {current && simulating && (
                          <Loader2 className="size-5 animate-spin text-indigo-400" />
                        )}
                      </div>
                      <p className="mt-3 font-medium">{step.name}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        SLA {step.slaHours}h
                      </p>
                      {step.needsPhoto && (
                        <span className="mt-2 inline-block text-[10px] text-amber-400">
                          📷 Foto
                        </span>
                      )}
                      {step.needsApproval && (
                        <span className="mt-1 block text-[10px] text-violet-400">
                          ✓ Aprovação
                        </span>
                      )}
                    </div>
                  </GlassCard>
                  {i < draft.steps.length - 1 && (
                    <div className="mx-auto mt-2 h-4 w-px bg-white/20 sm:hidden" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {simulating && (
          <p className="relative mt-4 text-center text-xs text-indigo-300 animate-pulse">
            Atualizando em tempo real (simulado)…
          </p>
        )}
      </div>
    </div>
  );
}

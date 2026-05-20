"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { ConfigLoadingSkeleton } from "@/components/operiva/config-loading-skeleton";
import { ConfigWizardNav } from "@/components/operiva/config-wizard-nav";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadTemplateForEdit,
  setClientVisibility,
} from "@/store/slices/template-slice";
import type { ClientVisibilitySettings } from "@/types/operiva-template";

const TOGGLES: { key: keyof ClientVisibilitySettings; label: string }[] = [
  { key: "showSteps", label: "Etapas visíveis" },
  { key: "showPhotos", label: "Fotos e mídia" },
  { key: "showComments", label: "Comentários" },
  { key: "showNotifications", label: "Notificações ao vivo" },
  { key: "showTimeline", label: "Timeline completa" },
  { key: "showApprovals", label: "Aprovações" },
  { key: "hideInternalSteps", label: "Ocultar etapas internas" },
];

export function ClientVisibilityView({ templateId }: { templateId: string }) {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.template.draftTemplate);
  const { fade } = useMotionConfig();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(loadTemplateForEdit(templateId));
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [dispatch, templateId]);

  if (loading || !draft) return <ConfigLoadingSkeleton />;

  const vis = draft.clientVisibility;
  const clientSteps = draft.steps.filter(
    (s) => s.clientVisible && (!vis.hideInternalSteps || s.needsApproval)
  );
  const internalSteps = draft.steps.filter((s) => !s.clientVisible);

  const patch = (key: keyof ClientVisibilitySettings, value: boolean) => {
    dispatch(setClientVisibility({ ...vis, [key]: value }));
  };

  return (
    <div>
      <ConfigBreadcrumbs
        items={[
          { label: "Templates", href: `${CONFIG_ROUTES.templates}?nicho=${draft.nicheId}` },
          { label: draft.name, href: CONFIG_ROUTES.templateEdit(templateId) },
          { label: "Cliente" },
        ]}
      />
      <ConfigWizardNav templateId={templateId} />
      <h2 className="mb-6 text-xl font-semibold">Visibilidade do cliente</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <p className="mb-4 text-sm font-medium">O que o cliente pode ver</p>
          <div className="space-y-2">
            {TOGGLES.map((t) => (
              <label
                key={t.key}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-white/8 px-3 py-2 text-sm"
              >
                {t.label}
                <input
                  type="checkbox"
                  checked={vis[t.key]}
                  onChange={(e) => patch(t.key, e.target.checked)}
                  className="accent-indigo-500"
                />
              </label>
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div {...fade}>
            <GlassCard className="border-emerald-500/20 p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-400">
                <Eye className="size-4" />
                <span className="text-sm font-medium">Visão do cliente</span>
              </div>
              <ul className="space-y-2 text-sm">
                {clientSteps.map((s) => (
                  <li key={s.id} className="rounded bg-white/5 px-2 py-1">
                    {s.name}
                  </li>
                ))}
                {clientSteps.length === 0 && (
                  <li className="text-muted-foreground">Nenhuma etapa visível</li>
                )}
              </ul>
            </GlassCard>
          </motion.div>
          <motion.div {...fade}>
            <GlassCard className="border-white/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <EyeOff className="size-4" />
                <span className="text-sm font-medium">Visão da empresa</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {draft.steps.map((s) => (
                  <li key={s.id} className="rounded bg-white/5 px-2 py-1">
                    {s.name}
                    {!s.clientVisible && (
                      <span className="ml-2 text-[10px] text-rose-400">interno</span>
                    )}
                  </li>
                ))}
              </ul>
              {internalSteps.length > 0 && (
                <p className="mt-3 text-[10px] text-muted-foreground">
                  {internalSteps.length} etapas só para a equipe
                </p>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button className="bg-indigo-600" asChild>
          <Link href={CONFIG_ROUTES.templatePreview(templateId)}>
            Ver preview do fluxo →
          </Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { ConfigLoadingSkeleton } from "@/components/operiva/config-loading-skeleton";
import { ConfigWizardNav } from "@/components/operiva/config-wizard-nav";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { getRolesForNiche } from "@/mocks/config-teams";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadTemplateForEdit, setTeamAssignments } from "@/store/slices/template-slice";

export function TeamConfigView({ templateId }: { templateId: string }) {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.template.draftTemplate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(loadTemplateForEdit(templateId));
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [dispatch, templateId]);

  if (loading || !draft) return <ConfigLoadingSkeleton />;

  const roles = getRolesForNiche(draft.nicheId);

  return (
    <div>
      <ConfigBreadcrumbs
        items={[
          { label: "Templates", href: `${CONFIG_ROUTES.templates}?nicho=${draft.nicheId}` },
          { label: draft.name, href: CONFIG_ROUTES.templateEdit(templateId) },
          { label: "Equipe" },
        ]}
      />
      <ConfigWizardNav templateId={templateId} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Configuração de equipes</h2>
        <p className="text-sm text-muted-foreground">
          Atribua papéis às etapas do fluxo
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => (
          <GlassCard key={role.id} className="p-4">
            <div
              className="mb-2 size-10 rounded-lg"
              style={{ backgroundColor: `${role.color}33` }}
            />
            <p className="font-medium">{role.name}</p>
            <p className="text-xs text-muted-foreground">
              {role.memberCount} membros (simulado)
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-3">
        {draft.steps.map((step) => {
          const assigned = draft.teamAssignments[step.id] ?? [
            step.responsibleRole ?? roles[0]?.id,
          ].filter(Boolean) as string[];

          return (
            <GlassCard key={step.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{step.name}</p>
                <p className="text-xs text-muted-foreground">Etapa {step.order}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => {
                  const on = assigned.includes(role.id);
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        const next = on
                          ? assigned.filter((id) => id !== role.id)
                          : [...assigned, role.id];
                        dispatch(
                          setTeamAssignments({
                            stepId: step.id,
                            roleIds: next.length ? next : [role.id],
                          })
                        );
                      }}
                    >
                      <Badge
                        className={
                          on
                            ? "bg-indigo-500/25 text-indigo-200"
                            : "border-white/10 bg-white/5"
                        }
                      >
                        {role.name}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" className="border-white/10" asChild>
          <Link href={CONFIG_ROUTES.templateEdit(templateId)}>Voltar ao fluxo</Link>
        </Button>
        <Button className="gap-2 bg-indigo-600" asChild>
          <Link href={CONFIG_ROUTES.templateClient(templateId)}>
            <Users className="size-4" />
            Visibilidade do cliente
          </Link>
        </Button>
      </div>
    </div>
  );
}

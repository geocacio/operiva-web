"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Rocket } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONFIG_ROUTES } from "@/lib/constants";
import { getExecutionHref } from "@/lib/portal-routes";
import { mockClients } from "@/mocks/clients";
import { mockTeams } from "@/mocks/teams";
import { getTemplateById } from "@/mocks/templates";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createServiceFromTemplate } from "@/store/slices/services-slice";
import { loadTemplateForEdit, selectTemplate } from "@/store/slices/template-slice";

export function CreateServiceView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const templateId = params.get("template") ?? "";
  const draft = useAppSelector((s) => s.template.draftTemplate);
  const loading = useAppSelector((s) => s.services.loading);
  const template =
    draft?.id === templateId ? draft : getTemplateById(templateId);

  const [clientId, setClientId] = useState(mockClients[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("2026-06-15");
  const [teamId, setTeamId] = useState(mockTeams[0]?.id ?? "t1");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (templateId) {
      dispatch(selectTemplate(templateId));
      dispatch(loadTemplateForEdit(templateId));
    }
  }, [dispatch, templateId]);

  useEffect(() => {
    if (template && !title) {
      setTitle(`Serviço — ${template.name}`);
      setTeamId(template.teamIds[0] ?? mockTeams[0]?.id ?? "t1");
    }
  }, [template, title]);

  const client = mockClients.find((c) => c.id === clientId);

  const handleCreate = async () => {
    if (!template || !client) return;
    const result = await dispatch(
      createServiceFromTemplate({
        templateId: template.id,
        clientId: client.id,
        clientName: client.name,
        title,
        dueDate: new Date(dueDate).toISOString(),
        teamId,
        notes,
        priority: "media",
      })
    );
    if (createServiceFromTemplate.fulfilled.match(result)) {
      router.push(getExecutionHref(result.payload.id));
    }
  };

  if (!template) {
    return (
      <div>
        <ConfigBreadcrumbs items={[{ label: "Novo serviço" }]} />
        <p className="text-muted-foreground">
          Selecione um template na{" "}
          <a href={CONFIG_ROUTES.templates} className="text-indigo-400 underline">
            biblioteca
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <ConfigBreadcrumbs
        items={[
          {
            label: "Templates",
            href: `${CONFIG_ROUTES.templates}?nicho=${template.nicheId}`,
          },
          { label: "Novo serviço" },
        ]}
      />
      <h2 className="mb-2 text-2xl font-semibold">Criar serviço</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Template: <strong>{template.name}</strong> · {template.stepCount} etapas
      </p>

      <GlassCard className="space-y-4 p-6">
        <div>
          <label className="text-xs text-muted-foreground">Cliente</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            {mockClients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Nome do serviço</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 border-white/10 bg-white/5"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Prazo</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 border-white/10 bg-white/5"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Equipe principal</label>
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            {mockTeams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Observações</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opcional"
            className="mt-1 border-white/10 bg-white/5"
          />
        </div>
        <Button
          className="w-full gap-2 bg-indigo-600"
          onClick={handleCreate}
          disabled={loading || !title.trim()}
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Rocket className="size-4" />
          )}
          Criar e abrir execução
        </Button>
      </GlassCard>
    </div>
  );
}

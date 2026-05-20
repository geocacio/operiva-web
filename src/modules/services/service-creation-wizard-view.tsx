"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Rocket, Search } from "lucide-react";
import { WizardProgress } from "@/components/operiva/wizard-progress";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES, TEMPLATE_ROUTES } from "@/lib/constants";
import { getExecutionHref } from "@/lib/portal-routes";
import { mockClients } from "@/mocks/clients";
import { mockTeams } from "@/mocks/teams";
import { getTemplateById } from "@/mocks/templates";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createServiceFromTemplate } from "@/store/slices/services-slice";
import { loadTemplateForEdit, selectTemplate } from "@/store/slices/template-slice";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

const STEPS = ["Cliente", "Template", "Configurações", "Confirmar"] as const;

export function ServiceCreationWizardView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateFromUrl = searchParams.get("template");
  const nicheId = useAppSelector(
    (s) => s.company.nicheId ?? s.niche.selectedNiche ?? "funilaria"
  );
  const templates = useAppSelector((s) => s.template.templates);
  const loading = useAppSelector((s) => s.services.loading);

  const [step, setStep] = useState(1);
  const [clientMode, setClientMode] = useState<"existente" | "novo">("existente");
  const [clientId, setClientId] = useState(mockClients[0]?.id ?? "");
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateSearch, setTemplateSearch] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [dueDate, setDueDate] = useState("2026-06-15");
  const [teamId, setTeamId] = useState(mockTeams[0]?.id ?? "t1");
  const [vehicleOrAddress, setVehicleOrAddress] = useState("");

  const nicheTemplates = useMemo(
    () => templates.filter((t) => t.nicheId === nicheId),
    [templates, nicheId]
  );

  const filteredTemplates = useMemo(() => {
    const q = templateSearch.toLowerCase().trim();
    if (!q) return nicheTemplates;
    return nicheTemplates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [nicheTemplates, templateSearch]);

  const template =
    getTemplateById(templateId) ??
    templates.find((t) => t.id === templateId);

  const clientName =
    clientMode === "novo"
      ? newClientName.trim()
      : mockClients.find((c) => c.id === clientId)?.name ?? "";

  useEffect(() => {
    if (template && !title) {
      setTitle(`Serviço — ${template.name}`);
      setTeamId(template.teamIds[0] ?? mockTeams[0]?.id ?? "t1");
    }
  }, [template, title]);

  useEffect(() => {
    if (templateFromUrl && !templateId) {
      setTemplateId(templateFromUrl);
      setStep(2);
    }
  }, [templateFromUrl, templateId]);

  useEffect(() => {
    if (templateId) {
      dispatch(selectTemplate(templateId));
      dispatch(loadTemplateForEdit(templateId));
    }
  }, [dispatch, templateId]);

  const canNext = () => {
    if (step === 1) {
      return clientMode === "existente"
        ? !!clientId
        : newClientName.trim().length >= 2;
    }
    if (step === 2) return !!templateId;
    if (step === 3) return title.trim().length >= 2;
    return true;
  };

  const handleCreate = async () => {
    if (!template) return;
    const result = await dispatch(
      createServiceFromTemplate({
        templateId: template.id,
        clientId: clientMode === "novo" ? `new-${Date.now()}` : clientId,
        clientName,
        title,
        dueDate: new Date(dueDate).toISOString(),
        teamId,
        notes: [notes, vehicleOrAddress && `Ref: ${vehicleOrAddress}`]
          .filter(Boolean)
          .join(" · "),
        priority,
      })
    );
    if (createServiceFromTemplate.fulfilled.match(result)) {
      router.push(getExecutionHref(result.payload.id));
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <ConfigBreadcrumbs
        items={[
          { label: "Serviços", href: APP_ROUTES.servicos },
          { label: "Novo serviço" },
        ]}
      />
      <h2 className="mb-2 text-2xl font-semibold">Criar serviço</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Wizard em 4 etapas — gera execução e portal do cliente automaticamente.
      </p>

      <WizardProgress steps={[...STEPS]} currentStep={step} />

      {step === 1 && (
        <GlassCard className="space-y-4 p-6">
          <div className="flex gap-2">
            {(["existente", "novo"] as const).map((m) => (
              <Button
                key={m}
                variant={clientMode === m ? "default" : "outline"}
                className={cn(
                  "flex-1",
                  clientMode === m && "bg-[#3B82F6]"
                )}
                onClick={() => setClientMode(m)}
              >
                {m === "existente" ? "Cliente existente" : "Novo cliente"}
              </Button>
            ))}
          </div>
          {clientMode === "existente" ? (
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              {mockClients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <Input
                placeholder="Nome do cliente"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="border-white/10 bg-white/5"
              />
              <Input
                placeholder="Telefone (opcional)"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
                className="border-white/10 bg-white/5"
              />
            </>
          )}
        </GlassCard>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar template..."
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              className="border-white/10 bg-white/5 pl-9"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  templateId === t.id
                    ? "border-[#3B82F6] bg-[#3B82F6]/10"
                    : "border-[#1F2937] bg-[#111827] hover:border-[#3B82F6]/30"
                )}
              >
                <p className="font-medium">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.stepCount} etapas · {t.avgDays}d média
                </p>
                <div className="mt-2 flex gap-0.5">
                  {t.steps.slice(0, 6).map((s) => (
                    <div
                      key={s.id}
                      className="h-1 flex-1 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
          {templateId && (
            <Button variant="outline" size="sm" asChild>
              <a href={TEMPLATE_ROUTES.templatePreview(templateId)} target="_blank">
                Visualizar preview
              </a>
            </Button>
          )}
        </div>
      )}

      {step === 3 && template && (
        <GlassCard className="space-y-4 p-6">
          <div>
            <label className="text-xs text-muted-foreground">Título do serviço</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
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
            <label className="text-xs text-muted-foreground">Equipe</label>
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
            <label className="text-xs text-muted-foreground">
              {nicheId === "funilaria" ? "Veículo (placa/modelo)" : "Endereço da obra"}
            </label>
            <Input
              value={vehicleOrAddress}
              onChange={(e) => setVehicleOrAddress(e.target.value)}
              placeholder={
                nicheId === "funilaria" ? "ABC-1D23 · Gol 2020" : "Rua Exemplo, 100"
              }
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Observações</label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
        </GlassCard>
      )}

      {step === 4 && template && (
        <GlassCard className="space-y-3 p-6 text-sm">
          <p>
            <span className="text-muted-foreground">Cliente:</span> {clientName}
          </p>
          <p>
            <span className="text-muted-foreground">Template:</span> {template.name}
          </p>
          <p>
            <span className="text-muted-foreground">Título:</span> {title}
          </p>
          <p>
            <span className="text-muted-foreground">Prioridade:</span> {priority}
          </p>
          <p>
            <span className="text-muted-foreground">Prazo:</span> {dueDate}
          </p>
        </GlassCard>
      )}

      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
        >
          Voltar
        </Button>
        {step < 4 ? (
          <Button
            className="bg-[#3B82F6]"
            disabled={!canNext()}
            onClick={() => setStep((s) => s + 1)}
          >
            Continuar
          </Button>
        ) : (
          <Button
            className="gap-2 bg-[#10B981]"
            onClick={handleCreate}
            disabled={loading || !template}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Rocket className="size-4" />
            )}
            Criar e abrir execução
          </Button>
        )}
      </div>
    </div>
  );
}

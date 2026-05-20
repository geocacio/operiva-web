"use client";

import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconByName } from "@/components/operiva/icon-by-name";
import type { FlowStepConfig } from "@/types/flow-step";
import type { TemplateTeamRole } from "@/types/operiva-template";

const STEP_ICON_OPTIONS = [
  "ClipboardList",
  "Search",
  "ShieldCheck",
  "Wrench",
  "Hammer",
  "Paintbrush",
  "Sparkles",
  "Package",
  "Droplets",
  "CheckCircle2",
  "Landmark",
  "Columns3",
  "BrickWall",
  "Zap",
  "Droplet",
  "PaintBucket",
  "ClipboardCheck",
  "Circle",
] as const;

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2 text-sm">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-white/20 accent-indigo-500"
      />
    </label>
  );
}

export function BuilderStepPanel({
  step,
  allSteps,
  roles,
  onChange,
}: {
  step: FlowStepConfig | null;
  allSteps: FlowStepConfig[];
  roles: TemplateTeamRole[];
  onChange: (step: FlowStepConfig) => void;
}) {
  if (!step) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-white/8 bg-[#0B0F19]/80 p-6 text-sm text-muted-foreground">
        Selecione uma etapa para configurar
      </div>
    );
  }

  const patch = (partial: Partial<FlowStepConfig>) =>
    onChange({ ...step, ...partial });

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/8 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="border-b border-white/8 p-4">
        <h3 className="text-sm font-semibold">Configuração da etapa</h3>
        <p className="text-xs text-muted-foreground">{step.name}</p>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">Nome</label>
            <Input
              value={step.name}
              onChange={(e) => patch({ name: e.target.value })}
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Descrição</label>
            <Input
              value={step.description}
              onChange={(e) => patch({ description: e.target.value })}
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Cor</label>
              <Input
                type="color"
                value={step.color}
                onChange={(e) => patch({ color: e.target.value })}
                className="mt-1 h-10 border-white/10 bg-white/5 p-1"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">SLA (horas)</label>
              <Input
                type="number"
                value={step.slaHours}
                onChange={(e) => patch({ slaHours: Number(e.target.value) || 0 })}
                className="mt-1 border-white/10 bg-white/5"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Ícone</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STEP_ICON_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => patch({ icon })}
                  className={`flex size-9 items-center justify-center rounded-lg border transition-colors ${
                    step.icon === icon
                      ? "border-indigo-500/50 bg-indigo-500/15"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  }`}
                  title={icon}
                >
                  <IconByName name={icon} className="size-4" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Papel responsável</label>
            <select
              value={step.responsibleRole ?? ""}
              onChange={(e) => patch({ responsibleRole: e.target.value || undefined })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="">Nenhum</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Depende da etapa</label>
            <select
              value={step.dependsOnStepId ?? ""}
              onChange={(e) =>
                patch({ dependsOnStepId: e.target.value || null })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="">Nenhuma (início do fluxo)</option>
              {allSteps
                .filter((s) => s.id !== step.id)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.order}. {s.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Status automático</label>
            <Input
              value={step.autoStatus}
              onChange={(e) => patch({ autoStatus: e.target.value })}
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>

          <Separator className="bg-white/8" />
          <p className="text-xs font-medium text-muted-foreground">Regras</p>
          <div className="space-y-2">
            <Toggle label="Obrigatória" checked={step.required} onChange={(v) => patch({ required: v })} />
            <Toggle label="Cliente vê esta etapa" checked={step.clientVisible} onChange={(v) => patch({ clientVisible: v })} />
            <Toggle label="Precisa aprovação" checked={step.needsApproval} onChange={(v) => patch({ needsApproval: v })} />
            <Toggle label="Foto obrigatória" checked={step.needsPhoto} onChange={(v) => patch({ needsPhoto: v })} />
            <Toggle label="Comentário obrigatório" checked={step.needsComment} onChange={(v) => patch({ needsComment: v })} />
            <Toggle label="Bloqueia próxima etapa" checked={step.blocksNext} onChange={(v) => patch({ blocksNext: v })} />
          </div>

          <Separator className="bg-white/8" />
          <p className="text-xs font-medium text-muted-foreground">Checklist interno</p>
          <div className="space-y-2">
            {step.internalChecklist.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() =>
                    patch({
                      internalChecklist: step.internalChecklist.map((c) =>
                        c.id === item.id ? { ...c, done: !c.done } : c
                      ),
                    })
                  }
                  className="accent-indigo-500"
                />
                <span className={item.done ? "line-through opacity-60" : ""}>
                  {item.label}
                </span>
              </label>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1 border-white/10"
              onClick={() =>
                patch({
                  internalChecklist: [
                    ...step.internalChecklist,
                    {
                      id: `cl-${Date.now()}`,
                      label: "Novo item",
                      done: false,
                    },
                  ],
                })
              }
            >
              <Plus className="size-3.5" />
              Item
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

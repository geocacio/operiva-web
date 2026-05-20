import type { FlowStepConfig } from "@/types/flow-step";
import type { NicheId } from "@/types/niche";
import { defaultTeamAssignments } from "@/mocks/config-teams";

const STEP_ICONS: Record<string, string> = {
  Recepção: "ClipboardList",
  Avaliação: "Search",
  "Aprovação seguradora": "ShieldCheck",
  Desmontagem: "Wrench",
  Funilaria: "Hammer",
  Pintura: "Paintbrush",
  Polimento: "Sparkles",
  Montagem: "Package",
  Lavagem: "Droplets",
  Entrega: "CheckCircle2",
  Fundação: "Landmark",
  Estrutura: "Columns3",
  Alvenaria: "BrickWall",
  Elétrica: "Zap",
  Hidráulica: "Droplet",
  Acabamento: "PaintBucket",
  Vistoria: "ClipboardCheck",
};

const STEP_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#818cf8",
  "#6366f1",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#f59e0b",
  "#ec4899",
];

export function buildStepsFromNames(
  nicheId: NicheId,
  stepNames: string[],
  overrides?: Partial<FlowStepConfig>[]
): FlowStepConfig[] {
  const roles = defaultTeamAssignments[nicheId];

  return stepNames.map((name, i) => {
    const base: FlowStepConfig = {
      id: `step-${nicheId}-${i + 1}`,
      name,
      description: `Configure e execute a etapa «${name}» com rastreabilidade completa.`,
      order: i + 1,
      color: STEP_COLORS[i % STEP_COLORS.length],
      icon: STEP_ICONS[name] ?? "Circle",
      responsibleRole: roles[name],
      slaHours: nicheId === "construcao" ? 48 + i * 12 : 8 + i * 4,
      required: true,
      clientVisible: !name.toLowerCase().includes("seguradora") && name !== "Desmontagem",
      needsApproval:
        name.includes("Aprovação") ||
        name === "Vistoria" ||
        name === "Entrega",
      needsPhoto:
        nicheId === "funilaria" ||
        ["Fundação", "Estrutura", "Vistoria", "Entrega"].includes(name),
      needsComment: name === "Avaliação" || name === "Vistoria",
      blocksNext: name.includes("Aprovação") || name === "Vistoria",
      internalChecklist: [
        { id: `cl-${i}-1`, label: "Conferir documentação", done: false },
        { id: `cl-${i}-2`, label: "Registrar evidências", done: false },
      ],
      autoStatus: i === 0 ? "aguardando_inicio" : "pendente",
      dependsOnStepId: i > 0 ? `step-${nicheId}-${i}` : null,
    };
    const override = overrides?.[i];
    return override ? { ...base, ...override, id: base.id } : base;
  });
}

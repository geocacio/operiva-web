import { buildStepsFromNames } from "@/flows/build-flow-steps";
import { cloneTemplate } from "@/lib/clone-template";
import { mockNiches } from "./niches";
import type { ClientVisibilitySettings, OperivaTemplate } from "@/types/operiva-template";
import type { NicheId } from "@/types/niche";

const defaultVisibility: ClientVisibilitySettings = {
  showSteps: true,
  showPhotos: true,
  showComments: true,
  showNotifications: true,
  showTimeline: true,
  showApprovals: true,
  hideInternalSteps: true,
};

function funilariaSteps(names: string[]) {
  return buildStepsFromNames("funilaria", names);
}

function construcaoSteps(names: string[]) {
  return buildStepsFromNames("construcao", names);
}

const funilariaFull = mockNiches.find((n) => n.id === "funilaria")!.defaultSteps;
const construcaoFull = mockNiches.find((n) => n.id === "construcao")!.defaultSteps;

export const mockTemplates: OperivaTemplate[] = [
  {
    id: "tpl-fun-pequenos",
    name: "Pequenos reparos",
    description: "Amassados, riscos e retoques rápidos sem desmontagem completa.",
    nicheId: "funilaria",
    stepCount: 6,
    avgDays: 3,
    teamIds: ["t1"],
    steps: funilariaSteps([
      "Recepção",
      "Avaliação",
      "Funilaria",
      "Pintura",
      "Polimento",
      "Entrega",
    ]),
    teamAssignments: {},
    clientVisibility: { ...defaultVisibility, hideInternalSteps: true },
    badges: ["Rápido", "Fotos", "Cliente ansioso"],
    isBuiltin: true,
    updatedAt: "2026-05-10T10:00:00Z",
  },
  {
    id: "tpl-fun-colisao",
    name: "Colisão média",
    description: "Fluxo completo com seguradora, desmontagem e pintura.",
    nicheId: "funilaria",
    stepCount: 10,
    avgDays: 12,
    teamIds: ["t1", "t4"],
    steps: funilariaSteps(funilariaFull),
    teamAssignments: {},
    clientVisibility: defaultVisibility,
    badges: ["Seguradora", "Timeline", "Aprovações"],
    isBuiltin: true,
    updatedAt: "2026-05-12T14:00:00Z",
  },
  {
    id: "tpl-fun-pintura",
    name: "Pintura completa",
    description: "Preparação, pintura, polimento e entrega com vistoria do cliente.",
    nicheId: "funilaria",
    stepCount: 8,
    avgDays: 7,
    teamIds: ["t1", "t4"],
    steps: funilariaSteps([
      "Recepção",
      "Avaliação",
      "Desmontagem",
      "Funilaria",
      "Pintura",
      "Polimento",
      "Lavagem",
      "Entrega",
    ]),
    teamAssignments: {},
    clientVisibility: { ...defaultVisibility, showApprovals: true },
    badges: ["Premium", "Fotos obrigatórias"],
    isBuiltin: true,
    updatedAt: "2026-05-15T09:00:00Z",
  },
  {
    id: "tpl-con-casa",
    name: "Casa padrão",
    description: "Obra residencial do zero com todas as disciplinas.",
    nicheId: "construcao",
    stepCount: 9,
    avgDays: 120,
    teamIds: ["t3"],
    steps: construcaoSteps(construcaoFull),
    teamAssignments: {},
    clientVisibility: defaultVisibility,
    badges: ["Longo prazo", "Multi-equipe", "Cronograma"],
    isBuiltin: true,
    updatedAt: "2026-05-01T08:00:00Z",
  },
  {
    id: "tpl-con-reforma",
    name: "Reforma residencial",
    description: "Reforma interna com elétrica, hidráulica e acabamento.",
    nicheId: "construcao",
    stepCount: 7,
    avgDays: 45,
    teamIds: ["t3", "t4"],
    steps: construcaoSteps([
      "Alvenaria",
      "Elétrica",
      "Hidráulica",
      "Acabamento",
      "Pintura",
      "Vistoria",
      "Entrega",
    ]),
    teamAssignments: {},
    clientVisibility: { ...defaultVisibility, showComments: true },
    badges: ["Reforma", "Dependências"],
    isBuiltin: true,
    updatedAt: "2026-05-08T11:00:00Z",
  },
  {
    id: "tpl-con-comercial",
    name: "Obra comercial",
    description: "Loja ou escritório com vistorias e entregas por ambiente.",
    nicheId: "construcao",
    stepCount: 9,
    avgDays: 90,
    teamIds: ["t3"],
    steps: construcaoSteps(construcaoFull),
    teamAssignments: {},
    clientVisibility: {
      ...defaultVisibility,
      showNotifications: true,
      hideInternalSteps: false,
    },
    badges: ["Comercial", "Vistorias", "Equipes"],
    isBuiltin: true,
    updatedAt: "2026-05-14T16:00:00Z",
  },
];

export function getTemplateById(id: string): OperivaTemplate | undefined {
  return mockTemplates.find((t) => t.id === id);
}

export function getTemplatesByNiche(nicheId: NicheId): OperivaTemplate[] {
  return mockTemplates.filter((t) => t.nicheId === nicheId);
}

export function duplicateTemplate(source: OperivaTemplate): OperivaTemplate {
  const newId = `tpl-custom-${Date.now()}`;
  const cloned = cloneTemplate(source);
  return {
    ...cloned,
    id: newId,
    name: `${source.name} (cópia)`,
    isBuiltin: false,
    updatedAt: new Date().toISOString(),
    steps: cloned.steps.map((s) => ({
      ...s,
      id: `${s.id}-copy-${Math.random().toString(36).slice(2, 6)}`,
    })),
  };
}

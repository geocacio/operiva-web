import type { NicheDefinition } from "@/types/niche";

export const mockNiches: NicheDefinition[] = [
  {
    id: "funilaria",
    name: "Funilaria",
    description: "Oficinas, reparos e pintura automotiva",
    longDescription:
      "Fluxos com aprovação de seguradora, fotos obrigatórias e cliente ansioso acompanhando cada etapa.",
    icon: "Car",
    stepCount: 10,
    exampleFlow: "Recepção → Avaliação → Funilaria → Pintura → Entrega",
    traits: [
      { id: "fotos", label: "Fotos obrigatórias", icon: "Camera" },
      { id: "cliente", label: "Aprovação do cliente", icon: "UserCheck" },
      { id: "seguradora", label: "Aprovação seguradora", icon: "Shield" },
      { id: "timeline", label: "Timeline visual", icon: "GitBranch" },
    ],
    accentColor: "#6366f1",
    gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
    defaultSteps: [
      "Recepção",
      "Avaliação",
      "Aprovação seguradora",
      "Desmontagem",
      "Funilaria",
      "Pintura",
      "Polimento",
      "Montagem",
      "Lavagem",
      "Entrega",
    ],
  },
  {
    id: "construcao",
    name: "Construção civil",
    description: "Obras, reformas e equipes multidisciplinares",
    longDescription:
      "Serviços longos com dependências entre etapas, múltiplas equipes e cronograma visual para o cliente.",
    icon: "Building2",
    stepCount: 9,
    exampleFlow: "Fundação → Estrutura → Alvenaria → Acabamento → Entrega",
    traits: [
      { id: "longo", label: "Serviços longos", icon: "Clock" },
      { id: "equipes", label: "Múltiplas equipes", icon: "Users" },
      { id: "deps", label: "Dependências entre etapas", icon: "Link" },
      { id: "cronograma", label: "Cronograma visual", icon: "Calendar" },
    ],
    accentColor: "#10b981",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    defaultSteps: [
      "Fundação",
      "Estrutura",
      "Alvenaria",
      "Elétrica",
      "Hidráulica",
      "Acabamento",
      "Pintura",
      "Vistoria",
      "Entrega",
    ],
  },
];

export function getNicheById(id: string) {
  return mockNiches.find((n) => n.id === id);
}

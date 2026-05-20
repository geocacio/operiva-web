import type { NicheId } from "@/types/niche";
import type { TemplateTeamRole } from "@/types/operiva-template";

export const configTeamRoles: TemplateTeamRole[] = [
  { id: "role-funileiro", name: "Funileiro", nicheId: "funilaria", color: "#6366f1", memberCount: 4 },
  { id: "role-pintor", name: "Pintor", nicheId: "funilaria", color: "#8b5cf6", memberCount: 3 },
  { id: "role-polidor", name: "Polidor", nicheId: "funilaria", color: "#a78bfa", memberCount: 2 },
  { id: "role-recepcao", name: "Recepção", nicheId: "funilaria", color: "#818cf8", memberCount: 2 },
  { id: "role-pedreiro", name: "Pedreiro", nicheId: "construcao", color: "#10b981", memberCount: 6 },
  { id: "role-eletricista", name: "Eletricista", nicheId: "construcao", color: "#f59e0b", memberCount: 3 },
  { id: "role-engenheiro", name: "Engenheiro", nicheId: "construcao", color: "#06b6d4", memberCount: 2 },
  { id: "role-hidraulica", name: "Hidráulica", nicheId: "construcao", color: "#14b8a6", memberCount: 2 },
];

export function getRolesForNiche(nicheId: NicheId) {
  return configTeamRoles.filter((r) => r.nicheId === nicheId);
}

export const defaultTeamAssignments: Record<NicheId, Record<string, string>> = {
  funilaria: {
    Recepção: "role-recepcao",
    Avaliação: "role-recepcao",
    "Aprovação seguradora": "role-recepcao",
    Desmontagem: "role-funileiro",
    Funilaria: "role-funileiro",
    Pintura: "role-pintor",
    Polimento: "role-polidor",
    Montagem: "role-funileiro",
    Lavagem: "role-polidor",
    Entrega: "role-recepcao",
  },
  construcao: {
    Fundação: "role-pedreiro",
    Estrutura: "role-pedreiro",
    Alvenaria: "role-pedreiro",
    Elétrica: "role-eletricista",
    Hidráulica: "role-hidraulica",
    Acabamento: "role-pedreiro",
    Pintura: "role-pedreiro",
    Vistoria: "role-engenheiro",
    Entrega: "role-engenheiro",
  },
};

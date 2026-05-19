import type { Team } from "@/types";

export const mockTeams: Team[] = [
  {
    id: "t1",
    name: "Funilaria & Pintura",
    description: "Oficina automotiva e acabamento",
    memberIds: ["u1", "u2", "u5"],
    color: "#6366f1",
  },
  {
    id: "t2",
    name: "Energia Solar",
    description: "Instalações e homologação",
    memberIds: ["u3"],
    color: "#f59e0b",
  },
  {
    id: "t3",
    name: "Obras Residenciais",
    description: "Construção e reformas",
    memberIds: ["u4"],
    color: "#10b981",
  },
  {
    id: "t4",
    name: "Acabamentos",
    description: "Pintura e detalhes finais",
    memberIds: ["u6"],
    color: "#ec4899",
  },
];

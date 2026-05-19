import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Ana Costa",
    email: "ana@operiva.demo",
    role: "Coordenadora",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ana",
    status: "online",
    teamId: "t1",
  },
  {
    id: "u2",
    name: "Bruno Mendes",
    email: "bruno@operiva.demo",
    role: "Técnico de campo",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bruno",
    status: "online",
    teamId: "t1",
  },
  {
    id: "u3",
    name: "Carla Ribeiro",
    email: "carla@operiva.demo",
    role: "Instaladora solar",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Carla",
    status: "ocupado",
    teamId: "t2",
  },
  {
    id: "u4",
    name: "Diego Alves",
    email: "diego@operiva.demo",
    role: "Mestre de obras",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Diego",
    status: "online",
    teamId: "t3",
  },
  {
    id: "u5",
    name: "Elena Souza",
    email: "elena@operiva.demo",
    role: "Atendimento",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Elena",
    status: "offline",
    teamId: "t1",
  },
  {
    id: "u6",
    name: "Felipe Nunes",
    email: "felipe@operiva.demo",
    role: "Pintor",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felipe",
    status: "online",
    teamId: "t4",
  },
];

export const currentUser = mockUsers[0];

import type { Client } from "@/types";

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Marcos Oliveira",
    company: "Auto Prime Ltda",
    email: "marcos@autoprime.com.br",
    phone: "(11) 98765-4321",
    servicesCount: 3,
    lastContact: "2026-05-18T14:30:00Z",
  },
  {
    id: "c2",
    name: "Família Silva",
    company: "Residencial Silva",
    email: "contato@obrasilva.com.br",
    phone: "(21) 99876-5432",
    servicesCount: 1,
    lastContact: "2026-05-17T09:15:00Z",
  },
  {
    id: "c3",
    name: "GreenVolt Energia",
    company: "GreenVolt",
    email: "projetos@greenvolt.com.br",
    phone: "(48) 99123-4567",
    servicesCount: 5,
    lastContact: "2026-05-19T08:00:00Z",
  },
  {
    id: "c4",
    name: "Patrícia Lima",
    email: "patricia.lima@gmail.com",
    phone: "(31) 97654-3210",
    servicesCount: 2,
    lastContact: "2026-05-16T16:45:00Z",
  },
  {
    id: "c5",
    name: "Móveis Planejados Norte",
    company: "MPN Design",
    email: "ops@mpndesign.com.br",
    phone: "(85) 98888-7777",
    servicesCount: 4,
    lastContact: "2026-05-15T11:20:00Z",
  },
];

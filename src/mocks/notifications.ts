import type { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "atraso",
    title: "Serviço atrasado",
    message: "Assistência técnica — Ar condicionado passou do prazo em 2 dias",
    read: false,
    createdAt: "2026-05-18T16:00:00Z",
    serviceId: "s6",
  },
  {
    id: "n2",
    type: "alerta",
    title: "Aprovação pendente",
    message: "Instalação Solar #194 aguarda assinatura do cliente",
    read: false,
    createdAt: "2026-05-19T10:15:00Z",
    serviceId: "s3",
  },
  {
    id: "n3",
    type: "info",
    title: "Nova etapa registrada",
    message: "Bruno Mendes concluiu etapa em Oficina Prime",
    read: false,
    createdAt: "2026-05-19T11:45:00Z",
    serviceId: "s1",
  },
  {
    id: "n4",
    type: "sucesso",
    title: "Serviço concluído",
    message: "Pintura Finalizada — Apt. 402 encerrado com sucesso",
    read: true,
    createdAt: "2026-05-15T14:00:00Z",
    serviceId: "s4",
  },
  {
    id: "n5",
    type: "alerta",
    title: "Cliente aguardando resposta",
    message: "MPN Design solicitou revisão do projeto 3D",
    read: false,
    createdAt: "2026-05-18T17:20:00Z",
    serviceId: "s5",
  },
];

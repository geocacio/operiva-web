import { mockServices } from "./services";
import type { ServiceExecution } from "@/types/execution";

const solarExecution: ServiceExecution = {
  serviceId: "s3",
  currentStepIndex: 4,
  estimatedMinutesRemaining: 95,
  paused: false,
  clientStatus: "pendente_aprovacao",
  steps: [
    {
      id: "st1",
      name: "Briefing e segurança",
      description: "Checklist NR e alinhamento com o cliente no local.",
      order: 1,
      status: "concluida",
    },
    {
      id: "st2",
      name: "Estrutura no telhado",
      description: "Trilhos fixados e inclinação conferida.",
      order: 2,
      status: "concluida",
    },
    {
      id: "st3",
      name: "Montagem das placas",
      description: "12 módulos instalados e aterramento verificado.",
      order: 3,
      status: "concluida",
    },
    {
      id: "st4",
      name: "Conexão do inversor",
      description: "Cabos CC/CA e string box finalizados.",
      order: 4,
      status: "concluida",
    },
    {
      id: "st5",
      name: "Em Execução",
      description:
        "Realize testes de tensão, comissionamento do inversor híbrido e registre fotos do quadro final.",
      order: 5,
      status: "atual",
    },
    {
      id: "st6",
      name: "Entrega e documentação",
      description: "Termo de aceite, manual e envio para aprovação do cliente.",
      order: 6,
      status: "pendente",
    },
  ],
  timeline: [
    {
      id: "ex-s3-1",
      type: "status",
      title: "Serviço iniciado no modo profissional",
      description: "Carla Ribeiro assumiu a execução em campo.",
      createdAt: "2026-05-12T07:15:00Z",
    },
    {
      id: "ex-s3-2",
      type: "etapa",
      title: "Estrutura concluída",
      description: "Trilhos e fixações aprovados em vistoria interna.",
      createdAt: "2026-05-14T16:40:00Z",
    },
    {
      id: "ex-s3-3",
      type: "foto",
      title: "Fotos das placas enviadas",
      description: "4 imagens do arranjo no telhado sul.",
      createdAt: "2026-05-17T11:20:00Z",
    },
    {
      id: "ex-s3-4",
      type: "etapa",
      title: "Inversor conectado",
      description: "Quadro CA energizado — aguardando testes finais.",
      createdAt: "2026-05-18T14:05:00Z",
    },
    {
      id: "ex-s3-5",
      type: "comentario",
      title: "Atualização automática",
      description: "Cliente notificado sobre início da etapa de comissionamento.",
      createdAt: "2026-05-19T09:00:00Z",
    },
    {
      id: "ex-s3-6",
      type: "aprovacao",
      title: "Solicitação de aprovação enviada",
      description: "Termo parcial enviado — aguardando retorno GreenVolt.",
      createdAt: "2026-05-19T10:15:00Z",
    },
  ],
  messages: [
    {
      id: "msg-s3-1",
      from: "cliente",
      authorName: "GreenVolt",
      content: "Podem confirmar se o disjuntor geral suporta a carga do inversor?",
      createdAt: "2026-05-18T17:30:00Z",
    },
    {
      id: "msg-s3-2",
      from: "sistema",
      authorName: "Operiva",
      content:
        "Atualização enviada ao cliente: etapa «Conexão do inversor» concluída.",
      createdAt: "2026-05-18T14:06:00Z",
    },
    {
      id: "msg-s3-3",
      from: "cliente",
      authorName: "GreenVolt",
      content: "Estamos acompanhando. Aguardamos fotos do quadro final.",
      createdAt: "2026-05-19T08:45:00Z",
    },
  ],
  uploads: [],
};

function buildGenericExecution(serviceId: string): ServiceExecution {
  const service = mockServices.find((s) => s.id === serviceId);
  const total = service?.stepsTotal ?? 5;
  const completed = service?.stepsCompleted ?? 1;
  const currentIndex = Math.min(completed, total - 1);

  const steps = Array.from({ length: total }, (_, i) => ({
    id: `${serviceId}-step-${i + 1}`,
    name: i === currentIndex ? "Em Execução" : `Etapa ${i + 1}`,
    description:
      i === currentIndex
        ? "Execute as tarefas desta etapa e registre o progresso com um toque."
        : i < currentIndex
          ? "Etapa finalizada."
          : "Aguardando etapas anteriores.",
    order: i + 1,
    status: (i < currentIndex
      ? "concluida"
      : i === currentIndex
        ? "atual"
        : "pendente") as ServiceExecution["steps"][0]["status"],
  }));

  const clientStatus =
    service?.status === "aguardando_aprovacao"
      ? "pendente_aprovacao"
      : service?.status === "em_andamento"
        ? "acompanhando"
        : "sem_interacao";

  return {
    serviceId,
    currentStepIndex: currentIndex,
    steps,
    estimatedMinutesRemaining: Math.max(30, (total - completed) * 45),
    paused: false,
    clientStatus,
    timeline: [
      {
        id: `${serviceId}-tl-1`,
        type: "status",
        title: "Execução iniciada",
        description: service?.title ?? "Serviço em campo",
        createdAt: service?.createdAt ?? new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: `${serviceId}-msg-1`,
        from: "sistema",
        authorName: "Operiva",
        content: "Modo profissional ativo. Registre cada avanço em um toque.",
        createdAt: new Date().toISOString(),
      },
    ],
    uploads: [],
  };
}

const executionByService: Record<string, ServiceExecution> = {
  s3: solarExecution,
};

export function getMockExecution(serviceId: string): ServiceExecution {
  if (executionByService[serviceId]) {
    return structuredClone(executionByService[serviceId]);
  }
  const built = buildGenericExecution(serviceId);
  executionByService[serviceId] = built;
  return structuredClone(built);
}

export const mockExecutions: ServiceExecution[] = mockServices
  .filter((s) => s.status !== "concluido")
  .map((s) => getMockExecution(s.id));

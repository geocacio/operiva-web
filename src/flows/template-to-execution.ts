import type { OperivaTemplate } from "@/types/operiva-template";
import type { ExecutionStep, ServiceExecution } from "@/types/execution";

export function templateStepsToExecution(
  template: OperivaTemplate,
  serviceId: string,
  startIndex = 0
): ExecutionStep[] {
  return template.steps.map((step, i) => ({
    id: `${serviceId}-${step.id}`,
    name: step.name,
    description: step.description,
    order: step.order,
    status:
      i < startIndex
        ? "concluida"
        : i === startIndex
          ? "atual"
          : "pendente",
    addedDuringExecution: false,
    clientVisible: step.clientVisible,
    needsApproval: step.needsApproval,
  }));
}

export function buildExecutionFromTemplate(
  template: OperivaTemplate,
  serviceId: string,
  options?: { startIndex?: number; clientName?: string }
): ServiceExecution {
  const startIndex = options?.startIndex ?? 0;
  const steps = templateStepsToExecution(template, serviceId, startIndex);

  return {
    serviceId,
    currentStepIndex: startIndex,
    steps,
    estimatedMinutesRemaining: template.avgDays * 8 * 60,
    paused: false,
    clientStatus: "acompanhando",
    timeline: [
      {
        id: `${serviceId}-init`,
        type: "status",
        title: "Serviço criado",
        description: `Plano inicial baseado em «${template.name}» — ${options?.clientName ?? "Cliente"}. As etapas podem ser ajustadas durante a execução.`,
        createdAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: `${serviceId}-msg-welcome`,
        from: "sistema",
        authorName: "Operiva",
        content: `Serviço iniciado com ${steps.length} etapas do plano. Adicione etapas, sub-etapas ou registre ocorrências conforme necessário.`,
        createdAt: new Date().toISOString(),
      },
    ],
    uploads: [],
    occurrences: [],
    approvals: [],
  };
}

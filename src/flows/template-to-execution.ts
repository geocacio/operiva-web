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
        title: "Serviço criado a partir do template",
        description: `«${template.name}» — ${options?.clientName ?? "Cliente"}`,
        createdAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: `${serviceId}-msg-welcome`,
        from: "sistema",
        authorName: "Operiva",
        content: `Fluxo «${template.name}» iniciado. ${steps.length} etapas configuradas.`,
        createdAt: new Date().toISOString(),
      },
    ],
    uploads: [],
  };
}

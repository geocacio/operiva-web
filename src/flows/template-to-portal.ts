/**
 * template-to-portal.ts
 *
 * Mantido para compatibilidade — delega para execution-to-portal.ts,
 * que constrói o portal a partir do estado vivo da execução,
 * não mais do template original.
 */

import type { OperivaTemplate } from "@/types/operiva-template";
import type { ClientPortalData } from "@/types/portal";
import type { ServiceExecution } from "@/types/execution";
import { buildPortalFromExecution } from "./execution-to-portal";

export function buildPortalFromTemplate(
  template: OperivaTemplate,
  serviceId: string,
  token: string,
  serviceTitle: string,
  clientName: string,
  execution: ServiceExecution
): ClientPortalData {
  const theme =
    template.nicheId === "funilaria"
      ? "vehicle"
      : template.nicheId === "construcao"
        ? "construction"
        : "default";

  return buildPortalFromExecution(execution, {
    token,
    serviceId,
    serviceTitle,
    clientName,
    serviceTheme: theme,
    responsibleName: "Equipe Operiva",
  });
}

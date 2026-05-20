import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ServiceCreationWizardView } from "@/modules/services/service-creation-wizard-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Novo serviço — Operiva",
};

export default function NovoServicoPage() {
  return (
    <AppShell title="Novo serviço" subtitle="Wizard de criação em 4 etapas">
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
        <ServiceCreationWizardView />
      </Suspense>
    </AppShell>
  );
}

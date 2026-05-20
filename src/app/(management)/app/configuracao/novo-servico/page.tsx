import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CreateServiceView } from "@/modules/operiva-config/create-service-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Novo serviço — Operiva",
};

export default function NovoServicoPage() {
  return (
    <AppShell title="Novo serviço" subtitle="Gerar a partir de template">
      <Suspense fallback={<Skeleton className="h-96 max-w-xl rounded-xl" />}>
        <CreateServiceView />
      </Suspense>
    </AppShell>
  );
}

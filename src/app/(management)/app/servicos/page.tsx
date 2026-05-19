import { AppShell } from "@/components/layout/app-shell";
import { ManagementServicesView } from "@/modules/management/services-view";

export const metadata = {
  title: "Serviços — Operiva",
};

export default function ServicosPage() {
  return (
    <AppShell
      title="Serviços"
      subtitle="Lista, kanban e filtros operacionais"
    >
      <ManagementServicesView />
    </AppShell>
  );
}

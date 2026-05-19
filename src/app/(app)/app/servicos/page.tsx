import { AppShell } from "@/components/layout/app-shell";
import { ServicesView } from "@/modules/services/services-view";

export const metadata = {
  title: "Serviços — Operiva",
};

export default function ServicosPage() {
  return (
    <AppShell title="Serviços" subtitle="Todos os serviços da operação">
      <ServicesView />
    </AppShell>
  );
}

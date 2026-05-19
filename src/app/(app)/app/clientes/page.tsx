import { AppShell } from "@/components/layout/app-shell";
import { ClientsView } from "@/modules/clients/clients-view";

export const metadata = {
  title: "Clientes — Operiva",
};

export default function ClientesPage() {
  return (
    <AppShell title="Clientes" subtitle="Base de clientes vinculados aos serviços">
      <ClientsView />
    </AppShell>
  );
}

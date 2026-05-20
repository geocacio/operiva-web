import { AppShell } from "@/components/layout/app-shell";
import { RelatoriosView } from "@/modules/relatorios/relatorios-view";

export const metadata = {
  title: "Relatórios — Operiva",
};

export default function RelatoriosPage() {
  return (
    <AppShell title="Relatórios" subtitle="Métricas operacionais (mock)">
      <RelatoriosView />
    </AppShell>
  );
}

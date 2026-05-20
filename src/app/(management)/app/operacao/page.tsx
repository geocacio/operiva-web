import { AppShell } from "@/components/layout/app-shell";
import { OperacaoView } from "@/modules/operacao/operacao-view";

export const metadata = {
  title: "Operação — Operiva",
};

export default function OperacaoPage() {
  return (
    <AppShell title="Operação" subtitle="Meus serviços, prioridades e campo">
      <OperacaoView />
    </AppShell>
  );
}

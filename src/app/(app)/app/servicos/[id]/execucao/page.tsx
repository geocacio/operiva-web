import { AppShell } from "@/components/layout/app-shell";
import { ExecutionView } from "@/modules/execution/execution-view";

export const metadata = {
  title: "Execução — Modo Profissional — Operiva",
};

export default async function ExecucaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell
      title="Execução do Serviço"
      subtitle="Modo Profissional — cockpit de campo"
    >
      <ExecutionView serviceId={id} />
    </AppShell>
  );
}

import { ExecutionView } from "@/modules/execution/execution-view";

export const metadata = {
  title: "Modo Execução — Operiva",
  description: "Registre progresso em campo com um toque.",
};

export default async function ExecucaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExecutionView serviceId={id} />;
}

import { AppShell } from "@/components/layout/app-shell";
import { ClientVisibilityView } from "@/modules/operiva-config/client-visibility-view";

export const metadata = {
  title: "Visibilidade do cliente — Operiva",
};

export default async function ClienteTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Cliente" subtitle="O que o cliente enxerga">
      <ClientVisibilityView templateId={id} />
    </AppShell>
  );
}

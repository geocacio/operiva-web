import { AppShell } from "@/components/layout/app-shell";
import { ClientVisibilityView } from "@/modules/operiva-config/client-visibility-view";

export const metadata = {
  title: "Visibilidade cliente — Operiva",
};

export default async function TemplateClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Cliente" subtitle="Preview empresa vs portal">
      <ClientVisibilityView templateId={id} />
    </AppShell>
  );
}

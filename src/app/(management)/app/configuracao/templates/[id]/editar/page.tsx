import { AppShell } from "@/components/layout/app-shell";
import { TemplateBuilderView } from "@/modules/operiva-config/template-builder-view";

export const metadata = {
  title: "Editor de fluxo — Operiva",
};

export default async function EditarTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Builder" subtitle="Editor visual do fluxo">
      <TemplateBuilderView templateId={id} />
    </AppShell>
  );
}

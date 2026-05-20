import { AppShell } from "@/components/layout/app-shell";
import { FlowPreviewView } from "@/modules/operiva-config/flow-preview-view";

export const metadata = {
  title: "Preview do fluxo — Operiva",
};

export default async function PreviewTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Preview" subtitle="Simulação visual do fluxo">
      <FlowPreviewView templateId={id} />
    </AppShell>
  );
}

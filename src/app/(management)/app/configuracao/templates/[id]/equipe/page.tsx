import { AppShell } from "@/components/layout/app-shell";
import { TeamConfigView } from "@/modules/operiva-config/team-config-view";

export const metadata = {
  title: "Equipe do template — Operiva",
};

export default async function EquipeTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Equipe" subtitle="Papéis e atribuições">
      <TeamConfigView templateId={id} />
    </AppShell>
  );
}

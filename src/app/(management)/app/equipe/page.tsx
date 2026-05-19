import { AppShell } from "@/components/layout/app-shell";
import { ManagementTeamView } from "@/modules/management/team-view";

export const metadata = {
  title: "Equipe — Operiva",
};

export default function EquipePage() {
  return (
    <AppShell title="Equipe" subtitle="Times, disponibilidade e campo">
      <ManagementTeamView />
    </AppShell>
  );
}

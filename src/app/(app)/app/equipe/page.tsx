import { AppShell } from "@/components/layout/app-shell";
import { TeamView } from "@/modules/team/team-view";

export const metadata = {
  title: "Equipe — Operiva",
};

export default function EquipePage() {
  return (
    <AppShell title="Equipe" subtitle="Times e disponibilidade">
      <TeamView />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/app-shell";
import { ManagementDashboardView } from "@/modules/management/dashboard-view";

export const metadata = {
  title: "Dashboard — Operiva",
};

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Clareza operacional — visão em tempo real (simulado)"
    >
      <ManagementDashboardView />
    </AppShell>
  );
}

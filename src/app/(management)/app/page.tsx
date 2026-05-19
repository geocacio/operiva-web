import { AppShell } from "@/components/layout/app-shell";
import { ManagementDashboardView } from "@/modules/management/dashboard-view";

export const metadata = {
  title: "Dashboard — Operiva",
};

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Visão operacional em tempo real (simulado)"
    >
      <ManagementDashboardView />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/app-shell";
import { DashboardView } from "@/modules/dashboard/dashboard-view";

export const metadata = {
  title: "Dashboard — Operiva",
};

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Visão operacional em tempo real (simulado)"
    >
      <DashboardView />
    </AppShell>
  );
}

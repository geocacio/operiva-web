import { AppShell } from "@/components/layout/app-shell";
import { InsightsView } from "@/modules/insights/insights-view";

export const metadata = {
  title: "Insights — Operiva",
};

export default function InsightsPage() {
  return (
    <AppShell
      title="Insights"
      subtitle="Copiloto operacional — clareza em 30 segundos (mock)"
    >
      <InsightsView />
    </AppShell>
  );
}

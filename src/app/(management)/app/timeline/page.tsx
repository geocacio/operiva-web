import { AppShell } from "@/components/layout/app-shell";
import { TimelineView } from "@/modules/timeline/timeline-view";

export const metadata = {
  title: "Timeline — Operiva",
};

export default function TimelinePage() {
  return (
    <AppShell title="Timeline" subtitle="Histórico visual de etapas e eventos">
      <TimelineView />
    </AppShell>
  );
}

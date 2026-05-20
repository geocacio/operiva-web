import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { TemplateLibraryView } from "@/modules/operiva-config/template-library-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Biblioteca de templates — Operiva",
};

export default function TemplatesPage() {
  return (
    <AppShell title="Templates" subtitle="Biblioteca por nicho">
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        }
      >
        <TemplateLibraryView />
      </Suspense>
    </AppShell>
  );
}

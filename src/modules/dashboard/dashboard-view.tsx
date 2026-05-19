"use client";

import { useEffect } from "react";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { AlertsPanel } from "@/components/shared/alerts-panel";
import { KpiCard } from "@/components/shared/kpi-card";
import { OperationalCard } from "@/components/shared/operational-card";
import { SimpleBarChart } from "@/components/shared/simple-bar-chart";
import { VisualTimeline } from "@/components/shared/visual-timeline";
import { Skeleton } from "@/components/ui/skeleton";
import { mockTimelineEvents } from "@/mocks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/store/slices/dashboard-slice";
import { fetchServices } from "@/store/slices/services-slice";

export function DashboardView() {
  const dispatch = useAppDispatch();
  const { kpis, weeklyChart, statusChart, activities, loading: dashLoading } =
    useAppSelector((s) => s.dashboard);
  const { items: services, loading: servicesLoading } = useAppSelector(
    (s) => s.services
  );
  const notifications = useAppSelector((s) => s.notifications.items);

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchServices());
  }, [dispatch]);

  const active = services.filter(
    (s) => s.status === "em_andamento" || s.status === "em_analise"
  );
  const delayed = services.filter((s) => s.status === "atrasado");
  const completed = services.filter((s) => s.status === "concluido");
  const loading = dashLoading || servicesLoading;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))
          : kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} delay={i * 0.05} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <SectionTitle
            title="Serviços em andamento"
            count={active.length}
          />
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {active.slice(0, 4).map((s, i) => (
                <OperationalCard key={s.id} service={s} delay={i * 0.05} />
              ))}
            </div>
          )}

          <SectionTitle title="Atrasados" count={delayed.length} variant="danger" />
          {!loading && delayed.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {delayed.map((s, i) => (
                <OperationalCard key={s.id} service={s} delay={i * 0.05} />
              ))}
            </div>
          )}

          <SectionTitle title="Concluídos recentes" count={completed.length} />
          {!loading && (
            <div className="grid gap-4 md:grid-cols-2">
              {completed.slice(0, 2).map((s, i) => (
                <OperationalCard key={s.id} service={s} delay={i * 0.05} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <AlertsPanel notifications={notifications} />
          <ActivityFeed items={activities} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {!loading && (
          <>
            <SimpleBarChart
              title="Etapas concluídas"
              subtitle="Últimos 7 dias"
              data={weeklyChart}
            />
            <SimpleBarChart
              title="Distribuição por status"
              subtitle="Visão geral da operação"
              data={statusChart}
              delay={0.1}
            />
          </>
        )}
      </section>

      <section>
        <SectionTitle title="Timeline recente" />
        <VisualTimeline events={mockTimelineEvents} limit={5} compact />
      </section>
    </div>
  );
}

function SectionTitle({
  title,
  count,
  variant = "default",
}: {
  title: string;
  count?: number;
  variant?: "default" | "danger";
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2
        className={
          variant === "danger"
            ? "text-sm font-medium text-red-400"
            : "text-sm font-medium"
        }
      >
        {title}
      </h2>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">{count}</span>
      )}
    </div>
  );
}

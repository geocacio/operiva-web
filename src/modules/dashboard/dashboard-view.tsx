"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { getExecutionHref, getPortalHref } from "@/lib/portal-routes";
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

  const featured = services.find((s) => s.id === "s3");

  return (
    <div className="space-y-6">
      {featured && (
        <section className="rounded-xl border border-[#3B82F6]/20 bg-gradient-to-r from-[#111827] to-[#0B0F19] p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#06B6D4]">
            Destaque operacional
          </p>
          <h2 className="mt-1 text-lg font-semibold">{featured.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {featured.clientName} · {featured.progress}% concluído
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={getExecutionHref(featured.id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB]"
            >
              <Play className="size-4" />
              Abrir execução
            </Link>
            <Link
              href={getPortalHref(featured.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2 text-sm font-medium text-[#10B981] hover:bg-[#10B981]/20"
            >
              <ExternalLink className="size-4" />
              Ver como cliente
            </Link>
          </div>
        </section>
      )}

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

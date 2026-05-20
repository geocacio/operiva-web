"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/shared/glass-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { getExecutionHref } from "@/lib/portal-routes";
import { currentUser } from "@/mocks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices } from "@/store/slices/services-slice";

function ServiceOperacaoCard({
  id,
  title,
  clientName,
  status,
  priority,
  dueDate,
}: {
  id: string;
  title: string;
  clientName: string;
  status: Parameters<typeof StatusBadge>[0]["status"];
  priority: Parameters<typeof PriorityBadge>[0]["priority"];
  dueDate: string;
}) {
  return (
    <Link href={getExecutionHref(id)}>
      <GlassCard className="p-4 transition-colors hover:border-[#3B82F6]/30">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{clientName}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <PriorityBadge priority={priority} />
          <span className="text-xs text-muted-foreground">
            Prazo {new Date(dueDate).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}

export function OperacaoView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.services.items);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const mine = useMemo(
    () => items.filter((s) => s.assigneeId === currentUser.id),
    [items]
  );

  const atrasados = useMemo(
    () =>
      items.filter(
        (s) => s.status === "atrasado" || s.status === "aguardando_aprovacao"
      ),
    [items]
  );

  const hoje = useMemo(() => {
    const today = new Date().toDateString();
    return items.filter(
      (s) =>
        s.status === "em_andamento" &&
        new Date(s.dueDate).toDateString() === today
    );
  }, [items]);

  const aguardando = useMemo(
    () => items.filter((s) => s.status === "aguardando_aprovacao"),
    [items]
  );

  return (
    <Tabs defaultValue="meus" className="space-y-6">
      <TabsList className="bg-[#111827]">
        <TabsTrigger value="meus">Meus serviços</TabsTrigger>
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="prioridades">Prioridades</TabsTrigger>
      </TabsList>

      <TabsContent value="meus" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mine.length === 0 ? (
          <p className="text-sm text-muted-foreground col-span-full">
            Nenhum serviço atribuído a {currentUser.name}.
          </p>
        ) : (
          mine.map((s) => (
            <ServiceOperacaoCard key={s.id} {...s} />
          ))
        )}
      </TabsContent>

      <TabsContent value="todos" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <ServiceOperacaoCard key={s.id} {...s} />
        ))}
      </TabsContent>

      <TabsContent value="prioridades" className="space-y-8">
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#EF4444]">
            <AlertTriangle className="size-4" />
            Atrasados e críticos
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {atrasados.map((s) => (
              <ServiceOperacaoCard key={s.id} {...s} />
            ))}
          </div>
        </section>
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#F59E0B]">
            <Calendar className="size-4" />
            Para hoje
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hoje.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nada com prazo hoje.</p>
            ) : (
              hoje.map((s) => <ServiceOperacaoCard key={s.id} {...s} />)
            )}
          </div>
        </section>
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#06B6D4]">
            <Clock className="size-4" />
            Aguardando aprovação
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aguardando.map((s) => (
              <ServiceOperacaoCard key={s.id} {...s} />
            ))}
          </div>
        </section>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Briefcase, LayoutGrid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { EmptyState } from "@/components/shared/empty-state";
import { ServicesTable } from "@/components/shared/services-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchServices,
  setFilter,
  setPriorityFilter,
  setStatusFilter,
  setViewMode,
} from "@/store/slices/services-slice";
import { ServicesFilters } from "./services-filters";
import { ServicesKanban } from "./services-kanban";
export function ManagementServicesView() {
  const dispatch = useAppDispatch();
  const { items, loading, filter, statusFilter, priorityFilter, viewMode } =
    useAppSelector((s) => s.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    return items.filter((s) => {
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.clientName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "todos" || s.status === statusFilter;
      const matchesPriority =
        priorityFilter === "todos" || s.priority === priorityFilter;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [items, filter, statusFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Filtrar por nome, cliente ou categoria..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="max-w-md border-white/10 bg-white/5"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild className="gap-2 bg-[#3B82F6] hover:bg-[#2563EB]">
            <Link href={APP_ROUTES.novoServico}>
              <Plus className="size-4" />
              Novo serviço
            </Link>
          </Button>
          <Tabs
            value={viewMode}
            onValueChange={(v) =>
              dispatch(setViewMode(v as "lista" | "kanban"))
            }
          >
            <TabsList className="bg-[#111827]">
              <TabsTrigger value="lista" className="gap-1.5">
                <List className="size-3.5" />
                Lista
              </TabsTrigger>
              <TabsTrigger value="kanban" className="gap-1.5">
                <LayoutGrid className="size-3.5" />
                Kanban
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <ServicesFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusChange={(v) => dispatch(setStatusFilter(v))}
        onPriorityChange={(v) => dispatch(setPriorityFilter(v))}
      />

      {filtered.length === 0 && !loading ? (
        <EmptyState
          icon={Briefcase}
          title="Nenhum serviço encontrado"
          description="Ajuste os filtros ou aguarde novos serviços na operação."
        />
      ) : viewMode === "kanban" ? (
        <ServicesKanban services={filtered} />
      ) : (
        <ServicesTable services={filtered} loading={loading} />
      )}
    </div>
  );
}

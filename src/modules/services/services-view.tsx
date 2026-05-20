"use client";

import { useEffect, useMemo } from "react";
import { Briefcase } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { OperationalCard } from "@/components/shared/operational-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices, setFilter } from "@/store/slices/services-slice";

export function ServicesView() {
  const dispatch = useAppDispatch();
  const { items, loading, filter } = useAppSelector((s) => s.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.clientName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [items, filter]);

  return (
    <div className="space-y-6">
      <Input
        placeholder="Filtrar por nome, cliente ou categoria..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="max-w-md border-white/10 bg-white/5"
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Nenhum serviço encontrado"
          description="Ajuste o filtro ou aguarde novos serviços na operação."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s, i) => (
            <OperationalCard key={s.id} service={s} delay={i * 0.03} />
          ))}
        </div>
      )}
    </div>
  );
}

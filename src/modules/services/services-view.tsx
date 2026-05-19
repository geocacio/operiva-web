"use client";

import { useEffect, useMemo } from "react";
import { Briefcase } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ServicesTable } from "@/components/shared/services-table";
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

      {filtered.length === 0 && !loading ? (
        <EmptyState
          icon={Briefcase}
          title="Nenhum serviço encontrado"
          description="Ajuste o filtro ou aguarde novos serviços na operação."
        />
      ) : (
        <ServicesTable services={filtered} loading={loading} />
      )}
    </div>
  );
}

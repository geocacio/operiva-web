"use client";

import { useEffect } from "react";
import { Building2, Mail, Phone } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClients } from "@/store/slices/clients-slice";
import { formatRelative } from "@/lib/format";

export function ClientsView() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="Nenhum cliente"
        description="Seus clientes aparecerão aqui conforme forem vinculados aos serviços."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((client, i) => (
        <GlassCard key={client.id} delay={i * 0.05} className="p-5">
          <h3 className="font-medium">{client.name}</h3>
          {client.company && (
            <p className="text-sm text-muted-foreground">{client.company}</p>
          )}
          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="size-3" /> {client.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-3" /> {client.phone}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
            <span>{client.servicesCount} serviços</span>
            <span>{formatRelative(client.lastContact)}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { mockUsers } from "@/mocks";
import { formatDate } from "@/lib/format";
import type { Service } from "@/types";

export function ServicesTable({
  services,
  loading,
}: {
  services: Service[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <GlassCard className="overflow-hidden p-0">
        <div className="space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Serviço</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Prioridade</th>
              <th className="px-4 py-3 font-medium">Responsável</th>
              <th className="px-4 py-3 font-medium w-40">Progresso</th>
              <th className="px-4 py-3 font-medium">Prazo</th>
              <th className="px-4 py-3 font-medium w-28">Ação</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              const assignee = mockUsers.find((u) => u.id === s.assigneeId);
              return (
                <tr
                  key={s.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.02] last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.category}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.clientName}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={s.priority} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {assignee?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ProgressBar value={s.progress} showLabel={false} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(s.dueDate)}
                  </td>
                  <td className="px-4 py-3">
                    {s.status !== "concluido" ? (
                      <Link
                        href={`/app/servicos/${s.id}/execucao`}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#3B82F6]/15 px-2.5 py-1.5 text-xs font-medium text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/25"
                      >
                        <Play className="size-3" />
                        Executar
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

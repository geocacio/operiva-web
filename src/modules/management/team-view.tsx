"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Users, Zap } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTeam } from "@/store/slices/team-slice";
import { fetchServices } from "@/store/slices/services-slice";
import { getExecutionHref } from "@/lib/portal-routes";
import { cn } from "@/lib/utils";

const statusLabel = {
  online: "Online",
  offline: "Offline",
  ocupado: "Ocupado",
} as const;

const statusColor = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  ocupado: "bg-amber-500",
} as const;

export function ManagementTeamView() {
  const dispatch = useAppDispatch();
  const { teams, users, loading } = useAppSelector((s) => s.team);
  const services = useAppSelector((s) => s.services.items);

  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchServices());
  }, [dispatch]);

  const activeByUser = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of services) {
      if (s.status === "em_andamento" || s.status === "atrasado") {
        map[s.assigneeId] = (map[s.assigneeId] ?? 0) + 1;
      }
    }
    return map;
  }, [services]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Nenhuma equipe"
        description="Configure equipes para organizar sua operação."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-4">
          <p className="text-xs text-[#9CA3AF]">Profissionais</p>
          <p className="mt-1 text-2xl font-semibold text-[#F9FAFB]">
            {users.length}
          </p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-[#9CA3AF]">Online agora</p>
          <p className="mt-1 text-2xl font-semibold text-[#10B981]">
            {users.filter((u) => u.status === "online").length}
          </p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-[#9CA3AF]">Em campo</p>
          <p className="mt-1 text-2xl font-semibold text-[#3B82F6]">
            {Object.values(activeByUser).reduce((a, b) => a + b, 0)}
          </p>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {teams.map((team) => {
          const members = users.filter((u) => team.memberIds.includes(u.id));
          return (
            <GlassCard key={team.id} className="p-5">
              <div className="flex items-center gap-3">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                <div>
                  <h3 className="font-medium">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {team.description}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {members.map((user) => {
                  const activeCount = activeByUser[user.id] ?? 0;
                  const activeService = services.find(
                    (s) =>
                      s.assigneeId === user.id &&
                      (s.status === "em_andamento" || s.status === "atrasado")
                  );

                  return (
                    <li
                      key={user.id}
                      className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center gap-3">
                        {user.avatarUrl && (
                          <img
                            src={user.avatarUrl}
                            alt=""
                            className="size-10 rounded-full ring-1 ring-white/10"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.role}
                          </p>
                        </div>
                        <Badge variant="outline" className="gap-1.5 font-normal">
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              statusColor[user.status]
                            )}
                          />
                          {statusLabel[user.status]}
                        </Badge>
                      </div>
                      {activeCount > 0 && activeService && (
                        <Link
                          href={getExecutionHref(activeService.id)}
                          className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#3B82F6]/10 px-2.5 py-2 text-xs text-[#3B82F6] hover:bg-[#3B82F6]/20"
                        >
                          <Zap className="size-3.5" />
                          {activeCount} em campo — abrir execução
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

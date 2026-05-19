"use client";

import { useEffect } from "react";
import { Users } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTeam } from "@/store/slices/team-slice";
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

export function TeamView() {
  const dispatch = useAppDispatch();
  const { teams, users, loading } = useAppSelector((s) => s.team);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

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
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-3">
              {members.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                >
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="size-10 rounded-full ring-1 ring-white/10"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <Badge variant="outline" className="gap-1.5 font-normal">
                    <span
                      className={cn("size-1.5 rounded-full", statusColor[user.status])}
                    />
                    {statusLabel[user.status]}
                  </Badge>
                </li>
              ))}
            </ul>
          </GlassCard>
        );
      })}
    </div>
  );
}

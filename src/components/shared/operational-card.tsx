"use client";

import Link from "next/link";
import { Calendar, ChevronRight, ExternalLink } from "lucide-react";
import { getExecutionHref, getPortalHref } from "@/lib/portal-routes";
import { GlassCard } from "@/components/shared/glass-card";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockUsers } from "@/mocks";
import { formatDate, formatRelative } from "@/lib/format";
import type { Service } from "@/types";

export function OperationalCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  const assignee = mockUsers.find((u) => u.id === service.assigneeId);

  return (
    <GlassCard delay={delay} className="group p-5 transition-colors hover:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{service.category}</p>
          <h3 className="mt-1 truncate font-medium leading-snug">{service.title}</h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {service.clientName}
          </p>
        </div>
        <StatusBadge status={service.status} />
      </div>

      <ProgressBar value={service.progress} className="mt-4" />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <PriorityBadge priority={service.priority} />
        <span className="text-xs text-muted-foreground">
          {service.stepsCompleted}/{service.stepsTotal} etapas
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {assignee?.avatarUrl && (
            <img
              src={assignee.avatarUrl}
              alt=""
              className="size-6 rounded-full ring-1 ring-white/10"
            />
          )}
          <span>{assignee?.name ?? "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDate(service.dueDate)}
          </span>
          <span>{formatRelative(service.updatedAt)}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 opacity-0 transition-opacity group-hover:opacity-100">
        {service.status !== "concluido" && (
          <Link
            href={getExecutionHref(service.id)}
            className="flex items-center gap-1 text-xs text-[#3B82F6]"
          >
            Abrir execução <ChevronRight className="size-3" />
          </Link>
        )}
        <Link
          href={getPortalHref(service.id)}
          className="flex items-center gap-1 text-xs text-[#10B981]"
        >
          Portal do cliente <ExternalLink className="size-3" />
        </Link>
      </div>
    </GlassCard>
  );
}

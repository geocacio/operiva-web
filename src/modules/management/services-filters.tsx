"use client";

import { cn } from "@/lib/utils";
import type { ServiceStatus, Priority } from "@/types";
import { SERVICE_STATUS_LABELS, PRIORITY_LABELS } from "@/lib/constants";

const STATUS_OPTIONS: (ServiceStatus | "todos")[] = [
  "todos",
  "em_andamento",
  "aguardando_aprovacao",
  "atrasado",
  "em_analise",
  "concluido",
];

const PRIORITY_OPTIONS: (Priority | "todos")[] = ["todos", "alta", "media", "baixa"];

export function ServicesFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: {
  statusFilter: ServiceStatus | "todos";
  priorityFilter: Priority | "todos";
  onStatusChange: (v: ServiceStatus | "todos") => void;
  onPriorityChange: (v: Priority | "todos") => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              statusFilter === status
                ? "bg-[#3B82F6] text-white"
                : "border border-[#1F2937] bg-[#111827] text-[#9CA3AF] hover:text-[#F9FAFB]"
            )}
          >
            {status === "todos" ? "Todos" : SERVICE_STATUS_LABELS[status]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:ml-auto">
        {PRIORITY_OPTIONS.map((priority) => (
          <button
            key={priority}
            type="button"
            onClick={() => onPriorityChange(priority)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              priorityFilter === priority
                ? "bg-[#06B6D4]/20 text-[#06B6D4] ring-1 ring-[#06B6D4]/40"
                : "border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]"
            )}
          >
            {priority === "todos" ? "Prioridade" : PRIORITY_LABELS[priority]}
          </button>
        ))}
      </div>
    </div>
  );
}

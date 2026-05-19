"use client";

import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useMotionConfig } from "@/hooks/use-motion";
import { getExecutionHref, getPortalHref } from "@/lib/portal-routes";
import { SERVICE_STATUS_LABELS } from "@/lib/constants";
import type { Service, ServiceStatus } from "@/types";

const KANBAN_COLUMNS: ServiceStatus[] = [
  "em_analise",
  "em_andamento",
  "aguardando_aprovacao",
  "atrasado",
  "concluido",
];

const columnAccent: Record<ServiceStatus, string> = {
  em_analise: "border-t-[#06B6D4]",
  em_andamento: "border-t-[#3B82F6]",
  aguardando_aprovacao: "border-t-[#F59E0B]",
  atrasado: "border-t-[#EF4444]",
  concluido: "border-t-[#10B981]",
};

export function ServicesKanban({ services }: { services: Service[] }) {
  const { reduced, stagger } = useMotionConfig();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((status, colIndex) => {
        const columnServices = services.filter((s) => s.status === status);

        return (
          <motion.div
            key={status}
            className="flex w-72 shrink-0 flex-col"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * stagger }}
          >
            <motion.div
              className={`mb-3 rounded-t-lg border-t-2 bg-[#111827]/50 px-3 py-2 ${columnAccent[status]}`}
            >
              <h3 className="text-xs font-medium text-[#F9FAFB]">
                {SERVICE_STATUS_LABELS[status]}
              </h3>
              <span className="text-[10px] text-[#9CA3AF]">
                {columnServices.length} serviço(s)
              </span>
            </motion.div>

            <div className="flex flex-1 flex-col gap-3">
              {columnServices.map((service, i) => (
                <GlassCard key={service.id} delay={i * 0.03} className="p-4">
                  <p className="text-xs text-[#9CA3AF]">{service.category}</p>
                  <p className="mt-1 font-medium leading-snug text-[#F9FAFB]">
                    {service.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#9CA3AF]">
                    {service.clientName}
                  </p>
                  <ProgressBar
                    value={service.progress}
                    className="mt-3"
                    showLabel={false}
                  />
                  <div className="mt-2">
                    <PriorityBadge priority={service.priority} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.status !== "concluido" && (
                      <Link
                        href={getExecutionHref(service.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#3B82F6]/15 px-2 py-1 text-[10px] font-medium text-[#3B82F6] hover:bg-[#3B82F6]/25"
                      >
                        <Play className="size-3" />
                        Execução
                      </Link>
                    )}
                    <Link
                      href={getPortalHref(service.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#10B981]/10 px-2 py-1 text-[10px] font-medium text-[#10B981] hover:bg-[#10B981]/20"
                    >
                      <ExternalLink className="size-3" />
                      Portal
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/shared/status-badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { ShareTrackingLink } from "@/components/operiva/share-tracking-link";
import { useMotionConfig } from "@/hooks/use-motion";
import type { Service } from "@/types";

function formatEta(minutes: number) {
  if (minutes <= 0) return "Finalizando";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `~${m} min`;
  return `~${h}h ${m}min`;
}

export function ExecutionMinimalHeader({
  service,
  estimatedMinutesRemaining,
  paused,
  progressPercent,
}: {
  service: Service;
  estimatedMinutesRemaining: number;
  paused: boolean;
  progressPercent: number;
}) {
  const { reduced } = useMotionConfig();

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[#1F2937] bg-[#0B0F19]/95 px-4 py-3 backdrop-blur-md"
      initial={reduced ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link
        href="/app/servicos"
        className="mb-2 inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] transition-colors hover:text-[#F9FAFB]"
      >
        <ArrowLeft className="size-3.5" />
        Voltar
      </Link>

      <div className="flex items-start justify-between gap-3">
        <motion.div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-[#F9FAFB]">
            {service.title}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StatusBadge status={service.status} />
            {paused && (
              <span className="rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] text-[#F59E0B]">
                Pausado
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] text-[#9CA3AF]">
              <Clock className="size-3 text-[#06B6D4]" />
              {formatEta(estimatedMinutesRemaining)}
            </span>
          </div>
        </motion.div>
        <span className="shrink-0 text-sm font-semibold text-[#06B6D4]">
          {progressPercent}%
        </span>
      </div>

      <ProgressBar
        value={progressPercent}
        className="mt-3"
        barClassName="from-[#3B82F6] to-[#06B6D4]"
        showLabel={false}
      />
      <div className="mt-3">
        <ShareTrackingLink serviceId={service.id} />
      </div>
    </motion.header>
  );
}

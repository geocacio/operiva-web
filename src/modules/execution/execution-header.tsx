"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

function formatEta(minutes: number) {
  if (minutes <= 0) return "Finalizando";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `~${m} min restantes`;
  return `~${h}h ${m}min restantes`;
}

export function ExecutionHeader({
  service,
  estimatedMinutesRemaining,
  paused,
  onFinishStep,
}: {
  service: Service;
  estimatedMinutesRemaining: number;
  paused: boolean;
  onFinishStep: () => void;
}) {
  const { reduced } = useMotionConfig();

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-30 -mx-4 border-b border-[#1F2937] bg-[#0B0F19]/95 px-4 py-3 backdrop-blur-md lg:-mx-6 lg:px-6"
      )}
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="mb-3 flex items-center gap-2 text-[#9CA3AF]"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link
          href="/app/servicos"
          className="inline-flex items-center gap-1 text-xs transition-colors hover:text-[#F9FAFB]"
        >
          <ArrowLeft className="size-3.5" />
          Serviços
        </Link>
        <span className="text-[#1F2937]">/</span>
        <span className="text-xs text-[#06B6D4]">Modo Profissional</span>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <motion.div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold text-[#F9FAFB] sm:text-xl">
            {service.title}
          </h1>
          <motion.div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={service.status} />
            {paused && (
              <span className="rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-2.5 py-0.5 text-xs text-[#F59E0B]">
                Pausado
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
              <Clock className="size-3.5 text-[#06B6D4]" />
              {formatEta(estimatedMinutesRemaining)}
            </span>
          </motion.div>
        </motion.div>

        <Button
          size="lg"
          disabled={paused}
          onClick={onFinishStep}
          className="h-11 shrink-0 gap-2 bg-[#3B82F6] px-5 text-[#F9FAFB] hover:bg-[#2563EB] disabled:opacity-50"
        >
          <Flag className="size-4" />
          Finalizar etapa
        </Button>
      </motion.div>
    </motion.header>
  );
}

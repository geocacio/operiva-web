"use client";

import { motion } from "framer-motion";
import { Building2, Sparkles, User } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import type { ClientPortalData } from "@/types/portal";

export function PortalHeader({ portal }: { portal: ClientPortalData }) {
  const { reduced } = useMotionConfig();

  return (
    <motion.header
      className="relative overflow-hidden border-b border-[#1F2937] px-5 pb-6 pt-8"
      initial={reduced ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[#3B82F6]/15 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      <p className="relative flex items-center gap-1.5 text-xs font-medium text-[#06B6D4]">
        <Sparkles className="size-3.5" />
        Seu serviço está evoluindo
      </p>
      <h1 className="relative mt-2 text-2xl font-bold leading-tight text-[#F9FAFB] sm:text-3xl">
        {portal.serviceTitle}
      </h1>

      <div className="relative mt-4 flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-[#111827]/80 px-3 py-1 text-[#9CA3AF]">
          <Building2 className="size-3.5 text-[#3B82F6]" />
          {portal.companyName}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-[#111827]/80 px-3 py-1 text-[#9CA3AF]">
          <User className="size-3.5 text-[#10B981]" />
          {portal.responsibleName}
        </span>
      </div>

      <motion.div
        className="relative mt-5 rounded-2xl border border-[#3B82F6]/20 bg-gradient-to-r from-[#3B82F6]/10 to-transparent px-4 py-3"
        initial={reduced ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-sm font-medium leading-snug text-[#F9FAFB]">
          {portal.statusLabel}
        </p>
        <p className="mt-1 text-xs text-[#6B7280]">
          Atualizado {formatRelative(portal.lastUpdate)}
        </p>
      </motion.div>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { formatRelative } from "@/lib/format";
import { useMotionConfig } from "@/hooks/use-motion";
import type { PortalTimelineItem } from "@/types/portal";

export function MilestoneItem({
  item,
  isLatest,
  delay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
}) {
  const { reduced } = useMotionConfig();
  const celebration = item.celebration ?? item.type === "marco";

  return (
    <motion.li
      className="relative overflow-hidden rounded-2xl border border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/15 via-[#111827] to-[#0B0F19] p-5"
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45 }}
    >
      {!reduced && celebration && (
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#10B981]/20 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <div className="relative flex gap-3">
        <span className="text-3xl" role="img" aria-hidden>
          {item.emoji ?? "🎉"}
        </span>
        <motion.div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#10B981]" />
            <span className="text-xs font-medium uppercase tracking-wide text-[#10B981]">
              Marco alcançado
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-[#F9FAFB]">{item.title}</h3>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
              {item.description}
            </p>
          )}
          <time className="mt-3 block text-xs text-[#6B7280]">
            {formatRelative(item.createdAt)}
            {isLatest && (
              <span className="ml-2 text-[#3B82F6]">· mais recente</span>
            )}
          </time>
        </motion.div>
      </div>
    </motion.li>
  );
}

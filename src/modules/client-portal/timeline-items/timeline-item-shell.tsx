"use client";

import { motion } from "framer-motion";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PortalTimelineItem } from "@/types/portal";
import type { ReactNode } from "react";

export function TimelineItemShell({
  item,
  children,
  isLatest,
  accentClass,
  icon,
  reduced,
  delay,
}: {
  item: PortalTimelineItem;
  children: ReactNode;
  isLatest?: boolean;
  accentClass?: string;
  icon: ReactNode;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.li
      className={cn(
        "relative rounded-2xl border bg-[#111827]/60 p-4 backdrop-blur-sm",
        isLatest
          ? "border-[#3B82F6]/40 shadow-lg shadow-[#3B82F6]/10"
          : "border-[#1F2937]"
      )}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {isLatest && !reduced && (
        <motion.span
          className="absolute -left-px top-4 h-12 w-1 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#06B6D4]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden
        />
      )}
      <div className="flex gap-3">
        <motion.div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0B0F19]",
            accentClass
          )}
          animate={
            isLatest && !reduced
              ? { boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 0 8px rgba(59,130,246,0.15)", "0 0 0 0 rgba(59,130,246,0)"] }
              : undefined
          }
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {icon}
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold text-[#F9FAFB]">{item.title}</h3>
            <time className="shrink-0 text-xs text-[#6B7280]">
              {formatRelative(item.createdAt)}
            </time>
          </div>
          {item.authorName && (
            <p className="mt-0.5 text-xs text-[#06B6D4]">{item.authorName}</p>
          )}
          {children}
        </div>
      </div>
    </motion.li>
  );
}

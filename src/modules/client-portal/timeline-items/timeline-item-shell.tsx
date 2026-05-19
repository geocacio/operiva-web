"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PortalTimelineItem } from "@/types/portal";
import type { ReactNode } from "react";
import {
  cinematicEase,
  pulseGlowKeyframes,
  springTransition,
} from "../portal-motion";
import {
  formatHumanTimestamp,
  isImportantTimelineItem,
  justSentLabel,
} from "../portal-utils";

export type FeedVisualWeight = "hero" | "standard" | "compact";

export function TimelineItemShell({
  item,
  children,
  isLatest,
  accentClass,
  icon,
  reduced,
  delay,
  prominent,
  visualWeight,
}: {
  item: PortalTimelineItem;
  children: ReactNode;
  isLatest?: boolean;
  accentClass?: string;
  icon: ReactNode;
  reduced: boolean;
  delay: number;
  prominent?: boolean;
  visualWeight?: FeedVisualWeight;
}) {
  const important = prominent ?? isImportantTimelineItem(item);
  const weight =
    visualWeight ?? (important ? "standard" : "compact");
  const isHero = weight === "hero";
  const compact = weight === "compact";
  const fresh = justSentLabel(item.createdAt);

  return (
    <motion.li
      layout={!reduced}
      className={cn(
        "relative rounded-2xl border backdrop-blur-md transition-shadow",
        isHero &&
          "border-[#3B82F6]/40 bg-[#111827]/90 p-5 shadow-2xl shadow-[#3B82F6]/12",
        weight === "standard" &&
          important &&
          "border-[#3B82F6]/30 bg-[#111827]/75 p-4 shadow-lg shadow-[#3B82F6]/8",
        compact &&
          "border-[#1F2937]/70 bg-[#111827]/35 p-3 shadow-none",
        isLatest && important && "ring-1 ring-[#3B82F6]/25"
      )}
      initial={
        reduced
          ? false
          : { opacity: 0, y: isHero ? 24 : important ? 16 : 8, scale: isHero ? 0.98 : 1 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        ...springTransition,
        ease: cinematicEase,
      }}
    >
      {isLatest && !reduced && important && (
        <motion.span
          className="absolute -left-px top-5 h-16 w-1 rounded-full bg-gradient-to-b from-[#3B82F6] via-[#06B6D4] to-[#10B981]"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          aria-hidden
        />
      )}
      {isLatest && !reduced && (
        <motion.span
          className="absolute right-3 top-3 size-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden
        />
      )}
      <motion.div
        className={cn("flex gap-3", compact && "gap-2.5")}
        animate={
          isLatest && !reduced && important ? pulseGlowKeyframes : undefined
        }
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl border border-[#1F2937]/80 bg-[#0B0F19]/80",
            isHero ? "size-12" : important ? "size-10" : "size-8",
            accentClass
          )}
          animate={
            isLatest && !reduced && isHero
              ? { y: [0, -3, 0] }
              : undefined
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <div className="min-w-0 flex-1">
          <motion.div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3
              className={cn(
                "font-semibold text-[#F9FAFB]",
                isHero ? "text-lg" : important ? "text-base" : "text-sm"
              )}
            >
              {item.title}
            </h3>
            <time className="shrink-0 text-xs text-[#6B7280]">
              {formatHumanTimestamp(item.createdAt)}
            </time>
          </motion.div>
          {fresh && isLatest && (
            <motion.p
              className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#06B6D4]"
              initial={reduced ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springTransition}
            >
              {fresh}
            </motion.p>
          )}
          {item.authorName && (
            <p className="mt-0.5 text-xs text-[#06B6D4]">{item.authorName}</p>
          )}
          {children}
        </div>
      </motion.div>
    </motion.li>
  );
}

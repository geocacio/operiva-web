"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { PortalTimelineItem } from "@/types/portal";
import type { FeedVisualWeight } from "./timeline-item-shell";
import {
  floatKeyframes,
  floatTransition,
  springTransition,
} from "../portal-motion";
import {
  formatHumanTimestamp,
  isJustSent,
  justSentLabel,
} from "../portal-utils";

const MOMENT_STYLES = {
  success: {
    border: "border-[#10B981]/45",
    glow: "from-[#10B981]/25",
    badge: "Etapa finalizada com sucesso",
    badgeColor: "text-[#10B981]",
  },
  finishing: {
    border: "border-[#06B6D4]/40",
    glow: "from-[#06B6D4]/22",
    badge: "Estamos nos últimos ajustes",
    badgeColor: "text-[#06B6D4]",
  },
  thanks: {
    border: "border-[#3B82F6]/40",
    glow: "from-[#3B82F6]/22",
    badge: "Obrigado pela aprovação",
    badgeColor: "text-[#3B82F6]",
  },
} as const;

export function MilestoneItem({
  item,
  isLatest,
  delay,
  visualWeight,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
  visualWeight?: FeedVisualWeight;
}) {
  const { reduced } = useMotionConfig();
  const variant = item.momentVariant ?? "success";
  const style = MOMENT_STYLES[variant];
  const fresh = isLatest && isJustSent(item.createdAt);
  const isHero = visualWeight === "hero" || isLatest;

  return (
    <motion.li
      layout={!reduced}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br via-[#111827] to-[#0B0F19] backdrop-blur-md",
        style.border,
        style.glow,
        isHero ? "p-5 shadow-2xl shadow-[#10B981]/10" : "p-4 shadow-lg"
      )}
      initial={reduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, ...springTransition }}
    >
      {!reduced && (
        <motion.div
          className={cn(
            "pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl",
            variant === "success" && "bg-[#10B981]/30",
            variant === "finishing" && "bg-[#06B6D4]/28",
            variant === "thanks" && "bg-[#3B82F6]/28"
          )}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      )}
      <div className="relative flex gap-3">
        <motion.span
          className={cn(isHero ? "text-4xl" : "text-3xl")}
          role="img"
          aria-hidden
          animate={reduced ? undefined : floatKeyframes}
          transition={floatTransition}
        >
          {item.emoji ?? "🎉"}
        </motion.span>
        <motion.div className="min-w-0 flex-1">
          <motion.div
            className="flex items-center gap-2"
            animate={reduced ? undefined : { opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles className={cn("size-4", style.badgeColor)} />
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                style.badgeColor
              )}
            >
              {style.badge}
            </span>
          </motion.div>
          <h3
            className={cn(
              "mt-1 font-bold text-[#F9FAFB]",
              isHero ? "text-xl" : "text-lg"
            )}
          >
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
              {item.description}
            </p>
          )}
          <time className="mt-3 block text-xs text-[#6B7280]">
            {formatHumanTimestamp(item.createdAt)}
            {fresh && justSentLabel(item.createdAt) && (
              <span className="ml-2 text-[#06B6D4]">
                · {justSentLabel(item.createdAt)}
              </span>
            )}
          </time>
        </motion.div>
      </div>
    </motion.li>
  );
}

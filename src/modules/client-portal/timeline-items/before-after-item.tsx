"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { PortalShimmer } from "../portal-shimmer";
import { pulseGlowKeyframes, springTransition } from "../portal-motion";
import type { PortalTimelineItem } from "@/types/portal";
import { TimelineItemShell } from "./timeline-item-shell";

export function BeforeAfterItem({
  item,
  isLatest,
  delay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
}) {
  const { reduced } = useMotionConfig();
  const pair = item.beforeAfter;
  if (!pair) return null;

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      prominent
      visualWeight="hero"
      accentClass="text-[#10B981]"
      icon={<ArrowRight className="size-5" />}
    >
      {item.description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{item.description}</p>
      )}
      <motion.div
        className="mt-3 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: delay + 0.05 }}
      >
        {([pair.before, pair.after] as const).map((side, i) => (
          <motion.div
            key={side.label}
            className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#1F2937]"
            animate={
              isLatest && !reduced && i === 1 ? pulseGlowKeyframes : undefined
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            <PortalShimmer className="size-full">
              <motion.div
                className="size-full"
                style={{ background: side.gradient }}
                whileHover={reduced ? undefined : { scale: 1.02 }}
              />
            </PortalShimmer>
            <span className="absolute left-2 top-2 rounded-md bg-[#0B0F19]/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#F9FAFB]">
              {side.label}
            </span>
          </motion.div>
        ))}
        <span className="flex items-center justify-center text-[#06B6D4]" aria-hidden>
          <ArrowRight className="size-5" />
        </span>
      </motion.div>
    </TimelineItemShell>
  );
}

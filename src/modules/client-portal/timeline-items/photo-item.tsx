"use client";

import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { PortalShimmer } from "../portal-shimmer";
import type { PortalTimelineItem } from "@/types/portal";
import {
  TimelineItemShell,
  type FeedVisualWeight,
} from "./timeline-item-shell";

export function PhotoItem({
  item,
  isLatest,
  delay,
  visualWeight,
  onOpenPhoto,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
  visualWeight?: FeedVisualWeight;
  onOpenPhoto: (photoIndex: number) => void;
}) {
  const { reduced } = useMotionConfig();
  const photos = item.photos ?? [];

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      prominent
      visualWeight={visualWeight}
      accentClass="text-[#3B82F6]"
      icon={<Images className="size-5" />}
    >
      {item.description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{item.description}</p>
      )}
      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => onOpenPhoto(i)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1F2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              whileTap={reduced ? undefined : { scale: 0.97 }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + i * 0.05 }}
            >
              <PortalShimmer className="size-full">
              <motion.div
                className="size-full"
                style={{ background: photo.gradient }}
                whileHover={reduced ? undefined : { scale: 1.03 }}
              >
                <span className="absolute inset-0 flex items-end p-2">
                  <span className="rounded bg-[#0B0F19]/70 px-2 py-0.5 text-[10px] font-medium text-[#F9FAFB]">
                    {photo.label}
                  </span>
                </span>
              </motion.div>
              </PortalShimmer>
            </motion.button>
          ))}
        </div>
      )}
    </TimelineItemShell>
  );
}

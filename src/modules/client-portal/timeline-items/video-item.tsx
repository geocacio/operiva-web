"use client";

import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import { portalGradient } from "../portal-utils";
import { PortalShimmer } from "../portal-shimmer";
import { pulseGlowKeyframes, springTransition } from "../portal-motion";
import type { PortalTimelineItem } from "@/types/portal";
import type { VideoPreviewData } from "../video-player-modal";
import {
  TimelineItemShell,
  type FeedVisualWeight,
} from "./timeline-item-shell";

export function VideoItem({
  item,
  isLatest,
  delay,
  visualWeight,
  onPlay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
  visualWeight?: FeedVisualWeight;
  onPlay: (video: VideoPreviewData) => void;
}) {
  const { reduced } = useMotionConfig();
  const gradient = item.videoGradient ?? portalGradient(item.id);
  const progress = item.videoProgress ?? 0;
  const isHero = visualWeight === "hero";

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      prominent
      visualWeight={visualWeight}
      accentClass="text-[#06B6D4]"
      icon={<Video className="size-5" />}
    >
      {item.description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{item.description}</p>
      )}
      <motion.button
        type="button"
        onClick={() =>
          onPlay({
            title: item.title,
            description: item.description,
            gradient,
            posterLabel: item.videoPosterLabel,
            durationSeconds: item.videoDurationSeconds,
          })
        }
        className={cn(
          "group relative mt-3 w-full overflow-hidden rounded-xl border border-[#1F2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]",
          isHero ? "aspect-[16/10]" : "aspect-video"
        )}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        whileHover={reduced ? undefined : { scale: 1.01 }}
        animate={isLatest && !reduced ? pulseGlowKeyframes : undefined}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <PortalShimmer className="size-full">
          <motion.div className="size-full" style={{ background: gradient }} />
        </PortalShimmer>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/20 to-transparent" />
        {!reduced && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-[#06B6D4]/0 transition-opacity group-hover:opacity-100 group-hover:ring-[#06B6D4]/35"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="flex size-[4.25rem] items-center justify-center rounded-full border border-white/35 bg-white/12 text-white shadow-2xl backdrop-blur-lg group-hover:bg-white/18"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            transition={springTransition}
          >
            <Play className="ml-1 size-8" />
          </motion.span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1F2937]/80">
          <motion.div
            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        {item.videoDurationSeconds && (
          <span className="absolute bottom-3 right-2 rounded-md bg-black/65 px-2 py-0.5 text-xs text-white">
            {item.videoDurationSeconds}s
          </span>
        )}
        {item.videoPosterLabel && (
          <span className="absolute bottom-3 left-2 max-w-[70%] truncate rounded bg-[#0B0F19]/80 px-2 py-0.5 text-[10px] text-[#F9FAFB] backdrop-blur-sm">
            {item.videoPosterLabel}
          </span>
        )}
      </motion.button>
    </TimelineItemShell>
  );
}

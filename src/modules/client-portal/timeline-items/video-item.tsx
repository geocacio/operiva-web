"use client";

import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { portalGradient } from "../portal-utils";
import type { PortalTimelineItem } from "@/types/portal";
import type { VideoPreviewData } from "../video-player-modal";
import { TimelineItemShell } from "./timeline-item-shell";

export function VideoItem({
  item,
  isLatest,
  delay,
  onPlay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
  onPlay: (video: VideoPreviewData) => void;
}) {
  const { reduced } = useMotionConfig();
  const gradient = item.videoGradient ?? portalGradient(item.id);

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
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
        className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-[#1F2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        <div className="size-full" style={{ background: gradient }} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex size-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md">
            <Play className="ml-1 size-7" />
          </span>
        </div>
        {item.videoDurationSeconds && (
          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
            {item.videoDurationSeconds}s
          </span>
        )}
        {item.videoPosterLabel && (
          <span className="absolute bottom-2 left-2 max-w-[70%] truncate rounded bg-[#0B0F19]/70 px-2 py-0.5 text-[10px] text-[#F9FAFB]">
            {item.videoPosterLabel}
          </span>
        )}
      </motion.button>
    </TimelineItemShell>
  );
}

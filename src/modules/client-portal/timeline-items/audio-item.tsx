"use client";

import { Mic } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { PortalTimelineItem } from "@/types/portal";
import { AudioPlayer } from "../audio-player";
import { TimelineItemShell } from "./timeline-item-shell";

export function AudioItem({
  item,
  isLatest,
  delay,
  activeAudioId,
  onAudioPlay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
  activeAudioId: string | null;
  onAudioPlay: (id: string) => void;
}) {
  const { reduced } = useMotionConfig();

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      accentClass="text-[#06B6D4]"
      icon={<Mic className="size-5" />}
    >
      {item.description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{item.description}</p>
      )}
      <div className="mt-3">
        <AudioPlayer
          title={item.title}
          authorName={item.authorName}
          durationSeconds={item.audioDurationSeconds ?? 30}
          isActive={activeAudioId === item.id}
          onPlayToggle={() => onAudioPlay(item.id)}
        />
      </div>
    </TimelineItemShell>
  );
}

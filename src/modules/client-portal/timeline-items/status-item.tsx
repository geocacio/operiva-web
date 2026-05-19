"use client";

import { CheckCircle2, CircleDot } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { PortalTimelineItem } from "@/types/portal";
import {
  TimelineItemShell,
  type FeedVisualWeight,
} from "./timeline-item-shell";

const toneIcon = {
  neutral: CircleDot,
  info: CircleDot,
  success: CheckCircle2,
  warning: CircleDot,
};

const toneClass = {
  neutral: "text-[#9CA3AF]",
  info: "text-[#3B82F6]",
  success: "text-[#10B981]",
  warning: "text-[#F59E0B]",
};

export function StatusItem({
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
  const tone = item.statusTone ?? "neutral";
  const Icon = toneIcon[tone];

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      prominent={item.type === "etapa"}
      visualWeight={visualWeight}
      accentClass={toneClass[tone]}
      icon={<Icon className={cn("size-5", toneClass[tone])} />}
    >
      {item.description && (
        <p className="mt-1 text-sm leading-relaxed text-[#9CA3AF]">
          {item.description}
        </p>
      )}
    </TimelineItemShell>
  );
}

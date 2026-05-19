"use client";

import { MessageCircle } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { PortalTimelineItem } from "@/types/portal";
import { TimelineItemShell } from "./timeline-item-shell";

export function MessageItem({
  item,
  isLatest,
  delay,
}: {
  item: PortalTimelineItem;
  isLatest?: boolean;
  delay: number;
}) {
  const { reduced } = useMotionConfig();

  return (
    <TimelineItemShell
      item={item}
      isLatest={isLatest}
      delay={delay}
      reduced={reduced}
      accentClass="text-[#3B82F6]"
      icon={<MessageCircle className="size-5" />}
    >
      {item.description && (
        <p className="mt-2 rounded-xl rounded-tl-sm border border-[#1F2937] bg-[#0B0F19]/80 px-3 py-2 text-sm leading-relaxed text-[#F9FAFB]">
          {item.description}
        </p>
      )}
    </TimelineItemShell>
  );
}

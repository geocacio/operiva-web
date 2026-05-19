"use client";

import { Shield } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { PortalTimelineItem } from "@/types/portal";
import { TimelineItemShell } from "./timeline-item-shell";

export function ApprovalItem({
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
      accentClass="text-[#F59E0B]"
      icon={<Shield className="size-5" />}
    >
      {item.description && (
        <p className="mt-1 text-sm text-[#9CA3AF]">{item.description}</p>
      )}
      <p className="mt-2 rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/10 px-3 py-2 text-xs text-[#F59E0B]">
        Use o painel de aprovação abaixo para confirmar ou pedir ajuste.
      </p>
    </TimelineItemShell>
  );
}

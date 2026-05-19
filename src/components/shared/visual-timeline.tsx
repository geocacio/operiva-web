"use client";

import {
  Camera,
  CheckCircle2,
  GitBranch,
  MessageSquare,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types";

const typeIcons = {
  etapa: GitBranch,
  foto: Camera,
  comentario: MessageSquare,
  status: CheckCircle2,
  aprovacao: Shield,
};

const typeColors = {
  etapa: "text-sky-400 bg-sky-500/10",
  foto: "text-violet-400 bg-violet-500/10",
  comentario: "text-amber-400 bg-amber-500/10",
  status: "text-emerald-400 bg-emerald-500/10",
  aprovacao: "text-indigo-400 bg-indigo-500/10",
};

export function VisualTimeline({
  events,
  limit,
  compact = false,
}: {
  events: TimelineEvent[];
  limit?: number;
  compact?: boolean;
}) {
  const { reduced, stagger } = useMotionConfig();
  const list = limit ? events.slice(0, limit) : events;

  return (
    <GlassCard className={cn("p-5", compact && "p-4")}>
      <ul className="relative space-y-0">
        {list.map((event, i) => {
          const Icon = typeIcons[event.type];
          const isLast = i === list.length - 1;

          return (
            <motion.li
              key={event.id}
              className="relative flex gap-4 pb-6 last:pb-0"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * stagger }}
            >
              {!isLast && (
                <span
                  className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-white/15 to-transparent"
                  aria-hidden
                />
              )}
              <div
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg",
                  typeColors[event.type]
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{event.serviceTitle}</span>
                  <span>·</span>
                  <span>{event.userName}</span>
                  <span>·</span>
                  <span>{formatRelative(event.createdAt)}</span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </GlassCard>
  );
}

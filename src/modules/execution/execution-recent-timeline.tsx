"use client";

import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Mic,
  Shield,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ExecutionEvent, ExecutionEventType } from "@/types/execution";

const typeConfig: Record<
  ExecutionEventType,
  { icon: typeof Camera; className: string }
> = {
  etapa: { icon: CheckCircle2, className: "text-[#10B981]" },
  foto: { icon: Camera, className: "text-[#3B82F6]" },
  video: { icon: Video, className: "text-[#06B6D4]" },
  audio: { icon: Mic, className: "text-[#06B6D4]" },
  status: { icon: CheckCircle2, className: "text-[#9CA3AF]" },
  comentario: { icon: CheckCircle2, className: "text-[#9CA3AF]" },
  problema: { icon: AlertTriangle, className: "text-[#EF4444]" },
  aprovacao: { icon: Shield, className: "text-[#F59E0B]" },
  pausa: { icon: AlertTriangle, className: "text-[#F59E0B]" },
};

const MAX_EVENTS = 4;

export function ExecutionRecentTimeline({ events }: { events: ExecutionEvent[] }) {
  const { reduced } = useMotionConfig();
  const recent = events.slice(0, MAX_EVENTS);

  if (recent.length === 0) return null;

  return (
    <section className="mx-4 mt-6">
      <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
        Atividade recente
      </h2>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {recent.map((event, i) => {
            const cfg = typeConfig[event.type];
            const Icon = cfg.icon;

            return (
              <motion.li
                key={event.id}
                layout
                className="flex items-center gap-3 rounded-xl border border-[#1F2937] bg-[#111827]/60 px-3 py-2.5"
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Icon className={cn("size-4 shrink-0", cfg.className)} />
                <motion.div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#F9FAFB]">{event.title}</p>
                  {event.description && (
                    <p className="truncate text-xs text-[#9CA3AF]">
                      {event.description}
                    </p>
                  )}
                </motion.div>
                <time className="shrink-0 text-[10px] text-[#6B7280]">
                  {formatRelative(event.createdAt)}
                </time>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
}

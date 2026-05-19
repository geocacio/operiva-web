"use client";

import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  MessageSquare,
  PauseCircle,
  Shield,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ExecutionEvent, ExecutionEventType } from "@/types/execution";

const typeConfig: Record<
  ExecutionEventType,
  { icon: typeof Camera; className: string }
> = {
  etapa: { icon: CheckCircle2, className: "text-[#10B981] bg-[#10B981]/10" },
  foto: { icon: Camera, className: "text-[#3B82F6] bg-[#3B82F6]/10" },
  video: { icon: Video, className: "text-[#06B6D4] bg-[#06B6D4]/10" },
  audio: { icon: Video, className: "text-[#06B6D4] bg-[#06B6D4]/10" },
  status: { icon: CheckCircle2, className: "text-[#06B6D4] bg-[#06B6D4]/10" },
  comentario: {
    icon: MessageSquare,
    className: "text-[#9CA3AF] bg-[#1F2937]",
  },
  problema: {
    icon: AlertTriangle,
    className: "text-[#EF4444] bg-[#EF4444]/10",
  },
  aprovacao: { icon: Shield, className: "text-[#F59E0B] bg-[#F59E0B]/10" },
  pausa: { icon: PauseCircle, className: "text-[#F59E0B] bg-[#F59E0B]/10" },
};

export function ExecutionTimeline({ events }: { events: ExecutionEvent[] }) {
  const { reduced, stagger } = useMotionConfig();

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-[#F9FAFB]">
        Histórico do serviço
      </h2>
      <GlassCard className="border-[#1F2937] bg-[#111827]/60 p-4">
        <ul className="relative space-y-0">
          <AnimatePresence initial={false}>
            {events.map((event, i) => {
              const cfg = typeConfig[event.type];
              const Icon = cfg.icon;
              const isLast = i === events.length - 1;

              return (
                <motion.li
                  key={event.id}
                  layout
                  className="relative flex gap-3 pb-5 last:pb-0"
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: Math.min(i, 4) * stagger }}
                >
                  {!isLast && (
                    <span
                      className="absolute left-[15px] top-8 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-[#1F2937] to-transparent"
                      aria-hidden
                    />
                  )}
                  <motion.div
                    className={cn(
                      "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg",
                      cfg.className
                    )}
                    layout
                  >
                    <Icon className="size-4" />
                  </motion.div>
                  <motion.div className="min-w-0 flex-1 pt-0.5" layout>
                    <p className="text-sm font-medium text-[#F9FAFB]">
                      {event.title}
                    </p>
                    {event.description && (
                      <p className="mt-0.5 text-xs text-[#9CA3AF] line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <time className="mt-1 block text-[11px] text-[#6B7280]">
                      {formatDateTime(event.createdAt)}
                    </time>
                  </motion.div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </GlassCard>
    </section>
  );
}

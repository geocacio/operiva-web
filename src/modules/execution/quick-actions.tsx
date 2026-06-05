"use client";

import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  PauseCircle,
  ShieldCheck,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "complete",
    label: "Concluir trabalho",
    icon: CheckCircle2,
    color: "bg-[#10B981] hover:bg-[#059669]",
    text: "text-white",
  },
  {
    id: "photo",
    label: "Adicionar foto",
    icon: Camera,
    color: "bg-[#3B82F6] hover:bg-[#2563EB]",
    text: "text-white",
  },
  {
    id: "video",
    label: "Adicionar vídeo",
    icon: Video,
    color: "bg-[#1F2937] hover:bg-[#374151] border border-[#374151]",
    text: "text-[#F9FAFB]",
  },
  {
    id: "approval",
    label: "Solicitar aprovação",
    icon: ShieldCheck,
    color: "bg-[#F59E0B] hover:bg-[#D97706]",
    text: "text-[#0B0F19]",
  },
  {
    id: "problem",
    label: "Reportar problema",
    icon: AlertTriangle,
    color: "bg-[#EF4444]/15 hover:bg-[#EF4444]/25 border border-[#EF4444]/30",
    text: "text-[#FCA5A5]",
  },
  {
    id: "pause",
    label: "Pausar serviço",
    icon: PauseCircle,
    color: "bg-[#1F2937] hover:bg-[#374151] border border-[#374151]",
    text: "text-[#9CA3AF]",
  },
] as const;

export type QuickActionId = (typeof actions)[number]["id"];

export function QuickActions({
  paused,
  onAction,
}: {
  paused: boolean;
  onAction: (id: QuickActionId) => void;
}) {
  const { reduced, stagger } = useMotionConfig();

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-[#F9FAFB]">Ações rápidas</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          const disabled = paused && action.id !== "pause";

          return (
            <motion.button
              key={action.id}
              type="button"
              disabled={disabled}
              onClick={() => onAction(action.id)}
              className={cn(
                "flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 text-center transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
                action.color,
                action.text
              )}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * stagger }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
            >
              <Icon className="size-6" strokeWidth={1.75} />
              <span className="text-xs font-medium leading-tight sm:text-sm">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

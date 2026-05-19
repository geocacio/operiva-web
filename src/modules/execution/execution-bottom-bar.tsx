"use client";

import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Mic,
  ShieldCheck,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export type BottomActionId =
  | "photo"
  | "video"
  | "audio"
  | "complete"
  | "problem"
  | "approval";

const actions: {
  id: BottomActionId;
  label: string;
  icon: typeof Camera;
  variant: "primary" | "success" | "danger" | "muted" | "warning";
}[] = [
  { id: "photo", label: "Foto", icon: Camera, variant: "primary" },
  { id: "video", label: "Vídeo", icon: Video, variant: "muted" },
  { id: "audio", label: "Áudio", icon: Mic, variant: "muted" },
  { id: "complete", label: "Concluir", icon: CheckCircle2, variant: "success" },
  { id: "problem", label: "Problema", icon: AlertTriangle, variant: "danger" },
  { id: "approval", label: "Aprovar", icon: ShieldCheck, variant: "warning" },
];

const variantClass: Record<(typeof actions)[number]["variant"], string> = {
  primary: "bg-[#3B82F6] text-white active:bg-[#2563EB]",
  success: "bg-[#10B981] text-white active:bg-[#059669]",
  danger: "bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/30",
  muted: "bg-[#1F2937] text-[#F9FAFB] border border-[#374151]",
  warning: "bg-[#F59E0B] text-[#0B0F19]",
};

export function ExecutionBottomBar({
  paused,
  onAction,
}: {
  paused: boolean;
  onAction: (id: BottomActionId) => void;
}) {
  const { reduced } = useMotionConfig();

  return (
    <motion.nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1F2937] bg-[#0B0F19]/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md"
      initial={reduced ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <motion.div className="mx-auto grid max-w-lg grid-cols-3 gap-2 sm:grid-cols-6">
        {actions.map((action) => {
          const Icon = action.icon;
          const disabled = paused && action.id !== "problem";

          return (
            <motion.button
              key={action.id}
              type="button"
              disabled={disabled}
              onClick={() => onAction(action.id)}
              className={cn(
                "flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition-transform active:scale-95 disabled:opacity-40",
                variantClass[action.variant]
              )}
              whileTap={reduced ? undefined : { scale: 0.96 }}
            >
              <Icon className="size-5" strokeWidth={2} />
              <span className="text-[10px] font-medium leading-none sm:text-xs">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

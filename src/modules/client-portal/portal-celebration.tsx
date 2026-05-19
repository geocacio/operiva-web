"use client";

import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import { cinematicEase, springTransition } from "./portal-motion";

const VARIANTS = {
  success: {
    emoji: "🎉",
    label: "Etapa finalizada com sucesso",
    border: "border-[#10B981]/35",
    glow: "bg-[#10B981]/20",
    text: "text-[#10B981]",
  },
  thanks: {
    emoji: "✅",
    label: "Obrigado pela aprovação",
    border: "border-[#3B82F6]/35",
    glow: "bg-[#3B82F6]/20",
    text: "text-[#3B82F6]",
  },
  update: {
    emoji: "✨",
    label: "Nova atualização da equipe",
    border: "border-[#06B6D4]/35",
    glow: "bg-[#06B6D4]/20",
    text: "text-[#06B6D4]",
  },
  advance: {
    emoji: "🚀",
    label: "Seu projeto avançou para a próxima etapa",
    border: "border-[#F59E0B]/35",
    glow: "bg-[#F59E0B]/20",
    text: "text-[#F59E0B]",
  },
} as const;

export type CelebrationVariant = keyof typeof VARIANTS;

export function PortalCelebration({
  variant,
  title,
  description,
  className,
}: {
  variant: CelebrationVariant;
  title?: string;
  description?: string;
  className?: string;
}) {
  const { reduced } = useMotionConfig();
  const style = VARIANTS[variant];

  return (
    <motion.div
      role="status"
      className={cn(
        "relative overflow-hidden rounded-xl border px-3 py-2 backdrop-blur-md",
        style.border,
        className
      )}
      initial={reduced ? false : { opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
      transition={springTransition}
    >
      {!reduced && (
        <motion.span
          className={cn(
            "pointer-events-none absolute -right-4 -top-4 size-16 rounded-full blur-xl",
            style.glow
          )}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden
        />
      )}
      <p className={cn("relative text-xs font-semibold", style.text)}>
        <span className="mr-1.5" aria-hidden>
          {style.emoji}
        </span>
        {title ?? style.label}
      </p>
      {description && (
        <p className="relative mt-0.5 text-[11px] text-[#9CA3AF]">{description}</p>
      )}
    </motion.div>
  );
}

export function PortalCelebrationToast({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  const { reduced } = useMotionConfig();

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-[60] w-[min(92vw,22rem)] -translate-x-1/2"
      initial={reduced ? false : { opacity: 0, y: -12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.35, ease: cinematicEase }}
    >
      <PortalCelebration
        variant="update"
        title={message}
        className="shadow-xl shadow-[#06B6D4]/10"
      />
    </motion.div>
  );
}

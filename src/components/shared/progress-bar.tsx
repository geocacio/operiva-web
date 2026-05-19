"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/hooks/use-motion";

export function ProgressBar({
  value,
  className,
  barClassName,
  showLabel = true,
}: {
  value: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}) {
  const { reduced } = useMotionConfig();
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <motion.div
      className={cn("space-y-1.5", className)}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progresso</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400",
            barClassName
          )}
          initial={reduced ? { width: `${clamped}%` } : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

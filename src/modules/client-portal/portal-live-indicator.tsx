"use client";

import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export function PortalLiveIndicator({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { reduced } = useMotionConfig();
  const dot = size === "md" ? "size-2.5" : "size-2";

  return (
    <span className={cn("relative inline-flex", dot, className)} aria-hidden>
      {!reduced && (
        <motion.span
          className={cn(
            "absolute inline-flex rounded-full bg-[#10B981]",
            dot
          )}
          animate={{ scale: [1, 2], opacity: [0.65, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {!reduced && (
        <motion.span
          className={cn(
            "absolute inline-flex rounded-full bg-[#10B981]/50",
            dot
          )}
          animate={{ scale: [1, 1.5], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span
        className={cn(
          "relative inline-flex rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]",
          dot
        )}
      />
    </span>
  );
}

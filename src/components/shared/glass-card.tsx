"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/hooks/use-motion";

export function GlassCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const { reduced, fade } = useMotionConfig();

  if (reduced) {
    return (
      <motion.div className={cn("operiva-glass rounded-xl", className)}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("operiva-glass rounded-xl", className)}
      initial={fade.initial}
      animate={fade.animate}
      transition={{ ...fade.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

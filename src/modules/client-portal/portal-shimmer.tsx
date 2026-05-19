"use client";

import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import { shimmerSweep } from "./portal-motion";

export function PortalShimmer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { reduced } = useMotionConfig();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ translateX: shimmerSweep.translateX }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

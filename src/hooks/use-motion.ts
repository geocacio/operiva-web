"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionConfig() {
  const reduced = useReducedMotion();

  return {
    reduced,
    fade: reduced
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
        },
    stagger: reduced ? 0 : 0.06,
    spring: reduced
      ? { type: "tween" as const, duration: 0 }
      : { type: "spring" as const, stiffness: 260, damping: 24 },
  };
}

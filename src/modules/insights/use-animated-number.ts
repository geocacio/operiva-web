"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useAnimatedNumber(
  target: number,
  durationMs = 900,
  decimals = 0
): string {
  const reduced = useReducedMotion() ?? false;
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let frame: number;
    const from = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, reduced]);

  return value.toFixed(decimals).replace(".", ",");
}

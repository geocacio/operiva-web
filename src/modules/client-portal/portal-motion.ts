/** Shared cinematic motion tokens for the client portal */

export const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: cinematicEase },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: springTransition,
};

export const breathingKeyframes = {
  opacity: [0.65, 1, 0.65] as number[],
  scale: [1, 1.04, 1] as number[],
};

export const breathingTransition = {
  duration: 2.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export const floatKeyframes = {
  y: [0, -6, 0] as number[],
  opacity: [0.4, 0.7, 0.4] as number[],
};

export const floatTransition = {
  duration: 4.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export const pulseGlowKeyframes = {
  boxShadow: [
    "0 0 0 0 rgba(59,130,246,0)",
    "0 0 28px 0 rgba(59,130,246,0.14)",
    "0 0 0 0 rgba(59,130,246,0)",
  ] as string[],
};

export const shimmerSweep = {
  translateX: ["-100%", "200%"] as string[],
};

export const staggerItem = (index: number, reduced: boolean, base = 0.06) =>
  reduced ? 0 : Math.min(index, 12) * base;

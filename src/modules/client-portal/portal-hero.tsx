"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Building2, User } from "lucide-react";
import { useRef } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { ClientPortalData } from "@/types/portal";
import { PortalLiveIndicator } from "./portal-live-indicator";
import { PortalShimmer } from "./portal-shimmer";
import { breathingKeyframes, breathingTransition, cinematicEase } from "./portal-motion";
import {
  formatLiveActivityLabel,
  formatLiveUpdateLabel,
  getEmotionalHeroMessage,
  SERVICE_HERO_THEMES,
} from "./portal-utils";

const PARTICLES = [
  { left: "12%", top: "18%", size: 4, delay: 0 },
  { left: "78%", top: "28%", size: 3, delay: 0.4 },
  { left: "55%", top: "12%", size: 5, delay: 0.8 },
  { left: "32%", top: "42%", size: 2, delay: 1.2 },
  { left: "88%", top: "55%", size: 3, delay: 0.6 },
];

export function PortalHero({ portal }: { portal: ClientPortalData }) {
  const { reduced } = useMotionConfig();
  const emotional = getEmotionalHeroMessage(portal);
  const theme =
    SERVICE_HERO_THEMES[portal.serviceTheme ?? "default"] ??
    SERVICE_HERO_THEMES.default;
  const teamActive =
    portal.teamActive ?? portal.currentJourneyStep === "em_execucao";
  const liveActivity = formatLiveActivityLabel(portal.liveActivity);

  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 48]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const ambientX = useTransform(mouseX, (v) => (reduced ? 0 : v * -0.5));
  const iconY = useTransform(mouseY, (v) => (reduced ? 0 : v * 0.3));

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * 8);
  };

  return (
    <header ref={ref} className="relative" onMouseMove={onMouseMove}>
      <div className="relative h-[min(52dvh,22rem)] overflow-hidden sm:h-56 md:h-60">
        <motion.div
          className="absolute inset-[-8%]"
          style={{
            background: theme.gradient,
            y: parallaxY,
            scale: bgScale,
            x: reduced ? 0 : mouseX,
          }}
          initial={reduced ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: cinematicEase }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: theme.ambient, x: ambientX }}
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/25 via-[#0B0F19]/10 to-[#0B0F19]"
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/55 to-transparent"
          aria-hidden
        />

        {!reduced && (
          <>
            <motion.div
              className="pointer-events-none absolute -left-8 top-1/4 h-32 w-48 rotate-[-12deg] rounded-full bg-[#F59E0B]/25 blur-3xl"
              animate={{ opacity: [0.15, 0.4, 0.15], x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="pointer-events-none absolute -right-4 bottom-1/4 h-28 w-40 rotate-[8deg] rounded-full bg-[#06B6D4]/20 blur-3xl"
              animate={{ opacity: [0.1, 0.35, 0.1], x: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            />
            {PARTICLES.map((p) => (
              <motion.span
                key={`${p.left}-${p.top}`}
                className="pointer-events-none absolute rounded-full bg-[#F9FAFB]/25"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.55, 0.2],
                }}
                transition={{
                  duration: 3.5 + p.delay,
                  repeat: Infinity,
                  delay: p.delay,
                }}
                aria-hidden
              />
            ))}
          </>
        )}

        <PortalShimmer className="absolute inset-0">
          <motion.div
            className="flex h-full flex-col items-center justify-center px-6 pt-8"
            style={{ y: iconY }}
          >
            <motion.span
              className="text-6xl drop-shadow-2xl sm:text-7xl"
              role="img"
              aria-hidden
              animate={reduced ? undefined : breathingKeyframes}
              transition={breathingTransition}
            >
              {theme.icon}
            </motion.span>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-[#F9FAFB]/75">
              {theme.label}
            </p>
          </motion.div>
        </PortalShimmer>

        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0F19] to-transparent px-5 pb-3 pt-16"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ease: cinematicEase }}
        >
          <h1 className="text-xl font-bold leading-tight text-[#F9FAFB] sm:text-2xl">
            {portal.serviceTitle}
          </h1>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 -mt-2 px-5"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: cinematicEase }}
      >
        <div className="rounded-2xl border border-[#1F2937]/70 bg-[#111827]/75 p-4 shadow-2xl shadow-[#0B0F19]/60 backdrop-blur-xl">
          <p className="text-base font-semibold leading-snug text-[#F9FAFB] sm:text-lg">
            {emotional.emoji && (
              <span className="mr-1.5" aria-hidden>
                {emotional.emoji}
              </span>
            )}
            {emotional.headline}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#9CA3AF]">
            {emotional.subline ?? portal.statusLabel}
          </p>

          <motion.div
            className="mt-4 flex flex-col gap-2 border-t border-[#1F2937]/60 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {teamActive && (
              <motion.span
                className="inline-flex items-center gap-2 text-xs font-medium text-[#10B981]"
                animate={reduced ? undefined : breathingKeyframes}
                transition={breathingTransition}
              >
                <PortalLiveIndicator size="sm" />
                <span aria-hidden>🟢</span>
                Equipe ativa neste momento
              </motion.span>
            )}
            <span className="text-xs text-[#9CA3AF]">
              {formatLiveUpdateLabel(portal.lastUpdate)}
            </span>
          </motion.div>

          {liveActivity && (
            <motion.p
              className="mt-2 text-xs text-[#06B6D4]"
              initial={reduced ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <span className="font-medium">{liveActivity}</span>
            </motion.p>
          )}

          <motion.div
            className="mt-3 flex flex-wrap gap-2"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2937]/80 bg-[#0B0F19]/50 px-2.5 py-1 text-[11px] text-[#9CA3AF] backdrop-blur-sm">
              <Building2 className="size-3 text-[#3B82F6]" />
              {portal.companyName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2937]/80 bg-[#0B0F19]/50 px-2.5 py-1 text-[11px] text-[#9CA3AF] backdrop-blur-sm">
              <User className="size-3 text-[#10B981]" />
              {portal.responsibleName}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}

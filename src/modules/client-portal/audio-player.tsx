"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import { breathingKeyframes, breathingTransition, springTransition } from "./portal-motion";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function authorInitials(name?: string) {
  if (!name) return "EQ";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function AudioPlayer({
  durationSeconds = 30,
  title,
  authorName,
  isActive,
  onPlayToggle,
}: {
  durationSeconds?: number;
  title: string;
  authorName?: string;
  isActive: boolean;
  onPlayToggle: () => void;
}) {
  const { reduced } = useMotionConfig();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const bars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => 0.15 + ((i * 11 + 7) % 19) / 22),
    []
  );

  useEffect(() => {
    if (!isActive && playing) {
      setPlaying(false);
      setProgress(0);
    }
  }, [isActive, playing]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          setPlaying(false);
          return 0;
        }
        return p + 1 / (durationSeconds * 10);
      });
    }, 100);
    return () => clearInterval(id);
  }, [playing, durationSeconds, reduced]);

  const toggle = () => {
    onPlayToggle();
    setPlaying((v) => !v);
    if (playing) setProgress(0);
  };

  const elapsed = Math.floor(progress * durationSeconds);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 backdrop-blur-md transition-shadow",
        playing
          ? "border-[#06B6D4]/45 bg-[#0B0F19]/90 shadow-xl shadow-[#06B6D4]/20"
          : "border-[#1F2937]/80 bg-[#0B0F19]/65"
      )}
      layout={!reduced}
      animate={
        playing && !reduced
          ? {
              boxShadow: [
                "0 0 0 0 rgba(6,182,212,0)",
                "0 0 32px 0 rgba(6,182,212,0.18)",
                "0 0 0 0 rgba(6,182,212,0)",
              ],
            }
          : undefined
      }
      transition={{ duration: 2.2, repeat: Infinity }}
    >
      {!reduced && playing && (
        <motion.div
          className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[#06B6D4]/20 blur-2xl"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden
        />
      )}

      <div className="relative flex items-start gap-3">
        <motion.div
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] text-sm font-bold text-white shadow-lg shadow-[#06B6D4]/25"
          animate={playing && !reduced ? breathingKeyframes : undefined}
          transition={breathingTransition}
          aria-hidden
        >
          {authorInitials(authorName)}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[#9CA3AF]">
            {authorName
              ? `${authorName} gravou para você`
              : "Mensagem da equipe"}
          </p>
          <p className="mt-0.5 text-sm font-medium text-[#F9FAFB]">{title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#6B7280]">
            Tem uma pessoa cuidando disso — ouça quando quiser.
          </p>
        </div>
      </div>

      <motion.div
        className="relative mt-4 h-1 overflow-hidden rounded-full bg-[#1F2937]"
        aria-hidden
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
          style={{ width: `${Math.round(progress * 100)}%` }}
          layout={!reduced}
        />
      </motion.div>

      <motion.div className="relative mt-4 flex items-center gap-3">
        <motion.button
          type="button"
          onClick={toggle}
          className={cn(
            "flex size-[3.75rem] shrink-0 items-center justify-center rounded-full transition-colors",
            playing
              ? "bg-[#06B6D4] text-[#0B0F19] shadow-xl shadow-[#06B6D4]/35"
              : "bg-[#1F2937] text-[#06B6D4] hover:bg-[#374151]"
          )}
          whileTap={reduced ? undefined : { scale: 0.92 }}
          animate={
            playing && !reduced ? { scale: [1, 1.06, 1] } : { scale: 1 }
          }
          transition={springTransition}
          aria-label={playing ? "Pausar áudio" : "Reproduzir áudio"}
        >
          {playing ? (
            <Pause className="size-7" />
          ) : (
            <Play className="ml-0.5 size-7" />
          )}
        </motion.button>

        <div className="min-w-0 flex-1">
          <motion.div
            className="flex h-14 items-end justify-center gap-[2px]"
            aria-hidden
          >
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className={cn(
                  "w-[2.5px] rounded-full",
                  playing ? "bg-[#06B6D4]" : "bg-[#374151]"
                )}
                style={{ originY: 1 }}
                animate={
                  playing && !reduced
                    ? {
                        scaleY: [
                          h,
                          Math.min(1, h + 0.55),
                          h * 0.6,
                          h + 0.3,
                          h,
                        ],
                      }
                    : { scaleY: h * 0.4 }
                }
                transition={
                  playing && !reduced
                    ? {
                        duration: 0.65 + (i % 8) * 0.07,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.2 }
                }
              />
            ))}
          </motion.div>
          <p className="mt-1.5 text-right text-xs tabular-nums text-[#9CA3AF]">
            {formatDuration(elapsed)}{" "}
            <span className="text-[#6B7280]">
              / {formatDuration(durationSeconds)}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

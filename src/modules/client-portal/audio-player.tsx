"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
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
      Array.from({ length: 32 }, (_, i) => 0.25 + ((i * 17) % 13) / 18),
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
      className="rounded-xl border border-[#1F2937]/80 bg-[#0B0F19]/60 p-3"
      layout={!reduced}
    >
      <motion.button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-3 text-left"
        whileTap={reduced ? undefined : { scale: 0.98 }}
        aria-label={playing ? "Pausar áudio" : "Reproduzir áudio"}
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
            playing
              ? "bg-[#06B6D4] text-[#0B0F19]"
              : "bg-[#1F2937] text-[#06B6D4]"
          )}
        >
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#F9FAFB]">{title}</p>
          {authorName && (
            <p className="text-xs text-[#9CA3AF]">{authorName}</p>
          )}
        </div>
        <span className="shrink-0 text-xs tabular-nums text-[#9CA3AF]">
          {formatDuration(elapsed)} / {formatDuration(durationSeconds)}
        </span>
      </motion.button>

      <motion.div
        className="mt-3 flex h-10 items-end justify-center gap-[3px] px-1"
        aria-hidden
      >
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-[#06B6D4]/80"
            style={{ originY: 1 }}
            animate={
              playing && !reduced
                ? {
                    scaleY: [h, Math.min(1, h + 0.45), h * 0.7, h + 0.2, h],
                  }
                : { scaleY: h * 0.6 }
            }
            transition={
              playing && !reduced
                ? {
                    duration: 0.8 + (i % 5) * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.2 }
            }
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

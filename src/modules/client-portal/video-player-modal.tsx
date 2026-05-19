"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import { cinematicEase, springTransition } from "./portal-motion";
import { PortalShimmer } from "./portal-shimmer";

export interface VideoPreviewData {
  title: string;
  description?: string;
  gradient: string;
  posterLabel?: string;
  durationSeconds?: number;
}

export function VideoPlayerModal({
  video,
  open,
  onClose,
}: {
  video: VideoPreviewData | null;
  open: boolean;
  onClose: () => void;
}) {
  const { reduced } = useMotionConfig();
  const [playing, setPlaying] = useState(false);
  const [mockProgress, setMockProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setMockProgress(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = setInterval(() => {
      setMockProgress((p) => (p >= 1 ? 0 : p + 0.02));
    }, 200);
    return () => clearInterval(id);
  }, [playing, reduced]);

  return (
    <AnimatePresence>
      {open && video && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B0F19]/96 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: cinematicEase }}
          role="dialog"
          aria-modal
          aria-label="Reprodutor de vídeo"
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 rounded-full border border-[#1F2937] bg-[#111827]/90 p-2.5 text-[#F9FAFB] shadow-lg backdrop-blur-md"
            aria-label="Fechar"
            whileTap={reduced ? undefined : { scale: 0.94 }}
          >
            <X className="size-5" />
          </motion.button>

          <motion.div
            className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-[#1F2937]/80 bg-[#111827]/95 shadow-2xl shadow-[#06B6D4]/10 backdrop-blur-xl sm:rounded-2xl"
            initial={reduced ? false : { scale: 0.92, y: 48, opacity: 0.8 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={
              reduced
                ? undefined
                : { scale: 0.94, y: 32, opacity: 0 }
            }
            transition={springTransition}
          >
            <PortalShimmer className="relative aspect-video w-full overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ background: video.gradient }}
                animate={
                  playing && !reduced ? { scale: [1, 1.03, 1] } : { scale: 1 }
                }
                transition={{ duration: 4, repeat: Infinity }}
              />
              {playing && !reduced && (
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  animate={{ opacity: [0.08, 0.22, 0.08] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/70 via-transparent to-[#0B0F19]/20" />
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                {!playing && (
                  <>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#F9FAFB]/70">
                      Do seu serviço
                    </p>
                    {video.posterLabel && (
                      <p className="mt-2 text-lg font-semibold text-[#F9FAFB]">
                        {video.posterLabel}
                      </p>
                    )}
                  </>
                )}
                {playing && (
                  <motion.p
                    className="text-sm text-[#F9FAFB]/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Reprodução simulada — registro em campo
                  </motion.p>
                )}
              </motion.div>
              <motion.button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className={cn(
                  "absolute left-1/2 top-1/2 flex size-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-lg",
                  !reduced && "hover:scale-105 active:scale-95",
                  playing && "shadow-xl shadow-[#06B6D4]/35"
                )}
                whileTap={reduced ? undefined : { scale: 0.94 }}
                transition={springTransition}
                aria-label={playing ? "Pausar" : "Reproduzir"}
              >
                {playing ? (
                  <Pause className="size-8" />
                ) : (
                  <Play className="ml-1 size-8" />
                )}
              </motion.button>
              {video.durationSeconds && !playing && (
                <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  {video.durationSeconds}s
                </span>
              )}
              <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1F2937]/80">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                  style={{ width: `${mockProgress * 100}%` }}
                />
              </motion.div>
            </PortalShimmer>

            <div className="border-t border-[#1F2937]/60 p-5">
              <h3 className="text-lg font-semibold text-[#F9FAFB]">
                {video.title}
              </h3>
              {video.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-[#9CA3AF]">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (!open) setPlaying(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && video && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-label="Reprodutor de vídeo"
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-[#111827]/90 p-2 text-[#F9FAFB]"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </motion.button>

          <motion.div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] shadow-2xl"
            initial={reduced ? false : { scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduced ? undefined : { scale: 0.94, opacity: 0 }}
          >
            <div
              className="relative aspect-video w-full"
              style={{ background: video.gradient }}
            >
              {playing && !reduced && (
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                {!playing && (
                  <>
                    <p className="text-xs uppercase tracking-widest text-[#F9FAFB]/70">
                      Prévia do serviço
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
                    className="text-sm text-[#F9FAFB]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Reprodução simulada — vídeo em campo
                  </motion.p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className={cn(
                  "absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md transition-transform",
                  !reduced && "hover:scale-105 active:scale-95"
                )}
                aria-label={playing ? "Pausar" : "Reproduzir"}
              >
                {playing ? (
                  <Pause className="size-7" />
                ) : (
                  <Play className="ml-1 size-7" />
                )}
              </button>
              {video.durationSeconds && !playing && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-0.5 text-xs text-white">
                  {video.durationSeconds}s
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#F9FAFB]">{video.title}</h3>
              {video.description && (
                <p className="mt-1 text-sm text-[#9CA3AF]">{video.description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

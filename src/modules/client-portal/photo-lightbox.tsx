"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { PortalTimelinePhoto } from "@/types/portal";

export function PhotoLightbox({
  photos,
  index,
  open,
  onClose,
  onIndexChange,
}: {
  photos: PortalTimelinePhoto[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const { reduced } = useMotionConfig();
  const [zoomed, setZoomed] = useState(false);
  const photo = photos[index];

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = index + dir;
      if (next >= 0 && next < photos.length) {
        onIndexChange(next);
        setZoomed(false);
      }
    },
    [index, photos.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (reduced) return;
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  if (!photo) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[#0B0F19]/98"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-label="Visualizador de fotos"
        >
          <header className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
            <p className="text-sm text-[#F9FAFB]">
              {index + 1} / {photos.length}
            </p>
            <motion.div className="flex gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="rounded-full p-2 text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]"
                aria-label={zoomed ? "Reduzir" : "Ampliar"}
              >
                {zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </header>

          <motion.div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-2"
            drag={reduced || zoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={photo.id}
                className={cn(
                  "relative mx-auto max-h-[70dvh] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300",
                  zoomed && "scale-125"
                )}
                style={{ background: photo.gradient }}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoomed ? 1.25 : 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex aspect-[4/5] min-h-[280px] flex-col items-center justify-center p-8 text-center sm:aspect-[3/4]">
                  <span className="text-4xl opacity-40">📷</span>
                  <figcaption className="mt-4 text-lg font-semibold text-[#F9FAFB]">
                    {photo.label}
                  </figcaption>
                </div>
              </motion.figure>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-[#111827]/80 p-2 text-[#F9FAFB] disabled:opacity-30"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  disabled={index === photos.length - 1}
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#111827]/80 p-2 text-[#F9FAFB] disabled:opacity-30"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </motion.div>

          <p className="pb-8 text-center text-sm text-[#9CA3AF]">
            Deslize para trocar · Toque para {zoomed ? "reduzir" : "ampliar"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

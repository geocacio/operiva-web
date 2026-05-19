"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, ImageIcon } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatHumanTimestamp, portalGradient } from "./portal-utils";
import { PortalShimmer } from "./portal-shimmer";
import { cinematicEase, springTransition } from "./portal-motion";
import { PhotoLightbox } from "./photo-lightbox";
import { VideoPlayerModal, type VideoPreviewData } from "./video-player-modal";
import type { PortalMediaItem, PortalTimelinePhoto } from "@/types/portal";

export function PortalMediaGallery({ media }: { media: PortalMediaItem[] }) {
  const { reduced, stagger } = useMotionConfig();
  const [photos, setPhotos] = useState<PortalTimelinePhoto[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [video, setVideo] = useState<VideoPreviewData | null>(null);

  if (media.length === 0) return null;

  const photoItems = media.filter((m) => m.type === "foto");

  const openPhoto = (item: PortalMediaItem) => {
    const galleryPhotos: PortalTimelinePhoto[] = photoItems.map((p) => ({
      id: p.id,
      label: p.title,
      gradient: p.gradient ?? portalGradient(p.id),
    }));
    const idx = galleryPhotos.findIndex((p) => p.id === item.id);
    setPhotos(galleryPhotos);
    setPhotoIndex(Math.max(0, idx));
    setLightboxOpen(true);
  };

  return (
    <section className="px-5 py-4">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: cinematicEase }}
      >
        <h2 className="text-base font-semibold text-[#F9FAFB]">
          Momentos do serviço
        </h2>
        <p className="mb-4 mt-1 text-xs text-[#9CA3AF]">
          Toque para ver em tela cheia — registros da execução
        </p>
      </motion.div>

      <motion.div
        className="columns-2 gap-2.5 sm:columns-3"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {media.map((item, i) => {
          const gradient = item.gradient ?? portalGradient(item.id);
          const isTall = i % 3 === 0 && item.type === "foto";
          const isWide = i % 5 === 2 && item.type === "foto";

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.type === "video") {
                  setVideo({
                    title: item.title,
                    gradient,
                    durationSeconds: item.durationSeconds,
                    posterLabel: item.stepLabel,
                  });
                } else if (item.type === "foto") {
                  openPhoto(item);
                }
              }}
              className={`group relative mb-2.5 w-full break-inside-avoid overflow-hidden rounded-2xl border border-[#1F2937]/80 text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                isTall
                  ? "aspect-[3/4]"
                  : isWide
                    ? "aspect-[5/3]"
                    : "aspect-[4/3]"
              }`}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * stagger, ...springTransition }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              whileHover={reduced ? undefined : { y: -3 }}
              disabled={item.type === "audio"}
            >
              <PortalShimmer className="size-full">
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <motion.div
                    className="size-full"
                    style={{ background: gradient }}
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </PortalShimmer>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/20 to-transparent" />

              {!reduced && (
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-[#3B82F6]/0 transition-all group-hover:opacity-100 group-hover:ring-[#3B82F6]/30"
                  layout={false}
                />
              )}

              {item.type === "video" && (
                <span className="absolute left-1/2 top-[42%] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-xl backdrop-blur-md group-hover:bg-white/20">
                  <Play className="ml-0.5 size-4" />
                </span>
              )}
              {item.type === "audio" && (
                <span className="absolute inset-0 flex items-center justify-center bg-[#0B0F19]/40">
                  <Mic className="size-10 text-[#06B6D4]/80" />
                </span>
              )}
              {item.type === "foto" && !item.thumbnailUrl && (
                <span className="absolute inset-0 flex items-center justify-center opacity-20">
                  <ImageIcon className="size-8 text-white" />
                </span>
              )}

              <motion.div className="absolute bottom-0 left-0 right-0 p-2.5">
                {item.type === "video" && item.durationSeconds && (
                  <span className="mb-1 inline-block rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                    {item.durationSeconds}s
                  </span>
                )}
                <p className="line-clamp-2 text-xs font-medium text-[#F9FAFB]">
                  {item.title}
                </p>
                {item.stepLabel && (
                  <p className="text-[10px] text-[#9CA3AF]">
                    {item.stepLabel} · {formatHumanTimestamp(item.createdAt)}
                  </p>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      <PhotoLightbox
        photos={photos}
        index={photoIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setPhotoIndex}
      />
      <VideoPlayerModal
        video={video}
        open={!!video}
        onClose={() => setVideo(null)}
      />
    </section>
  );
}

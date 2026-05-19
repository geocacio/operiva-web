"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, ImageIcon } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import { portalGradient } from "./portal-utils";
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
      <h2 className="mb-1 text-sm font-medium text-[#F9FAFB]">Momentos do serviço</h2>
      <p className="mb-3 text-xs text-[#9CA3AF]">Toque para ver em tela cheia</p>

      <motion.div
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {media.map((item, i) => {
          const gradient = item.gradient ?? portalGradient(item.id);
          const isFeatured = i === 0 && item.type === "foto";

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
              className={`group relative overflow-hidden rounded-2xl border border-[#1F2937] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                isFeatured ? "col-span-2 row-span-2 aspect-square sm:col-span-1 sm:row-span-1 sm:aspect-[4/3]" : "aspect-[4/3]"
              }`}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * stagger }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              disabled={item.type === "audio"}
            >
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <motion.div
                  className="size-full"
                  style={{ background: gradient }}
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                />
              )}

              <motion.div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/20 to-transparent" />

              {item.type === "video" && (
                <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                  <Play className="ml-0.5 size-4" />
                </span>
              )}
              {item.type === "audio" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Mic className="size-10 text-[#06B6D4]/80" />
                </span>
              )}
              {item.type === "foto" && !item.thumbnailUrl && (
                <span className="absolute inset-0 flex items-center justify-center opacity-30">
                  <ImageIcon className="size-8 text-white" />
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                {item.type === "video" && item.durationSeconds && (
                  <span className="mb-1 inline-block rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                    {item.durationSeconds}s
                  </span>
                )}
                <p className="text-xs font-medium text-[#F9FAFB] line-clamp-2">
                  {item.title}
                </p>
                {item.stepLabel && (
                  <p className="text-[10px] text-[#9CA3AF]">
                    {item.stepLabel} · {formatRelative(item.createdAt)}
                  </p>
                )}
              </div>
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

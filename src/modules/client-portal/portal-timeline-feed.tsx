"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Radio, RefreshCw } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { sortTimelineNewestFirst } from "./portal-utils";
import { PhotoLightbox } from "./photo-lightbox";
import { VideoPlayerModal, type VideoPreviewData } from "./video-player-modal";
import { ApprovalItem } from "./timeline-items/approval-item";
import { AudioItem } from "./timeline-items/audio-item";
import { MessageItem } from "./timeline-items/message-item";
import { MilestoneItem } from "./timeline-items/milestone-item";
import { PhotoItem } from "./timeline-items/photo-item";
import { StatusItem } from "./timeline-items/status-item";
import { VideoItem } from "./timeline-items/video-item";
import type { PortalTimelineItem, PortalTimelinePhoto } from "@/types/portal";

export function PortalTimelineFeed({
  items,
  onRefresh,
  refreshing,
}: {
  items: PortalTimelineItem[];
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  const { reduced, stagger } = useMotionConfig();
  const sorted = useMemo(() => sortTimelineNewestFirst(items), [items]);

  const [lightboxPhotos, setLightboxPhotos] = useState<PortalTimelinePhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [video, setVideo] = useState<VideoPreviewData | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const openPhotos = (photos: PortalTimelinePhoto[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="px-5 py-4">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <motion.span
              className="relative flex size-2"
              aria-hidden
            >
              {!reduced && (
                <motion.span
                  className="absolute inline-flex size-full rounded-full bg-[#10B981]"
                  animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-[#10B981]" />
            </motion.span>
            <h2 className="text-base font-semibold text-[#F9FAFB]">
              Ao vivo do seu serviço
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-[#9CA3AF]">
            Fotos, vídeos e atualizações da equipe
          </p>
        </div>
        {onRefresh && (
          <motion.button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-[#111827] px-3 py-1.5 text-xs text-[#9CA3AF] disabled:opacity-50"
            whileTap={reduced ? undefined : { scale: 0.96 }}
          >
            <RefreshCw
              className={`size-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            Atualizar
          </motion.button>
        )}
      </div>

      <ul className="space-y-4">
        {sorted.map((item, i) => {
          const isLatest = i === 0;
          const delay = reduced ? 0 : Math.min(i, 8) * stagger;

          if (item.type === "marco" || item.celebration) {
            return (
              <MilestoneItem
                key={item.id}
                item={item}
                isLatest={isLatest}
                delay={delay}
              />
            );
          }

          switch (item.type) {
            case "foto":
              return (
                <PhotoItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                  onOpenPhoto={(idx) =>
                    openPhotos(item.photos ?? [], idx)
                  }
                />
              );
            case "video":
              return (
                <VideoItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                  onPlay={setVideo}
                />
              );
            case "audio":
              return (
                <AudioItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                  activeAudioId={activeAudioId}
                  onAudioPlay={(id) =>
                    setActiveAudioId((cur) => (cur === id ? null : id))
                  }
                />
              );
            case "aprovacao":
              return (
                <ApprovalItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                />
              );
            case "mensagem":
              return (
                <MessageItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                />
              );
            case "etapa":
            case "status":
            default:
              return (
                <StatusItem
                  key={item.id}
                  item={item}
                  isLatest={isLatest}
                  delay={delay}
                />
              );
          }
        })}
      </ul>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center py-12 text-center">
          <Radio className="size-8 text-[#1F2937]" />
          <p className="mt-3 text-sm text-[#9CA3AF]">
            Em breve as primeiras atualizações aparecem aqui.
          </p>
        </div>
      )}

      <PhotoLightbox
        photos={lightboxPhotos}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      <VideoPlayerModal
        video={video}
        open={!!video}
        onClose={() => setVideo(null)}
      />
    </section>
  );
}

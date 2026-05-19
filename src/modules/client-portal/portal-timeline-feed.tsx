"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppSelector } from "@/store/hooks";
import {
  getFeedVisualWeight,
  sortTimelineNewestFirst,
} from "./portal-utils";
import { PortalLiveIndicator } from "./portal-live-indicator";
import { PortalCelebrationToast } from "./portal-celebration";
import { cinematicEase, springTransition } from "./portal-motion";
import { PhotoLightbox } from "./photo-lightbox";
import { VideoPlayerModal, type VideoPreviewData } from "./video-player-modal";
import { ApprovalItem } from "./timeline-items/approval-item";
import { AudioItem } from "./timeline-items/audio-item";
import { BeforeAfterItem } from "./timeline-items/before-after-item";
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
  token,
}: {
  items: PortalTimelineItem[];
  onRefresh?: () => void;
  refreshing?: boolean;
  token?: string;
}) {
  const { reduced, stagger } = useMotionConfig();
  const sorted = useMemo(() => sortTimelineNewestFirst(items), [items]);
  const feedback = useAppSelector((s) => s.clientPortal.lastActionFeedback);

  const [lightboxPhotos, setLightboxPhotos] = useState<PortalTimelinePhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [video, setVideo] = useState<VideoPreviewData | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [prevLatestId, setPrevLatestId] = useState<string | null>(null);

  const latestId = sorted[0]?.id ?? null;

  useEffect(() => {
    if (!latestId) return;
    if (prevLatestId && prevLatestId !== latestId && feedback?.includes("Nova")) {
      setShowRefreshToast(true);
      const t = setTimeout(() => setShowRefreshToast(false), 2800);
      return () => clearTimeout(t);
    }
    setPrevLatestId(latestId);
  }, [latestId, prevLatestId, feedback]);

  const openPhotos = (photos: PortalTimelinePhoto[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="px-5 py-5">
      <PortalCelebrationToast
        message="✨ Nova atualização da equipe"
        visible={showRefreshToast}
      />

      <motion.div
        className="mb-5 flex items-end justify-between gap-3"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: cinematicEase }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <PortalLiveIndicator size="md" />
            <h2 className="text-lg font-semibold text-[#F9FAFB]">
              Ao vivo do seu serviço
            </h2>
          </div>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Atualizações da equipe — como se você estivesse lá
          </p>
        </div>
        {onRefresh && (
          <motion.button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex min-h-11 min-w-[5.5rem] items-center justify-center gap-1.5 rounded-full border border-[#1F2937] bg-[#111827]/90 px-3.5 py-2 text-xs font-medium text-[#9CA3AF] shadow-lg backdrop-blur-sm disabled:opacity-50"
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={springTransition}
          >
            <RefreshCw
              className={`size-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            Atualizar
          </motion.button>
        )}
      </motion.div>

      <LayoutGroup id={token ?? "portal-feed"}>
        <motion.ul
          className="flex flex-col gap-3 sm:gap-4"
          layout={!reduced}
        >
          <AnimatePresence initial={false}>
            {sorted.map((item, i) => {
              const isLatest = i === 0;
              const delay = reduced ? 0 : Math.min(i, 10) * stagger;
              const visualWeight = getFeedVisualWeight(item, i);

              if (item.type === "marco" || item.celebration) {
                return (
                  <MilestoneItem
                    key={item.id}
                    item={item}
                    isLatest={isLatest}
                    delay={delay}
                    visualWeight={visualWeight}
                  />
                );
              }

              switch (item.type) {
                case "antes_depois":
                  return (
                    <BeforeAfterItem
                      key={item.id}
                      item={item}
                      isLatest={isLatest}
                      delay={delay}
                    />
                  );
                case "foto":
                  return (
                    <PhotoItem
                      key={item.id}
                      item={item}
                      isLatest={isLatest}
                      delay={delay}
                      visualWeight={visualWeight}
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
                      visualWeight={visualWeight}
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
                      visualWeight={visualWeight}
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
                      visualWeight={visualWeight}
                    />
                  );
                case "mensagem":
                  return (
                    <MessageItem
                      key={item.id}
                      item={item}
                      isLatest={isLatest}
                      delay={delay}
                      visualWeight={visualWeight}
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
                      visualWeight={visualWeight}
                    />
                  );
              }
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center py-14 text-center">
          <motion.span
            className="text-4xl"
            animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            aria-hidden
          >
            📡
          </motion.span>
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

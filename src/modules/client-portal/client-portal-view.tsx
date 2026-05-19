"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  approveStep,
  clearPortalFeedback,
  fetchClientPortal,
  refreshPortalTimeline,
  requestAdjustment,
} from "@/store/slices/client-portal-slice";
import { PortalApprovalPanel } from "./portal-approval-panel";
import { PortalHero } from "./portal-hero";
import { PortalProgressJourney } from "./portal-progress-journey";
import { PortalMediaGallery } from "./portal-media-gallery";
import { PortalTimelineFeed } from "./portal-timeline-feed";
import { PortalCelebration } from "./portal-celebration";
import { cinematicEase } from "./portal-motion";

function PortalAmbientBackground({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return <motion.div className="pointer-events-none fixed inset-0 -z-10 bg-[#0B0F19]" aria-hidden />;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0B0F19]"
      aria-hidden
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[50vh] w-[70vw] rounded-full bg-[#3B82F6]/8 blur-[100px]"
        animate={{ x: [0, 24, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/4 h-[40vh] w-[60vw] rounded-full bg-[#06B6D4]/6 blur-[90px]"
        animate={{ x: [0, -20, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-32 w-64 rounded-full bg-[#10B981]/5 blur-[80px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.div>
  );
}

export function ClientPortalView({ token }: { token: string }) {
  const dispatch = useAppDispatch();
  const { reduced } = useMotionConfig();
  const portal = useAppSelector((s) => s.clientPortal.byToken[token]);
  const loading = useAppSelector((s) => s.clientPortal.loading);
  const refreshing = useAppSelector((s) => s.clientPortal.refreshing);
  const error = useAppSelector((s) => s.clientPortal.error);
  const feedback = useAppSelector((s) => s.clientPortal.lastActionFeedback);

  useEffect(() => {
    dispatch(fetchClientPortal(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => dispatch(clearPortalFeedback()), 3200);
    return () => clearTimeout(t);
  }, [dispatch, feedback]);

  if (loading && !portal) {
    return (
      <motion.div
        className="min-h-dvh bg-[#0B0F19]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Skeleton className="h-[min(52dvh,22rem)] w-full rounded-none bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-6 h-28 rounded-2xl bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-4 h-12 rounded-full bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-4 h-48 rounded-2xl bg-[#1F2937]" />
      </motion.div>
    );
  }

  if (error || !portal) {
    return (
      <motion.div
        className="flex min-h-dvh items-center justify-center bg-[#0B0F19] p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <p className="text-lg text-[#F9FAFB]">Link inválido ou expirado</p>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Entre em contato com quem enviou o link de acompanhamento.
          </p>
        </div>
      </motion.div>
    );
  }

  const showApproval =
    portal.pendingApproval && portal.pendingApproval.status === "pendente";

  return (
    <div className="relative min-h-dvh pb-[max(4rem,env(safe-area-inset-bottom))]">
      <PortalAmbientBackground reduced={reduced} />

      <PortalHero portal={portal} />
      <PortalProgressJourney portal={portal} />

      <AnimatePresence>
        {feedback && (
          <motion.div
            className="sticky top-[max(0.5rem,env(safe-area-inset-top))] z-40 mx-5 mt-2"
            initial={reduced ? false : { opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ ease: cinematicEase }}
          >
            <PortalCelebration
              variant={
                feedback.includes("Aprovação")
                  ? "thanks"
                  : feedback.includes("Nova")
                    ? "update"
                    : "advance"
              }
              title={feedback}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PortalTimelineFeed
        items={portal.timeline}
        token={token}
        refreshing={refreshing}
        onRefresh={() => dispatch(refreshPortalTimeline(token))}
      />

      <PortalMediaGallery media={portal.media} />

      {showApproval && (
        <motion.div
          className="mt-6"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: cinematicEase }}
        >
          <PortalApprovalPanel
            approval={portal.pendingApproval!}
            onApprove={() => dispatch(approveStep({ token }))}
            onRequestAdjustment={(message) =>
              dispatch(requestAdjustment({ token, message }))
            }
          />
        </motion.div>
      )}

      <footer className="mx-5 mt-10 border-t border-[#1F2937]/80 pt-6 text-center text-xs leading-relaxed text-[#6B7280]">
        Operiva — transparência com proximidade.
        <br />
        Você acompanha. A equipe executa. Sem ficar no escuro.
      </footer>
    </div>
  );
}

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
import { PortalHeader } from "./portal-header";
import { PortalProgressJourney } from "./portal-progress-journey";
import { PortalMediaGallery } from "./portal-media-gallery";
import { PortalTimelineFeed } from "./portal-timeline-feed";

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
        <Skeleton className="h-44 w-full rounded-none bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-6 h-28 rounded-2xl bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-4 h-48 rounded-2xl bg-[#1F2937]" />
        <Skeleton className="mx-5 mt-4 h-72 rounded-2xl bg-[#1F2937]" />
      </motion.div>
    );
  }

  if (error || !portal) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0F19] p-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-lg text-[#F9FAFB]">Link inválido ou expirado</p>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Entre em contato com quem enviou o link de acompanhamento.
          </p>
        </motion.div>
      </div>
    );
  }

  const showApproval =
    portal.pendingApproval && portal.pendingApproval.status === "pendente";

  return (
    <div className="min-h-dvh bg-[#0B0F19] pb-16">
      <PortalHeader portal={portal} />
      <PortalProgressJourney portal={portal} />

      <AnimatePresence>
        {feedback && (
          <motion.div
            role="status"
            className="sticky top-2 z-40 mx-5 mt-2 rounded-xl border border-[#10B981]/30 bg-[#10B981]/20 px-4 py-2.5 text-center text-sm font-medium text-[#10B981] backdrop-blur-md"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <PortalTimelineFeed
        items={portal.timeline}
        refreshing={refreshing}
        onRefresh={() => dispatch(refreshPortalTimeline(token))}
      />

      <PortalMediaGallery media={portal.media} />

      {showApproval && (
        <div className="mt-6">
          <PortalApprovalPanel
            approval={portal.pendingApproval!}
            onApprove={() => dispatch(approveStep({ token }))}
            onRequestAdjustment={(message) =>
              dispatch(requestAdjustment({ token, message }))
            }
          />
        </div>
      )}

      <footer className="mx-5 mt-10 border-t border-[#1F2937] pt-6 text-center text-xs leading-relaxed text-[#6B7280]">
        Operiva — transparência operacional.
        <br />
        Você acompanha. A equipe executa. Sem ficar no escuro.
      </footer>
    </div>
  );
}

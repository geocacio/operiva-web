"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addAudio,
  addPhoto,
  addVideo,
  clearActionFeedback,
  completeStep,
  fetchExecution,
  reportProblem,
  requestApproval,
} from "@/store/slices/execution-slice";
import { fetchServices } from "@/store/slices/services-slice";
import {
  ExecutionBottomBar,
  type BottomActionId,
} from "./execution-bottom-bar";
import { ExecutionHeroStep } from "./execution-hero-step";
import { ExecutionMinimalHeader } from "./execution-minimal-header";
import { ExecutionRecentTimeline } from "./execution-recent-timeline";
import { ExecutionUploadPreview } from "./execution-upload-preview";
import {
  ReportProblemModal,
  RequestApprovalModal,
} from "./execution-modals";

export function ExecutionView({ serviceId }: { serviceId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reduced } = useMotionConfig();

  const service = useAppSelector((s) =>
    s.services.items.find((item) => item.id === serviceId)
  );
  const execution = useAppSelector((s) => s.execution.byServiceId[serviceId]);
  const loading = useAppSelector((s) => s.execution.loading);
  const feedback = useAppSelector((s) => s.execution.lastActionFeedback);

  const [modal, setModal] = useState<"problem" | "approval" | null>(null);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchExecution(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => dispatch(clearActionFeedback()), 2800);
    return () => clearTimeout(t);
  }, [dispatch, feedback]);

  const progressPercent = useMemo(() => {
    if (!execution) return 0;
    const done = execution.steps.filter((s) => s.status === "concluida").length;
    return Math.round((done / execution.steps.length) * 100);
  }, [execution]);

  const handleBottomAction = useCallback(
    (id: BottomActionId) => {
      if (!execution || execution.paused) {
        if (id === "problem") setModal("problem");
        return;
      }

      switch (id) {
        case "complete":
          dispatch(completeStep({ serviceId }));
          break;
        case "photo":
          dispatch(
            addPhoto({
              serviceId,
              fileName: `campo-${Date.now()}.jpg`,
            })
          );
          break;
        case "video":
          dispatch(addVideo({ serviceId }));
          break;
        case "audio":
          dispatch(addAudio({ serviceId }));
          break;
        case "approval":
          setModal("approval");
          break;
        case "problem":
          setModal("problem");
          break;
      }
    },
    [dispatch, execution, serviceId]
  );

  if (loading && !execution) {
    return (
      <motion.div className="min-h-dvh bg-[#0B0F19] p-4">
        <Skeleton className="h-20 w-full rounded-xl bg-[#1F2937]" />
        <Skeleton className="mt-6 h-48 w-full rounded-2xl bg-[#1F2937]" />
        <Skeleton className="mt-6 h-32 w-full rounded-xl bg-[#1F2937]" />
      </motion.div>
    );
  }

  if (!execution || !service) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0F19] p-6">
        <div className="text-center">
          <p className="text-[#F9FAFB]">Serviço não encontrado.</p>
          <button
            type="button"
            onClick={() => router.push("/app/servicos")}
            className="mt-4 text-sm text-[#3B82F6] hover:underline"
          >
            Voltar para serviços
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0B0F19] pb-28 text-[#F9FAFB]">
      <ExecutionMinimalHeader
        service={service}
        estimatedMinutesRemaining={execution.estimatedMinutesRemaining}
        paused={execution.paused}
        progressPercent={progressPercent}
      />

      <AnimatePresence>
        {feedback && (
          <motion.div
            role="status"
            className="mx-4 mt-3 rounded-lg border border-[#10B981]/30 bg-[#10B981]/15 px-4 py-2 text-center text-sm text-[#10B981]"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <ExecutionHeroStep
        steps={execution.steps}
        currentStepIndex={execution.currentStepIndex}
        progressPercent={progressPercent}
      />

      <ExecutionUploadPreview uploads={execution.uploads} />
      <ExecutionRecentTimeline events={execution.timeline} />

      <ExecutionBottomBar
        paused={execution.paused}
        onAction={handleBottomAction}
      />

      <ReportProblemModal
        open={modal === "problem"}
        onOpenChange={(o) => !o && setModal(null)}
        onConfirm={(description) =>
          dispatch(reportProblem({ serviceId, description }))
        }
      />
      <RequestApprovalModal
        open={modal === "approval"}
        onOpenChange={(o) => !o && setModal(null)}
        onConfirm={(note) =>
          dispatch(requestApproval({ serviceId, note: note || undefined }))
        }
      />
    </div>
  );
}

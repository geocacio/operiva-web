"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useMotionConfig } from "@/hooks/use-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addPhoto,
  addVideo,
  clearActionFeedback,
  completeStep,
  fetchExecution,
  pauseService,
  reportProblem,
  requestApproval,
  resumeService,
} from "@/store/slices/execution-slice";
import { fetchServices } from "@/store/slices/services-slice";
import { ClientStatusBlock } from "./client-status-block";
import { CurrentStepBlock } from "./current-step-block";
import { ExecutionHeader } from "./execution-header";
import { ExecutionTimeline } from "./execution-timeline";
import {
  PauseServiceModal,
  ReportProblemModal,
  RequestApprovalModal,
} from "./execution-modals";
import { MinimalComms } from "./minimal-comms";
import { QuickActions, type QuickActionId } from "./quick-actions";
import { QuickUpload } from "./quick-upload";

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

  const [modal, setModal] = useState<
    "problem" | "approval" | "pause" | null
  >(null);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchExecution(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => dispatch(clearActionFeedback()), 3200);
    return () => clearTimeout(t);
  }, [dispatch, feedback]);

  const progressPercent = useMemo(() => {
    if (!execution) return 0;
    const done = execution.steps.filter((s) => s.status === "concluida").length;
    return Math.round((done / execution.steps.length) * 100);
  }, [execution]);

  const handleFinishStep = useCallback(() => {
    dispatch(completeStep({ serviceId }));
  }, [dispatch, serviceId]);

  const handleQuickAction = useCallback(
    (id: QuickActionId) => {
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
        case "approval":
          setModal("approval");
          break;
        case "problem":
          setModal("problem");
          break;
        case "pause":
          setModal("pause");
          break;
      }
    },
    [dispatch, serviceId]
  );

  if (loading && !execution) {
    return (
      <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Skeleton className="h-24 w-full rounded-xl bg-[#1F2937]" />
        <Skeleton className="h-40 w-full rounded-xl bg-[#1F2937]" />
        <motion.div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl bg-[#1F2937]" />
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (!execution || !service) {
    return (
      <motion.div
        className="rounded-xl border border-[#1F2937] bg-[#111827] p-8 text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-[#F9FAFB]">Serviço não encontrado.</p>
        <button
          type="button"
          onClick={() => router.push("/app/servicos")}
          className="mt-4 text-sm text-[#3B82F6] hover:underline"
        >
          Voltar para serviços
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-full bg-[#0B0F19] text-[#F9FAFB]"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ExecutionHeader
        service={service}
        estimatedMinutesRemaining={execution.estimatedMinutesRemaining}
        paused={execution.paused}
        onFinishStep={handleFinishStep}
      />

      <AnimatePresence>
        {feedback && (
          <motion.div
            role="status"
            className="mx-auto mt-3 max-w-lg rounded-lg border border-[#10B981]/30 bg-[#10B981]/15 px-4 py-2.5 text-center text-sm text-[#10B981]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-6 space-y-6 pb-8 lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-6 lg:space-y-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-6">
          <ClientStatusBlock status={execution.clientStatus} />
          <CurrentStepBlock
            steps={execution.steps}
            currentStepIndex={execution.currentStepIndex}
            progressPercent={progressPercent}
          />
          <QuickActions
            paused={execution.paused}
            onAction={handleQuickAction}
          />
          <QuickUpload
            uploads={execution.uploads}
            disabled={execution.paused}
            onUpload={(fileName) =>
              dispatch(addPhoto({ serviceId, fileName }))
            }
          />
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <ExecutionTimeline events={execution.timeline} />
          <MinimalComms messages={execution.messages} />
        </div>
      </motion.div>

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
      <PauseServiceModal
        open={modal === "pause"}
        onOpenChange={(o) => !o && setModal(null)}
        isPaused={execution.paused}
        onConfirm={(reason) => dispatch(pauseService({ serviceId, reason }))}
        onResume={() => dispatch(resumeService({ serviceId }))}
      />
    </motion.div>
  );
}

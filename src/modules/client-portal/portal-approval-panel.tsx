"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageSquare, ShieldCheck, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/hooks/use-motion";
import { PortalShimmer } from "./portal-shimmer";
import { pulseGlowKeyframes, springTransition } from "./portal-motion";
import type { PortalApproval } from "@/types/portal";
import { portalGradient } from "./portal-utils";

export function PortalApprovalPanel({
  approval,
  onApprove,
  onRequestAdjustment,
  disabled,
}: {
  approval: PortalApproval;
  onApprove: () => void;
  onRequestAdjustment: (message: string) => void;
  disabled?: boolean;
}) {
  const { reduced } = useMotionConfig();
  const [showAdjust, setShowAdjust] = useState(false);
  const [message, setMessage] = useState("");
  const [justApproved, setJustApproved] = useState(false);
  const thumbGradient =
    approval.mediaGradient ?? portalGradient(approval.id);

  if (approval.status !== "pendente") {
    return (
      <motion.div
        className="mx-5 rounded-2xl border border-[#10B981]/35 bg-gradient-to-br from-[#10B981]/18 to-[#111827]/90 p-5 text-center shadow-lg shadow-[#10B981]/10 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springTransition}
      >
        <Check className="mx-auto size-8 text-[#10B981]" />
        <p className="mt-2 text-sm font-medium text-[#F9FAFB]">
          {approval.status === "aprovado"
            ? "✅ Obrigado pela aprovação — a equipe já foi notificada!"
            : "Ajuste solicitado. Nossa equipe retorna em breve."}
        </p>
      </motion.div>
    );
  }

  const handleApprove = () => {
    setJustApproved(true);
    onApprove();
  };

  return (
    <motion.section
      className="relative mx-5 overflow-hidden rounded-2xl border border-[#F59E0B]/35 bg-[#111827]/75 shadow-2xl shadow-[#F59E0B]/12 backdrop-blur-xl"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={pulseGlowKeyframes}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{
            boxShadow: "inset 0 0 40px rgba(245,158,11,0.06)",
          }}
          aria-hidden
        />
      )}

      {!reduced && (
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent"
          animate={{ opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      <div className="relative p-5">
        <div className="flex items-center gap-2">
          <motion.span
            animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ShieldCheck className="size-5 text-[#F59E0B]" />
          </motion.span>
          <h2 className="font-semibold text-[#F9FAFB]">Sua decisão importa</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
          Revise com calma —{" "}
          <span className="font-medium text-[#F9FAFB]">{approval.stepName}</span>
        </p>
        {approval.note && (
          <p className="mt-2 rounded-lg border border-[#1F2937]/80 bg-[#0B0F19]/50 px-3 py-2 text-sm text-[#9CA3AF] backdrop-blur-sm">
            {approval.note}
          </p>
        )}

        {approval.mediaLabel && (
          <motion.button
            type="button"
            className="group relative mt-4 w-full overflow-hidden rounded-xl border border-[#1F2937]/80 text-left shadow-lg"
            whileTap={reduced ? undefined : { scale: 0.99 }}
          >
            <PortalShimmer className="aspect-[16/9] w-full">
              <motion.div
                className="size-full"
                style={{ background: thumbGradient }}
                whileHover={reduced ? undefined : { scale: 1.02 }}
              />
            </PortalShimmer>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/35 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-xl backdrop-blur-md group-hover:bg-white/18">
              <Play className="ml-0.5 size-6" />
            </span>
            <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-[#F9FAFB]">
              {approval.mediaLabel}
            </p>
          </motion.button>
        )}

        {!showAdjust ? (
          <div className="mt-5 flex flex-col gap-2.5">
            <Button
              className="h-12 w-full rounded-xl bg-[#10B981] text-base font-semibold text-white shadow-lg shadow-[#10B981]/30 hover:bg-[#059669]"
              disabled={disabled || justApproved}
              onClick={handleApprove}
            >
              {justApproved ? "Aprovando…" : "Aprovar — está tudo certo"}
            </Button>
            <Button
              variant="ghost"
              className="h-11 w-full text-[#9CA3AF] hover:bg-[#1F2937]/80 hover:text-[#F9FAFB]"
              disabled={disabled}
              onClick={() => setShowAdjust(true)}
            >
              <MessageSquare className="mr-2 size-4" />
              Pedir um ajuste
            </Button>
          </div>
        ) : (
          <motion.div
            className="mt-4 space-y-3"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={springTransition}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="O que precisa ser ajustado? A equipe lê aqui — sem precisar ligar."
              className="min-h-24 w-full resize-none rounded-xl border border-[#1F2937] bg-[#0B0F19]/80 px-3 py-3 text-sm text-[#F9FAFB] outline-none backdrop-blur-sm placeholder:text-[#6B7280] focus:border-[#F59E0B]/45"
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 text-[#9CA3AF]"
                onClick={() => setShowAdjust(false)}
              >
                Voltar
              </Button>
              <Button
                className="flex-1 rounded-xl bg-[#F59E0B] text-[#0B0F19] hover:bg-[#D97706]"
                disabled={!message.trim() || disabled}
                onClick={() => {
                  onRequestAdjustment(message.trim());
                  setShowAdjust(false);
                  setMessage("");
                }}
              >
                Enviar
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

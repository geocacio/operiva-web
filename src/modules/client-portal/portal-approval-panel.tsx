"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/hooks/use-motion";
import type { PortalApproval } from "@/types/portal";

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

  if (approval.status !== "pendente") {
    return (
      <motion.div
        className="mx-5 rounded-2xl border border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/15 to-[#111827] p-5 text-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Check className="mx-auto size-8 text-[#10B981]" />
        <p className="mt-2 text-sm font-medium text-[#F9FAFB]">
          {approval.status === "aprovado"
            ? "Etapa aprovada. Obrigado pela confiança!"
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
      className="mx-5 rounded-2xl border border-[#F59E0B]/25 bg-gradient-to-br from-[#F59E0B]/12 via-[#111827] to-[#0B0F19] p-5 shadow-xl shadow-[#F59E0B]/5"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-5 text-[#F59E0B]" />
        <h2 className="font-semibold text-[#F9FAFB]">Precisamos de você</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
        <span className="font-medium text-[#F9FAFB]">{approval.stepName}</span>
        {approval.note && (
          <>
            <br />
            <span className="mt-1 inline-block">{approval.note}</span>
          </>
        )}
      </p>

      {!showAdjust ? (
        <div className="mt-5 flex flex-col gap-2.5">
          <Button
            className="h-12 w-full rounded-xl bg-[#10B981] text-base font-semibold text-white shadow-lg shadow-[#10B981]/20 hover:bg-[#059669]"
            disabled={disabled || justApproved}
            onClick={handleApprove}
          >
            {justApproved ? "Aprovando…" : "Aprovar — está tudo certo"}
          </Button>
          <Button
            variant="ghost"
            className="h-11 w-full text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]"
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
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="O que precisa ser ajustado? Seja direto — a equipe lê aqui."
            className="min-h-24 w-full resize-none rounded-xl border border-[#1F2937] bg-[#0B0F19] px-3 py-3 text-sm text-[#F9FAFB] outline-none placeholder:text-[#6B7280] focus:border-[#F59E0B]/40"
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
    </motion.section>
  );
}

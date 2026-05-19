"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ReportProblemModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (description: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#1F2937] bg-[#111827] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F9FAFB]">Reportar problema</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            Descreva o impedimento. A equipe e o cliente serão notificados.
          </DialogDescription>
        </DialogHeader>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ex.: Falta peça do inversor, cliente ausente..."
          className="min-h-24 w-full resize-none rounded-lg border border-[#1F2937] bg-[#0B0F19] px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 outline-none focus:border-[#EF4444]/50 focus:ring-2 focus:ring-[#EF4444]/20"
        />
        <DialogFooter className="border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
            disabled={!text.trim()}
            onClick={() => {
              onConfirm(text.trim());
              setText("");
              onOpenChange(false);
            }}
          >
            Registrar problema
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RequestApprovalModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (note: string) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#1F2937] bg-[#111827] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F9FAFB]">Solicitar aprovação</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            O cliente receberá uma notificação para aprovar esta etapa ou entrega.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Mensagem opcional ao cliente"
          className="border-[#1F2937] bg-[#0B0F19] text-[#F9FAFB]"
        />
        <DialogFooter className="border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-[#F59E0B] text-[#0B0F19] hover:bg-[#D97706]"
            onClick={() => {
              onConfirm(note.trim());
              setNote("");
              onOpenChange(false);
            }}
          >
            Enviar solicitação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PauseServiceModal({
  open,
  onOpenChange,
  onConfirm,
  isPaused,
  onResume,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  isPaused: boolean;
  onResume: () => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#1F2937] bg-[#111827] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F9FAFB]">
            {isPaused ? "Serviço pausado" : "Pausar serviço"}
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            {isPaused
              ? "Retome quando estiver pronto para continuar a execução."
              : "Informe o motivo da pausa para o histórico da operação."}
          </DialogDescription>
        </DialogHeader>
        {!isPaused && (
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Motivo da pausa"
            className="border-[#1F2937] bg-[#0B0F19] text-[#F9FAFB]"
          />
        )}
        <DialogFooter className="border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {isPaused ? (
            <Button
              className="bg-[#10B981] text-white hover:bg-[#059669]"
              onClick={() => {
                onResume();
                onOpenChange(false);
              }}
            >
              Retomar serviço
            </Button>
          ) : (
            <Button
              className="bg-[#F59E0B] text-[#0B0F19] hover:bg-[#D97706]"
              disabled={!reason.trim()}
              onClick={() => {
                onConfirm(reason.trim());
                setReason("");
                onOpenChange(false);
              }}
            >
              Confirmar pausa
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

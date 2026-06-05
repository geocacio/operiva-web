"use client";

import { useState } from "react";
import { Mic, Pause, Play, Trash2 } from "lucide-react";
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
import {
  OCCURRENCE_TYPE_LABELS,
  OCCURRENCE_EFFECT_LABELS,
  type OccurrenceType,
  type OccurrenceEffect,
} from "@/types/occurrence";
import type { ExecutionStep } from "@/types/execution";

export type AddStepPosition = "end" | "after_current" | "before_step";

export type MessageWithAudioPayload = {
  text: string;
  audioDurationSeconds?: number;
};

function formatDurationMMSS(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function randomMockDuration() {
  return Math.floor(Math.random() * 18) + 8;
}

function MessageWithAudioSection({
  text,
  onTextChange,
  audioDurationSeconds,
  onAudioDurationChange,
  focusAccent = "amber",
}: {
  text: string;
  onTextChange: (value: string) => void;
  audioDurationSeconds: number | null;
  onAudioDurationChange: (seconds: number | null) => void;
  focusAccent?: "amber" | "blue";
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const focusClasses =
    focusAccent === "amber"
      ? "focus:border-[#F59E0B]/50 focus:ring-[#F59E0B]/20"
      : "focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20";

  const handleRecord = () => {
    setIsRecording(true);
    window.setTimeout(() => {
      onAudioDurationChange(randomMockDuration());
      setIsRecording(false);
    }, 600);
  };

  const handleDelete = () => {
    onAudioDurationChange(null);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Digite uma descrição"
        className={`min-h-20 w-full resize-none rounded-lg border border-[#1F2937] bg-[#0B0F19] px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 outline-none focus:ring-2 ${focusClasses}`}
      />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#1F2937]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
          OU
        </span>
        <div className="h-px flex-1 bg-[#1F2937]" />
      </div>

      {!audioDurationSeconds ? (
        <Button
          type="button"
          variant="outline"
          disabled={isRecording}
          onClick={handleRecord}
          className="h-12 w-full border-[#1F2937] bg-[#0B0F19] text-[#F9FAFB] hover:border-[#374151] hover:bg-[#111827]"
        >
          <Mic className="size-4 shrink-0" />
          {isRecording ? "Gravando..." : "Gravar áudio"}
        </Button>
      ) : (
        <div className="rounded-lg border border-[#1F2937] bg-[#0B0F19] p-3">
          <p className="text-sm text-[#F9FAFB]">
            Áudio gravado ({formatDurationMMSS(audioDurationSeconds)})
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="min-h-10 border-[#1F2937] bg-[#111827] text-[#F9FAFB] hover:border-[#374151]"
            >
              {isPlaying ? (
                <Pause className="size-3.5 shrink-0" />
              ) : (
                <Play className="size-3.5 shrink-0" />
              )}
              {isPlaying ? "Pausar" : "Reproduzir"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="min-h-10 border-[#1F2937] bg-[#111827] text-[#FCA5A5] hover:border-[#EF4444]/40 hover:bg-[#EF4444]/10"
            >
              <Trash2 className="size-3.5 shrink-0" />
              Excluir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const SCROLLABLE_DIALOG_CONTENT_CLASS =
  "!flex max-h-[90dvh] flex-col overflow-hidden border-[#1F2937] bg-[#111827] sm:max-w-md";

// ── RegisterOccurrenceModal ────────────────────────────────────────────────

const occurrenceTypes = Object.entries(OCCURRENCE_TYPE_LABELS) as [
  OccurrenceType,
  string,
][];

const occurrenceEffects = Object.entries(OCCURRENCE_EFFECT_LABELS) as [
  OccurrenceEffect,
  string,
][];

export function RegisterOccurrenceModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: {
    type: OccurrenceType;
    title: string;
    description: string;
    effects: OccurrenceEffect[];
    audioDurationSeconds?: number;
  }) => void;
}) {
  const [type, setType] = useState<OccurrenceType>("imprevisto");
  const [description, setDescription] = useState("");
  const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(
    null
  );
  const [effects, setEffects] = useState<OccurrenceEffect[]>(["nenhum"]);

  const toggleEffect = (effect: OccurrenceEffect) => {
    if (effect === "nenhum") {
      setEffects(["nenhum"]);
      return;
    }
    setEffects((prev) => {
      const without = prev.filter((e) => e !== "nenhum");
      if (without.includes(effect)) {
        const next = without.filter((e) => e !== effect);
        return next.length === 0 ? ["nenhum"] : next;
      }
      return [...without, effect];
    });
  };

  const reset = () => {
    setType("imprevisto");
    setDescription("");
    setAudioDurationSeconds(null);
    setEffects(["nenhum"]);
  };

  const canSubmit = Boolean(description.trim() || audioDurationSeconds);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className={SCROLLABLE_DIALOG_CONTENT_CLASS}>
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-[#F9FAFB]">
            Registrar ocorrência
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            Documente o que aconteceu. Fica no histórico do serviço.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">
              Tipo de ocorrência
            </p>
            <div className="grid grid-cols-2 gap-2">
              {occurrenceTypes.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                    type === key
                      ? "border-[#F59E0B]/60 bg-[#F59E0B]/15 text-[#FCD34D]"
                      : "border-[#1F2937] bg-[#0B0F19] text-[#9CA3AF] hover:border-[#374151]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">Mensagem</p>
            <MessageWithAudioSection
              text={description}
              onTextChange={setDescription}
              audioDurationSeconds={audioDurationSeconds}
              onAudioDurationChange={setAudioDurationSeconds}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">
              Efeitos (opcional)
            </p>
            <div className="flex flex-wrap gap-2">
              {occurrenceEffects.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleEffect(key)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    effects.includes(key)
                      ? "border-[#EF4444]/60 bg-[#EF4444]/15 text-[#FCA5A5]"
                      : "border-[#1F2937] bg-[#0B0F19] text-[#9CA3AF] hover:border-[#374151]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="shrink-0 border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-[#F59E0B] text-[#0B0F19] hover:bg-[#D97706]"
            disabled={!canSubmit}
            onClick={() => {
              onConfirm({
                type,
                title: OCCURRENCE_TYPE_LABELS[type],
                description: description.trim(),
                effects,
                audioDurationSeconds: audioDurationSeconds ?? undefined,
              });
              reset();
              onOpenChange(false);
            }}
          >
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── AddStepModal ───────────────────────────────────────────────────────────

const positionOptions: { value: AddStepPosition; label: string }[] = [
  { value: "end", label: "Adicionar ao final" },
  { value: "after_current", label: "Inserir após o trabalho atual" },
  { value: "before_step", label: "Inserir antes de um trabalho específico" },
];

export function AddStepModal({
  open,
  onOpenChange,
  steps,
  currentStepIndex,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: ExecutionStep[];
  currentStepIndex: number;
  onConfirm: (data: {
    name: string;
    description: string;
    position: AddStepPosition;
    beforeStepId?: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState<AddStepPosition>("after_current");
  const [beforeStepId, setBeforeStepId] = useState("");

  const currentStep = steps[currentStepIndex];

  const reset = () => {
    setName("");
    setDescription("");
    setPosition("after_current");
    setBeforeStepId("");
  };

  const canConfirm =
    name.trim() &&
    (position !== "before_step" || beforeStepId);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="border-[#1F2937] bg-[#111827] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F9FAFB]">Adicionar trabalho</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            Insira um novo trabalho no plano de execução deste serviço.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">
              Nome do trabalho
            </p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do trabalho"
              className="border-[#1F2937] bg-[#0B0F19] text-[#F9FAFB]"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">
              Descrição (opcional)
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="min-h-16 w-full resize-none rounded-lg border border-[#1F2937] bg-[#0B0F19] px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[#9CA3AF]">Posição</p>
            <div className="space-y-2">
              {positionOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                    position === opt.value
                      ? "border-[#3B82F6]/60 bg-[#3B82F6]/10"
                      : "border-[#1F2937] bg-[#0B0F19] hover:border-[#374151]"
                  }`}
                >
                  <input
                    type="radio"
                    name="add-step-position"
                    value={opt.value}
                    checked={position === opt.value}
                    onChange={() => setPosition(opt.value)}
                    className="mt-0.5 size-4 shrink-0 accent-[#3B82F6]"
                  />
                  <span className="text-sm text-[#F9FAFB]">
                    {opt.label}
                    {opt.value === "after_current" && currentStep && (
                      <span className="mt-0.5 block text-xs text-[#9CA3AF]">
                        Após «{currentStep.name}»
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
            {position === "before_step" && (
              <select
                value={beforeStepId}
                onChange={(e) => setBeforeStepId(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#1F2937] bg-[#0B0F19] px-3 py-2 text-sm text-[#F9FAFB] outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              >
                <option value="" disabled>
                  Selecione um trabalho
                </option>
                {steps.map((step) => (
                  <option key={step.id} value={step.id}>
                    {step.name}
                    {step.status === "atual" ? " (atual)" : ""}
                    {step.status === "concluida" ? " (concluído)" : ""}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <DialogFooter className="border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
            disabled={!canConfirm}
            onClick={() => {
              onConfirm({
                name: name.trim(),
                description: description.trim(),
                position,
                beforeStepId:
                  position === "before_step" ? beforeStepId : undefined,
              });
              reset();
              onOpenChange(false);
            }}
          >
            Adicionar trabalho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── RequestApprovalModal ───────────────────────────────────────────────────

export function RequestApprovalModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: MessageWithAudioPayload) => void;
}) {
  const [note, setNote] = useState("");
  const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(
    null
  );

  const reset = () => {
    setNote("");
    setAudioDurationSeconds(null);
  };

  const canSubmit = Boolean(note.trim() || audioDurationSeconds);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className={SCROLLABLE_DIALOG_CONTENT_CLASS}>
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-[#F9FAFB]">Solicitar aprovação</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            O cliente receberá uma notificação para aprovar este trabalho ou entrega.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <p className="mb-2 text-xs font-medium text-[#9CA3AF]">Mensagem</p>
          <MessageWithAudioSection
            text={note}
            onTextChange={setNote}
            audioDurationSeconds={audioDurationSeconds}
            onAudioDurationChange={setAudioDurationSeconds}
          />
        </div>
        <DialogFooter className="shrink-0 border-[#1F2937] bg-transparent sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-[#F59E0B] text-[#0B0F19] hover:bg-[#D97706]"
            disabled={!canSubmit}
            onClick={() => {
              onConfirm({
                text: note.trim(),
                audioDurationSeconds: audioDurationSeconds ?? undefined,
              });
              reset();
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

// ── PauseServiceModal ─────────────────────────────────────────────────────

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

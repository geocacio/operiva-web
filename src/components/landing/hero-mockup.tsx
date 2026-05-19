"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LiveBadge, MockupChrome } from "./landing-shared";

const STEPS: Array<{
  label: string;
  done: boolean;
  active?: boolean;
}> = [
  { label: "Recebido", done: true },
  { label: "Em execução", done: true, active: true },
  { label: "Aprovação", done: false },
  { label: "Finalizado", done: false },
];

const UPDATES = [
  {
    user: "Marcos · Funilaria",
    text: "Etapa de pintura concluída",
    time: "há 2 min",
    icon: CheckCircle2,
    color: "emerald",
  },
  {
    user: "Cliente · Ana Silva",
    text: "Aprovou o orçamento revisado",
    time: "há 8 min",
    icon: User,
    color: "cyan",
  },
  {
    user: "Equipe · Oficina",
    text: "3 fotos adicionadas à etapa",
    time: "há 15 min",
    icon: Camera,
    color: "emerald",
  },
] as const;

export function HeroMockup() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto mt-16 w-full max-w-4xl"
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-emerald-500/20 via-transparent to-cyan-500/10 blur-2xl"
        animate={
          reducedMotion
            ? undefined
            : { opacity: [0.4, 0.7, 0.4] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <MockupChrome
        title="Reparo BMW 320i · #OP-2847"
        subtitle="Funilaria Silva · Atualizado agora"
        className="relative"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.05)_50%,transparent_100%)]"
          animate={
            reducedMotion ? undefined : { x: ["-100%", "200%"] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "linear" }
          }
        />

        <motion.div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-white">
              Reparo lateral completo
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock className="size-3" />
              Previsão: sexta, 14h
            </p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Em andamento
          </span>
        </motion.div>

        <motion.div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-[10px] font-medium",
                  step.done &&
                    !step.active &&
                    "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
                  step.active &&
                    "border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
                  !step.done &&
                    !step.active &&
                    "border-white/10 bg-white/[0.02] text-zinc-600"
                )}
              >
                {step.done && !step.active ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-center text-[10px]",
                  step.active ? "text-cyan-300" : "text-zinc-500"
                )}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-xl border border-white/[0.06] bg-black/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Atualizações recentes
            </p>
            {UPDATES.map((update, i) => {
              const Icon = update.icon;
              return (
                <motion.div
                  key={update.text}
                  className="flex items-start gap-2.5 rounded-lg bg-white/[0.02] p-2"
                  initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-md",
                      update.color === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-cyan-500/10 text-cyan-400"
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium text-zinc-300">
                      {update.user}
                    </p>
                    <p className="text-[11px] text-zinc-500">{update.text}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-zinc-600">
                    {update.time}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Fotos da etapa
                </p>
                <Camera className="size-3 text-zinc-600" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((n) => (
                  <motion.div
                    key={n}
                    className="aspect-square rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 ring-1 ring-white/5"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5">
              <MessageSquare className="size-3.5 shrink-0 text-cyan-400" />
              <p className="text-[11px] text-zinc-400">
                <span className="text-cyan-300">Cliente visualizou</span> o
                andamento há 3 min — sem precisar ligar.
              </p>
            </div>
          </div>
        </motion.div>
      </MockupChrome>
    </motion.div>
  );
}

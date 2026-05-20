"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Circle,
  GripVertical,
  Image,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MockupChrome, SectionHeading, staggerContainer, fadeUp } from "./landing-shared";

const KANBAN_COLUMNS = [
  {
    title: "Aguardando",
    count: 3,
    cards: [
      { title: "Instalação solar · Residencial", client: "João M.", color: "zinc" },
      { title: "Reparo ar-condicionado", client: "Clínica Vida", color: "zinc" },
    ],
  },
  {
    title: "Em execução",
    count: 5,
    cards: [
      { title: "Móveis planejados · Cozinha", client: "Família Costa", color: "cyan" },
      { title: "Obra · Reforma banheiro", client: "Ed. Aurora", color: "cyan" },
      { title: "Fibra óptica · Instalação", client: "Loja Tech", color: "cyan" },
    ],
  },
  {
    title: "Aprovação",
    count: 2,
    cards: [
      { title: "Funilaria · Porta traseira", client: "Ana Silva", color: "amber" },
    ],
  },
  {
    title: "Concluído",
    count: 12,
    cards: [
      { title: "Manutenção preventiva", client: "Indústria Norte", color: "emerald" },
    ],
  },
] as const;

const TIMELINE_ITEMS: Array<{
  time: string;
  event: string;
  user: string;
  done: boolean;
  active?: boolean;
}> = [
  { time: "09:14", event: "Serviço criado", user: "Recepção", done: true },
  { time: "09:22", event: "Equipe atribuída", user: "Carlos · Campo", done: true },
  { time: "11:40", event: "Etapa atualizada com fotos", user: "Equipe", done: true },
  { time: "14:05", event: "Cliente acompanhou", user: "Portal do cliente", done: true },
  { time: "15:30", event: "Aguardando aprovação", user: "Cliente", done: false, active: true },
  { time: "—", event: "Finalização", user: "—", done: false },
];

export function SystemMockupsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="mockups"
      className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Veja por dentro"
          title="Uma plataforma que parece feita para o seu dia a dia"
          description="Visão da operação, portal do cliente, execução em campo e insights — clareza visual, sem cara de ERP."
          align="center"
        />

        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          variants={staggerContainer}
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Dashboard */}
          <motion.div variants={fadeUp} className="relative">
            <MockupChrome
              title="Clareza operacional"
              subtitle="Serviços · Hoje"
            >
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Em andamento", value: "24", color: "text-cyan-400" },
                  { label: "Aguardando", value: "8", color: "text-amber-400" },
                  { label: "Concluídos hoje", value: "11", color: "text-emerald-400" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                  >
                    <p className={cn("text-xl font-semibold tabular-nums", stat.color)}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-zinc-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { title: "Obra residencial · Etapa elétrica", progress: 72 },
                  { title: "Assistência · Notebook Dell", progress: 45 },
                  { title: "Móveis · Montagem final", progress: 90 },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/[0.05] bg-black/30 p-3"
                  >
                    <motion.div className="mb-2 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-zinc-300">{item.title}</p>
                      <span className="shrink-0 text-[10px] text-emerald-400">
                        {item.progress}%
                      </span>
                    </motion.div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">
                <LayoutDashboard className="size-3 text-emerald-400" />
                Atualizado em tempo real para toda a equipe
              </div>
            </MockupChrome>
          </motion.div>

          {/* Kanban */}
          <motion.div variants={fadeUp} className="relative">
            <MockupChrome title="Quadro de serviços" subtitle="Arraste e acompanhe">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {KANBAN_COLUMNS.map((col) => (
                  <div
                    key={col.title}
                    className="min-w-[120px] flex-1 rounded-lg border border-white/[0.05] bg-black/20 p-2"
                  >
                    <motion.div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-zinc-400">
                        {col.title}
                      </span>
                      <span className="rounded bg-white/5 px-1.5 text-[9px] text-zinc-500">
                        {col.count}
                      </span>
                    </motion.div>
                    <div className="space-y-1.5">
                      {col.cards.map((card) => (
                        <motion.div
                          key={card.title}
                          className="rounded-md border border-white/[0.06] bg-white/[0.03] p-2"
                          whileHover={
                            reducedMotion ? undefined : { scale: 1.02 }
                          }
                        >
                          <div className="mb-1 flex items-start justify-between gap-1">
                            <GripVertical className="size-3 shrink-0 text-zinc-600" />
                            <MoreHorizontal className="size-3 text-zinc-600" />
                          </div>
                          <p className="text-[10px] font-medium leading-tight text-zinc-300">
                            {card.title}
                          </p>
                          <p className="mt-1 text-[9px] text-zinc-500">{card.client}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <motion.div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">
                <LayoutGrid className="size-3 text-cyan-400" />
                Cada serviço no lugar certo, sempre visível
              </motion.div>
            </MockupChrome>
          </motion.div>

          {/* Timeline full width */}
          <motion.div variants={fadeUp} className="relative lg:col-span-2">
            <MockupChrome
              title="Linha do tempo · Serviço #OP-1092"
              subtitle="Histórico completo e transparente"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-0">
                  {TIMELINE_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.event}
                      className="relative flex gap-3 pb-4 last:pb-0"
                      initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {i < TIMELINE_ITEMS.length - 1 && (
                        <motion.div
                          aria-hidden
                          className={cn(
                            "absolute left-[11px] top-6 h-[calc(100%-8px)] w-px",
                            item.done ? "bg-emerald-500/40" : "bg-white/10"
                          )}
                        />
                      )}
                      <div
                        className={cn(
                          "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border",
                          item.done &&
                            "border-emerald-500/40 bg-emerald-500/15",
                          item.active &&
                            "border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_16px_rgba(34,211,238,0.2)]",
                          !item.done &&
                            !item.active &&
                            "border-white/10 bg-white/[0.02]"
                        )}
                      >
                        {item.done ? (
                          <CheckCircle2 className="size-3 text-emerald-400" />
                        ) : item.active ? (
                          <Circle className="size-3 text-cyan-400" />
                        ) : (
                          <Circle className="size-3 text-zinc-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] tabular-nums text-zinc-600">
                            {item.time}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-medium",
                              item.active ? "text-cyan-300" : "text-zinc-300"
                            )}
                          >
                            {item.event}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500">{item.user}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Bell className="size-4 text-amber-400" />
                      <span className="text-xs font-medium text-amber-200">
                        Aprovação pendente
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Cliente recebeu notificação para aprovar a etapa de acabamento.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-md bg-emerald-500/20 px-3 py-1.5 text-[10px] font-medium text-emerald-300">
                        Aprovar
                      </span>
                      <span className="rounded-md border border-white/10 px-3 py-1.5 text-[10px] text-zinc-400">
                        Solicitar ajuste
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                      Comentários e fotos
                    </p>
                    <div className="flex gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
                        <MessageSquare className="size-3.5 text-emerald-400" />
                      </div>
                      <motion.div className="flex-1 rounded-lg bg-white/[0.03] px-2.5 py-2">
                        <p className="text-[11px] text-zinc-400">
                          &quot;Acabamento ficou excelente, podem seguir.&quot;
                        </p>
                        <p className="mt-1 text-[9px] text-zinc-600">Cliente · há 1h</p>
                      </motion.div>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="flex aspect-square items-center justify-center rounded-md bg-zinc-800/80 ring-1 ring-white/5"
                        >
                          {n === 4 ? (
                            <Image className="size-3 text-zinc-600" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MockupChrome>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

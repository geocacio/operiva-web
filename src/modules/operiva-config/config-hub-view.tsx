"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Car,
  Eye,
  Layers,
  Play,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { useMotionConfig } from "@/hooks/use-motion";

const FLOW_STEPS = [
  { label: "Nicho", href: CONFIG_ROUTES.niche, icon: Car },
  { label: "Templates", href: CONFIG_ROUTES.templates, icon: Layers },
  { label: "Builder", href: `${CONFIG_ROUTES.templates}?nicho=funilaria`, icon: Workflow },
  { label: "Equipe", href: CONFIG_ROUTES.templateTeam("tpl-fun-pintura"), icon: Users },
  { label: "Cliente", href: CONFIG_ROUTES.templateClient("tpl-fun-pintura"), icon: Eye },
  { label: "Preview", href: CONFIG_ROUTES.templatePreview("tpl-fun-pintura"), icon: Play },
  { label: "Serviço", href: `${CONFIG_ROUTES.newService}?template=tpl-fun-pintura`, icon: Sparkles },
  { label: "Execução", href: "/execucao/s3", icon: Building2 },
] as const;

export function ConfigHubView() {
  const { stagger, reduced } = useMotionConfig();

  return (
    <div className="space-y-8">
      <GlassCard className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-indigo-600/20 via-violet-600/10 to-transparent p-8">
          <div className="flex items-center gap-2 text-indigo-300">
            <Workflow className="size-5" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Configuração operacional
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-semibold">
            Monte fluxos, equipes e visão do cliente
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Escolha o nicho, personalize templates, gere serviços e conecte à
            execução e ao portal do cliente. O fluxo abaixo mostra o caminho
            completo da configuração até o acompanhamento pelo cliente.
          </p>
          <Button asChild className="mt-6 gap-2 bg-indigo-600 hover:bg-indigo-500">
            <Link href={CONFIG_ROUTES.niche}>
              Começar configuração
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Fluxo end-to-end
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-2"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * stagger }}
            >
              <Link
                href={step.href}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-xs transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/10"
              >
                <step.icon className="size-3.5 text-indigo-400" />
                {step.label}
              </Link>
              {i < FLOW_STEPS.length - 1 && (
                <ArrowRight className="size-3 text-muted-foreground/40" />
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">
          Portal do cliente: após gerar serviço, acesse via link na execução ou{" "}
          <Link href="/portal/svc-194" className="text-indigo-400 hover:underline">
            /portal/[token]
          </Link>
        </p>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Layers,
            title: "1. Nicho e templates",
            desc: "Funilaria ou construção civil com biblioteca pronta.",
            href: CONFIG_ROUTES.niche,
          },
          {
            icon: Sparkles,
            title: "2. Builder de fluxo",
            desc: "Etapas, SLA, fotos, aprovações e dependências.",
            href: CONFIG_ROUTES.templates,
          },
          {
            icon: Workflow,
            title: "3. Gerar serviço",
            desc: "Crie serviço e abra execução + portal do cliente.",
            href: CONFIG_ROUTES.newService,
          },
        ].map((card, i) => (
          <GlassCard key={card.title} delay={i * 0.05} className="p-5">
            <card.icon className="size-8 text-indigo-400" />
            <h3 className="mt-3 font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
            <Link
              href={card.href}
              className="mt-4 inline-flex text-sm text-indigo-400 hover:text-indigo-300"
            >
              Ir →
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

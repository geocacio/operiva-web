"use client";

import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Workflow } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";

export function ConfigHubView() {
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
            execução e ao portal do cliente — tudo simulado, pronto para demo.
          </p>
          <Button asChild className="mt-6 gap-2 bg-indigo-600 hover:bg-indigo-500">
            <Link href={CONFIG_ROUTES.niche}>
              Começar configuração
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
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

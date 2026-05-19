"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  Hammer,
  History,
  LayoutDashboard,
  MessageSquare,
  PhoneOff,
  Route,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Users,
  Wrench,
  X,
  Zap,
  Layers,
  GitBranch,
  ListChecks,
  Upload,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HeroMockup } from "./hero-mockup";
import {
  fadeUp,
  GridBackground,
  LiveBadge,
  SectionHeading,
  staggerContainer,
} from "./landing-shared";
import { SystemMockupsSection } from "./system-mockups";

const PROBLEMS_BEFORE = [
  "Cliente ligando todo dia perguntando andamento",
  "Informações perdidas no WhatsApp da equipe",
  "Etapas esquecidas e prazos estourando",
  "Equipe desalinhada sobre o que fazer agora",
  "Retrabalho por falta de visibilidade",
] as const;

const PROBLEMS_AFTER = [
  "Cliente acompanha sozinho, em tempo real",
  "Tudo centralizado: etapas, fotos e mensagens",
  "Cada passo registrado e visível para todos",
  "Equipe sabe exatamente a prioridade do dia",
  "Operação organizada e profissional",
] as const;

const FLOW_STEPS = [
  {
    step: "1",
    title: "Serviço criado",
    description: "Registre o pedido com cliente, prazo e etapas do seu processo.",
    icon: Sparkles,
  },
  {
    step: "2",
    title: "Equipe recebe",
    description: "A equipe de campo vê na hora o que entrou e o que precisa fazer.",
    icon: Users,
  },
  {
    step: "3",
    title: "Etapas atualizadas",
    description: "Cada avanço registrado com fotos, comentários e horário.",
    icon: ListChecks,
  },
  {
    step: "4",
    title: "Cliente acompanha",
    description: "Seu cliente vê o andamento sem precisar ligar ou mandar mensagem.",
    icon: Eye,
  },
  {
    step: "5",
    title: "Aprovações",
    description: "Peça confirmação em etapas críticas antes de seguir.",
    icon: CheckCircle2,
  },
  {
    step: "6",
    title: "Finalização",
    description: "Histórico completo do serviço, do início ao fim.",
    icon: Shield,
  },
] as const;

const NICHES = [
  {
    icon: Hammer,
    title: "Funilaria",
    problem: "Cliente ansioso ligando sobre o carro na oficina.",
    flow: "Etapas de desmontagem, funilaria, pintura e entrega visíveis.",
    benefit: "Menos ligações, mais confiança e reputação profissional.",
  },
  {
    icon: Building2,
    title: "Construção civil",
    problem: "Obra com muitas fases e comunicação espalhada.",
    flow: "Acompanhe fundação, estrutura, acabamento e entregas por etapa.",
    benefit: "Cliente e equipe alinhados em cada fase da obra.",
  },
  {
    icon: Wrench,
    title: "Assistência técnica",
    problem: "Ordens de serviço perdidas e status desatualizado.",
    flow: "Recebimento, diagnóstico, reparo e retirada com histórico.",
    benefit: "Transparência total do equipamento na bancada.",
  },
  {
    icon: Sun,
    title: "Energia solar",
    problem: "Instalação longa com várias etapas e fornecedores.",
    flow: "Projeto, aprovação, instalação e homologação acompanhados.",
    benefit: "Cliente acompanha cada marco até a energia ligada.",
  },
  {
    icon: Smartphone,
    title: "Telecom",
    problem: "Instalações e chamados sem visibilidade para o cliente.",
    flow: "Agendamento, execução em campo e ativação registrados.",
    benefit: "Menos reclamações e mais satisfação no pós-venda.",
  },
  {
    icon: Layers,
    title: "Móveis planejados",
    problem: "Produção longa com medidas, fabricação e montagem.",
    flow: "Medição, produção, entrega e montagem em etapas claras.",
    benefit: "Cliente acompanha o móvel até estar na casa dele.",
  },
] as const;

const FEATURES = [
  { icon: Route, title: "Timeline operacional", desc: "Veja cada etapa do serviço em ordem, com datas e responsáveis." },
  { icon: Zap, title: "Atualizações em tempo real", desc: "Mudou na oficina? O cliente e a equipe veem na hora." },
  { icon: Upload, title: "Upload de fotos", desc: "Registre visualmente cada etapa — prova e transparência." },
  { icon: MessageSquare, title: "Comentários", desc: "Converse no contexto certo, sem perder no WhatsApp." },
  { icon: GitBranch, title: "Fluxos personalizados", desc: "Adapte as etapas ao jeito que sua empresa realmente trabalha." },
  { icon: Users, title: "Equipes", desc: "Atribua responsáveis e organize quem faz o quê." },
  { icon: CheckCircle2, title: "Aprovações", desc: "Cliente confirma etapas críticas antes de seguir." },
  { icon: History, title: "Histórico completo", desc: "Tudo registrado: quem fez, quando e o que aconteceu." },
  { icon: Bell, title: "Notificações", desc: "Avise equipe e cliente quando algo mudar." },
  { icon: LayoutDashboard, title: "Painel operacional", desc: "Visão geral de todos os serviços em andamento." },
  { icon: Eye, title: "Acompanhamento visual", desc: "Interface clara que qualquer pessoa entende." },
  { icon: Workflow, title: "Controle por etapas", desc: "Nada fica esquecido no meio do caminho." },
] as const;

const BENEFITS = [
  { icon: PhoneOff, title: "Menos ligações e mensagens", desc: "Cliente acompanha sozinho. Sua equipe foca em executar." },
  { icon: LayoutDashboard, title: "Mais organização", desc: "Todos os serviços visíveis, priorizados e sob controle." },
  { icon: Eye, title: "Transparência total", desc: "Cliente e equipe veem a mesma verdade, sempre atualizada." },
  { icon: Users, title: "Equipe alinhada", desc: "Cada um sabe o que fazer, sem retrabalho ou confusão." },
  { icon: Clock, title: "Menos atrasos", desc: "Etapas claras evitam esquecimentos e gargalos." },
  { icon: Sparkles, title: "Mais profissionalismo", desc: "Passe confiança desde o primeiro contato até a entrega." },
  { icon: Shield, title: "Controle operacional", desc: "Dono e gestor enxergam a operação sem microgerenciar." },
  { icon: Camera, title: "Registro visual", desc: "Fotos e histórico protegem sua empresa e o cliente." },
] as const;

const NAV_LINKS = [
  { href: "#problemas", label: "O problema" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#nichos", label: "Segmentos" },
  { href: "#recursos", label: "Recursos" },
  { href: "#mockups", label: "Plataforma" },
] as const;

export function OperivaLanding() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070809] text-zinc-100">
      <GridBackground reducedMotion={!!reducedMotion} />

      {/* Navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <motion.a
          href="#"
          className="flex items-center gap-2.5"
          initial={reducedMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
            <Layers className="size-4 text-emerald-400" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Operiva
          </span>
        </motion.a>

        <motion.nav
          className="hidden items-center gap-6 text-sm text-zinc-500 lg:flex"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-zinc-200"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>

        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-zinc-400 hover:text-white sm:inline-flex"
            asChild
          >
            <Link href="/app">Entrar</Link>
          </Button>
          <Button
            size="sm"
            className="border-emerald-500/30 bg-emerald-500/15 text-emerald-50 hover:bg-emerald-500/25"
          >
            Solicitar demonstração
            <ArrowRight className="size-3.5" />
          </Button>
        </motion.div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 pb-8 pt-4 md:px-8 md:pb-12">
        <motion.div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LiveBadge>Plataforma operacional em tempo real</LiveBadge>
          </motion.div>

          <motion.h1
            className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Seus clientes não precisam mais{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              perguntar como está.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            A Operiva organiza sua operação do dia a dia: etapas visuais,
            atualizações em tempo real, fotos, aprovações e acompanhamento do
            cliente — tudo em um só lugar. Finalmente, ordem no caos
            operacional.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Button
              size="lg"
              className="h-11 gap-2 border-emerald-500/40 bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 text-white shadow-lg shadow-emerald-950/40 hover:from-emerald-500 hover:to-emerald-400"
            >
              Solicitar demonstração
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-white/10 bg-white/[0.02] px-6 text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              asChild
            >
              <Link href="/app">Ver plataforma funcionando</Link>
            </Button>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-zinc-600"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Para funilarias, obras, assistências técnicas, energia solar,
            telecom, móveis planejados e qualquer operação com etapas.
          </motion.p>
        </motion.div>

        <HeroMockup />
      </section>

      {/* Problemas operacionais */}
      <section
        id="problemas"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
      >
        <motion.div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="O caos que você conhece"
            title="Sua operação não precisa ser um quebra-cabeça"
            description="Todo dia é a mesma história: cliente cobrando, equipe perdida, informação espalhada. A Operiva transforma isso em um fluxo claro que todos entendem."
          />

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Antes */}
            <motion.div variants={fadeUp}>
              <Card className="h-full border-red-500/15 bg-red-950/10 py-0 ring-red-500/10">
                <CardHeader className="border-b border-red-500/10 pb-4">
                  <div className="flex items-center gap-2">
                    <motion.div className="flex size-8 items-center justify-center rounded-lg bg-red-500/10">
                      <X className="size-4 text-red-400" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-white">Antes</CardTitle>
                      <CardDescription className="text-red-300/60">
                        Operação desorganizada
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {PROBLEMS_BEFORE.map((problem) => (
                    <div
                      key={problem}
                      className="flex items-start gap-3 rounded-lg bg-red-500/5 px-3 py-2.5"
                    >
                      <X className="mt-0.5 size-4 shrink-0 text-red-400/80" />
                      <p className="text-sm text-zinc-400">{problem}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Depois */}
            <motion.div variants={fadeUp}>
              <Card className="h-full border-emerald-500/20 bg-emerald-950/10 py-0 ring-emerald-500/15">
                <CardHeader className="border-b border-emerald-500/10 pb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10"
                      animate={
                        reducedMotion
                          ? undefined
                          : { boxShadow: ["0 0 0 0 rgba(16,185,129,0.3)", "0 0 0 8px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }
                      }
                      transition={
                        reducedMotion
                          ? undefined
                          : { duration: 2.5, repeat: Infinity }
                      }
                    >
                      <CheckCircle2 className="size-4 text-emerald-400" />
                    </motion.div>
                    <motion.div>
                      <CardTitle className="text-white">Com a Operiva</CardTitle>
                      <CardDescription className="text-emerald-400/70">
                        Operação sob controle
                      </CardDescription>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {PROBLEMS_AFTER.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-lg bg-emerald-500/5 px-3 py-2.5"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                      <p className="text-sm text-zinc-300">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
      >
        <motion.div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Como funciona"
            title="Do pedido à entrega, tudo visível"
            description="Um fluxo simples que sua equipe e seu cliente entendem na hora — sem planilha, sem grupo de WhatsApp perdido."
            align="center"
          />

          <motion.div
            className="relative"
            variants={staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              aria-hidden
              className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent md:block"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FLOW_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    whileHover={
                      reducedMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
                    }
                    className="group relative rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-colors hover:border-emerald-500/20"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                        <Icon className="size-5 text-emerald-400/90" />
                      </div>
                      <span className="text-2xl font-semibold tabular-nums text-zinc-700">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>
                    {index < FLOW_STEPS.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute -right-3 top-1/2 hidden size-6 items-center justify-center rounded-full border border-white/10 bg-[#070809] text-zinc-600 lg:flex"
                      >
                        →
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Nichos */}
      <section
        id="nichos"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
      >
        <motion.div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Segmentos atendidos"
            title="Feita para quem vive da operação no dia a dia"
            description="Cada segmento tem seu jeito de trabalhar. A Operiva se adapta ao seu fluxo — não o contrário."
            align="center"
          />

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {NICHES.map((niche) => {
              const Icon = niche.icon;
              return (
                <motion.div key={niche.title} variants={fadeUp}>
                  <Card
                    className="h-full border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent py-0 ring-white/[0.06] transition-colors hover:border-emerald-500/20 hover:ring-emerald-500/10"
                  >
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-emerald-500/10">
                        <Icon className="size-5 text-emerald-400" />
                      </div>
                      <CardTitle className="text-white">{niche.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-5">
                      <motion.div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-red-400/80">
                          Problema
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">{niche.problem}</p>
                      </motion.div>
                      <motion.div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-400/80">
                          Fluxo na Operiva
                        </p>
                        <p className="mt-1 text-sm text-zinc-400">{niche.flow}</p>
                      </motion.div>
                      <motion.div className="rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-3 py-2">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                          Benefício
                        </p>
                        <p className="mt-1 text-sm text-emerald-100/80">
                          {niche.benefit}
                        </p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Recursos */}
      <section
        id="recursos"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
      >
        <motion.div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Recursos da plataforma"
            title="Tudo que sua operação precisa, nada que atrapalha"
            description="Ferramentas pensadas para quem executa serviços com etapas, equipes e clientes ansiosos — não para escritório burocrático."
            align="center"
          />

          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={
                    reducedMotion ? undefined : { y: -3, transition: { duration: 0.2 } }
                  }
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.04]"
                >
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors group-hover:border-emerald-500/25 group-hover:bg-emerald-500/10">
                    <Icon className="size-4 text-emerald-400/90" />
                  </div>
                  <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Mockups do sistema */}
      <SystemMockupsSection />

      {/* Benefícios */}
      <section
        id="beneficios"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-8 md:py-32"
      >
        <motion.div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Benefícios"
            title="O que muda na prática para sua empresa"
            description="Menos estresse, mais controle e clientes que confiam no seu trabalho — porque enxergam cada passo."
            align="center"
          />

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                    <Icon className="size-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">{benefit.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center md:px-12"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-medium text-zinc-200 md:text-xl">
              &quot;Finalmente alguém resolveu o caos operacional da minha
              empresa.&quot;
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              — O que donos de negócios operacionais dizem quando veem a
              Operiva pela primeira vez.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 px-6 pb-24 md:px-8 md:pb-32">
        <motion.div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-[#0c0d0f] to-cyan-950/30 px-8 py-16 text-center md:px-16 md:py-20"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            animate={
              reducedMotion
                ? undefined
                : {
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15), transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(34,211,238,0.12), transparent 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15), transparent 50%)",
                    ],
                  }
            }
            transition={
              reducedMotion
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <Badge
            variant="outline"
            className="relative mb-4 border-emerald-500/25 bg-emerald-500/5 text-emerald-400"
          >
            Comece agora
          </Badge>
          <h2 className="relative text-2xl font-semibold text-white md:text-4xl">
            Pronto para acabar com o caos operacional?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-zinc-400 md:text-lg">
            Veja a Operiva funcionando com o fluxo da sua empresa. Demonstração
            personalizada, sem compromisso — em poucos minutos você entende o
            impacto.
          </p>
          <motion.div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="h-11 gap-2 border-emerald-500/40 bg-emerald-500 px-6 text-white hover:bg-emerald-400"
            >
              Começar agora
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-white/10 bg-transparent px-6 text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              asChild
            >
              <Link href="/app">Explorar o sistema</Link>
            </Button>
          </motion.div>
          <p className="relative mt-6 text-xs text-zinc-600">
            Implantação rápida · Suporte em português · Feito para operações
            reais
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10 md:px-8">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2.5">
            <motion.div className="flex size-7 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/10">
              <Layers className="size-3.5 text-emerald-400" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-white">Operiva</p>
              <p className="text-xs text-zinc-600">
                Plataforma operacional visual
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-zinc-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Operiva. Todos os direitos reservados.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

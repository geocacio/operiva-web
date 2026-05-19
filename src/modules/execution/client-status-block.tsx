"use client";

import { Eye, Hourglass, MinusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import type { ClientEngagementStatus } from "@/types/execution";

const statusConfig: Record<
  ClientEngagementStatus,
  {
    label: string;
    description: string;
    icon: typeof Eye;
    card: string;
    iconWrap: string;
    title: string;
  }
> = {
  acompanhando: {
    label: "Cliente está acompanhando",
    description: "Visualizações recentes na timeline do serviço.",
    icon: Eye,
    card: "border-[#10B981]/30 bg-[#10B981]/5",
    iconWrap: "bg-[#10B981]/10 text-[#10B981]",
    title: "text-[#10B981]",
  },
  pendente_aprovacao: {
    label: "Cliente pendente de aprovação",
    description: "Aguardando resposta para liberar a próxima etapa.",
    icon: Hourglass,
    card: "border-[#F59E0B]/30 bg-[#F59E0B]/5",
    iconWrap: "bg-[#F59E0B]/10 text-[#F59E0B]",
    title: "text-[#F59E0B]",
  },
  sem_interacao: {
    label: "Sem interação necessária",
    description: "Nenhuma ação pendente do cliente neste momento.",
    icon: MinusCircle,
    card: "border-[#1F2937] bg-[#1F2937]/30",
    iconWrap: "bg-[#1F2937] text-[#9CA3AF]",
    title: "text-[#9CA3AF]",
  },
};

export function ClientStatusBlock({
  status,
}: {
  status: ClientEngagementStatus;
}) {
  const { reduced } = useMotionConfig();
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      key={status}
    >
      <GlassCard className={cn("flex items-start gap-3 border p-4", cfg.card)}>
        <motion.div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            cfg.iconWrap
          )}
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          <Icon className="size-5" />
        </motion.div>
        <motion.div>
          <p className={cn("text-sm font-medium", cfg.title)}>{cfg.label}</p>
          <p className="mt-0.5 text-xs text-[#9CA3AF]">{cfg.description}</p>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}

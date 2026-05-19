import type { ClientPortalData, PortalTimelineItem } from "@/types/portal";

const GRADIENTS = [
  "linear-gradient(135deg, #1e3a5f 0%, #3B82F6 50%, #06B6D4 100%)",
  "linear-gradient(135deg, #064e3b 0%, #10B981 50%, #34d399 100%)",
  "linear-gradient(135deg, #78350f 0%, #F59E0B 50%, #fbbf24 100%)",
  "linear-gradient(135deg, #312e81 0%, #6366f1 50%, #a78bfa 100%)",
  "linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #38bdf8 100%)",
  "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c4b5fd 100%)",
];

export function portalGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % GRADIENTS.length;
  }
  return GRADIENTS[hash]!;
}

export function sortTimelineNewestFirst<T extends { createdAt: string }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function collectTimelinePhotos(
  items: import("@/types/portal").PortalTimelineItem[]
): import("@/types/portal").PortalTimelinePhoto[] {
  return items.flatMap((item) => item.photos ?? []);
}

export function formatHumanTimestamp(dateIso: string): string {
  const then = new Date(dateIso).getTime();
  const diffMs = Date.now() - then;
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "agora";
  if (diffMin < 3) return "há poucos minutos";
  if (diffMin < 60) return `há ${diffMin} minutos`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? "há 1 hora" : `há ${diffHours} horas`;
  }

  const thenDate = new Date(dateIso);
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const startOfYesterday = startOfToday - 86_400_000;

  if (then >= startOfToday) return "hoje";
  if (then >= startOfYesterday) return "ontem";

  return thenDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
  });
}

export function formatLiveUpdateLabel(dateIso: string): string {
  const human = formatHumanTimestamp(dateIso);
  if (human === "agora" || human === "há poucos minutos") {
    return `Atualizado ${human}`;
  }
  return `Atualizado ${human}`;
}

export function isJustSent(dateIso: string): boolean {
  const diffMin = Math.floor(
    (Date.now() - new Date(dateIso).getTime()) / 60_000
  );
  return diffMin < 2;
}

export function justSentLabel(dateIso: string): string | null {
  return isJustSent(dateIso) ? "acabou de ser enviado" : null;
}

export function isImportantTimelineItem(item: PortalTimelineItem): boolean {
  if (item.celebration || item.type === "marco") return true;
  return [
    "aprovacao",
    "video",
    "audio",
    "foto",
    "etapa",
    "antes_depois",
  ].includes(item.type);
}

export function isCompactTimelineItem(item: PortalTimelineItem): boolean {
  return (
    item.feedSize === "compact" ||
    item.type === "status" ||
    (item.type === "mensagem" && !item.feedSize)
  );
}

export function getFeedVisualWeight(
  item: PortalTimelineItem,
  index: number
): "hero" | "standard" | "compact" {
  if (item.feedSize === "large" || isImportantTimelineItem(item)) {
    return index % 3 === 2 ? "hero" : "standard";
  }
  if (isCompactTimelineItem(item)) return "compact";
  return "standard";
}

export interface EmotionalHeroCopy {
  headline: string;
  emoji?: string;
  subline?: string;
}

export function getEmotionalHeroMessage(
  portal: ClientPortalData
): EmotionalHeroCopy {
  const step = portal.currentJourneyStep;
  const pct = portal.progressPercent;

  if (portal.pendingApproval?.status === "pendente") {
    return {
      headline: "Só precisamos da sua confirmação para continuar",
      emoji: "🛡️",
      subline: "Revise com calma — sua decisão libera a entrega",
    };
  }
  if (step === "finalizado" || pct >= 100) {
    return {
      headline: "Seu serviço foi concluído com sucesso",
      emoji: "🎉",
    };
  }
  if (step === "aguardando_aprovacao" || pct >= 80) {
    return {
      headline: "Estamos muito próximos da conclusão",
      emoji: "🎉",
    };
  }
  if (pct >= 60) {
    return {
      headline: "Nossa equipe está trabalhando nos ajustes finais",
      emoji: "🛠️",
    };
  }
  if (pct >= 25 || step === "em_execucao") {
    return {
      headline: "Sua instalação está avançando perfeitamente",
      emoji: "✨",
    };
  }
  if (step === "recebido" || step === "em_analise") {
    return {
      headline: "Sua solicitação já está com a equipe",
      emoji: "🟢",
    };
  }
  return {
    headline: "Sua instalação está avançando perfeitamente",
    emoji: "✨",
  };
}

export function formatLiveActivityLabel(
  activity: ClientPortalData["liveActivity"]
): string | null {
  if (!activity) return null;
  return `${activity.teamMemberName} ${activity.actionLabel}`;
}

export const SERVICE_HERO_THEMES = {
  solar: {
    gradient:
      "linear-gradient(165deg, #0c1929 0%, #1e3a5f 28%, #b45309 62%, #fbbf24 88%, #fef3c7 100%)",
    ambient: "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(245,158,11,0.35), transparent)",
    icon: "☀️",
    label: "Energia solar",
  },
  construction: {
    gradient:
      "linear-gradient(165deg, #0B0F19 0%, #374151 38%, #F59E0B 72%, #d97706 100%)",
    ambient: "radial-gradient(ellipse 70% 45% at 30% 30%, rgba(245,158,11,0.25), transparent)",
    icon: "🏗️",
    label: "Obra em campo",
  },
  vehicle: {
    gradient:
      "linear-gradient(165deg, #0B0F19 0%, #1e3a5f 45%, #3B82F6 78%, #06B6D4 100%)",
    ambient: "radial-gradient(ellipse 60% 40% at 80% 40%, rgba(59,130,246,0.3), transparent)",
    icon: "🚗",
    label: "Serviço veicular",
  },
  default: {
    gradient:
      "linear-gradient(165deg, #0B0F19 0%, #1F2937 42%, #3B82F6 78%, #06B6D4 100%)",
    ambient: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(6,182,212,0.2), transparent)",
    icon: "⚡",
    label: "Seu serviço",
  },
} as const;

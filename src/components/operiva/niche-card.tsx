"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/hooks/use-motion";
import type { NicheDefinition } from "@/types/niche";
import { IconByName } from "./icon-by-name";

export function NicheCard({
  niche,
  onSelect,
  delay = 0,
}: {
  niche: NicheDefinition;
  onSelect: () => void;
  delay?: number;
}) {
  const { fade } = useMotionConfig();

  return (
    <GlassCard delay={delay} className="group overflow-hidden p-0">
      <div
        className={`h-2 bg-gradient-to-r ${niche.gradient}`}
        style={{ background: `linear-gradient(90deg, ${niche.accentColor}40, transparent)` }}
      />
      <motion.div className="p-6" {...fade}>
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex size-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${niche.accentColor}22` }}
          >
            <span style={{ color: niche.accentColor }}>
              <IconByName name={niche.icon} className="size-7" />
            </span>
          </div>
          <Badge variant="outline" className="border-white/10">
            {niche.stepCount} etapas
          </Badge>
        </div>
        <h3 className="mt-4 text-xl font-semibold">{niche.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{niche.description}</p>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Ex.: {niche.exampleFlow}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {niche.traits.map((t) => (
            <Badge
              key={t.id}
              className="border-white/8 bg-white/5 text-[11px] font-normal"
            >
              <IconByName name={t.icon} className="mr-1 size-3" />
              {t.label}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex gap-1 overflow-hidden rounded-lg border border-white/6 bg-black/20 p-2">
          {niche.defaultSteps.slice(0, 6).map((s, i) => (
            <div
              key={s}
              className="h-8 min-w-0 flex-1 rounded bg-white/5 px-1 text-center text-[9px] leading-8 text-muted-foreground truncate"
              title={s}
            >
              {i < 5 ? s.split(" ")[0] : "…"}
            </div>
          ))}
        </div>
        <Button
          className="mt-6 w-full gap-2 bg-indigo-600 hover:bg-indigo-500"
          onClick={onSelect}
        >
          Configurar {niche.name}
          <ArrowRight className="size-4" />
        </Button>
      </motion.div>
    </GlassCard>
  );
}

"use client";

import Link from "next/link";
import { Copy, Eye, Pencil, Play } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { useMotionConfig } from "@/hooks/use-motion";
import type { OperivaTemplate } from "@/types/operiva-template";

export function TemplateCard({
  template,
  onUse,
  onDuplicate,
  delay = 0,
}: {
  template: OperivaTemplate;
  onUse: () => void;
  onDuplicate: () => void;
  delay?: number;
}) {
  const { fade } = useMotionConfig();

  return (
    <GlassCard delay={delay} className="flex h-full flex-col p-5">
      <motion.div className="flex flex-1 flex-col" {...fade}>
        <div className="flex flex-wrap gap-2">
          {template.badges.map((b) => (
            <Badge key={b} variant="outline" className="border-white/10 text-[10px]">
              {b}
            </Badge>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-semibold">{template.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">
          {template.description}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-white/5 py-2">
            <p className="font-semibold text-foreground">{template.stepCount}</p>
            <p className="text-muted-foreground">etapas</p>
          </div>
          <div className="rounded-lg bg-white/5 py-2">
            <p className="font-semibold text-foreground">{template.avgDays}d</p>
            <p className="text-muted-foreground">média</p>
          </div>
          <div className="rounded-lg bg-white/5 py-2">
            <p className="font-semibold text-foreground">{template.teamIds.length}</p>
            <p className="text-muted-foreground">equipes</p>
          </div>
        </div>
        <div className="mt-3 flex gap-0.5 overflow-hidden rounded-md border border-white/6 p-1">
          {template.steps.slice(0, 8).map((s) => (
            <div
              key={s.id}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: s.color }}
              title={s.name}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" className="gap-1 bg-indigo-600" onClick={onUse}>
            <Play className="size-3.5" />
            Usar template
          </Button>
          <Button size="sm" variant="outline" className="gap-1 border-white/10" asChild>
            <Link href={CONFIG_ROUTES.templatePreview(template.id)}>
              <Eye className="size-3.5" />
              Visualizar
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            onClick={onDuplicate}
          >
            <Copy className="size-3.5" />
            Duplicar
          </Button>
          <Button size="sm" variant="ghost" className="gap-1" asChild>
            <Link href={CONFIG_ROUTES.templateEdit(template.id)}>
              <Pencil className="size-3.5" />
              Editar
            </Link>
          </Button>
        </div>
      </motion.div>
    </GlassCard>
  );
}

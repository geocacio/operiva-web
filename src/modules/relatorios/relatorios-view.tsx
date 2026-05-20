"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { APP_ROUTES } from "@/lib/constants";

export function RelatoriosView() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <GlassCard className="max-w-lg p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/15 text-emerald-400">
          <Sparkles className="size-7" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">
          Clareza operacional vive em Insights
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Gargalos, ranking, heatmap e copiloto operacional — não relatório
          corporativo. Operiva Insights entrega leitura em 30 segundos para
          decidir na operação.
        </p>
        <Link
          href={APP_ROUTES.insights}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(16,185,129,0.2)] hover:opacity-95"
        >
          <BarChart3 className="size-4" />
          Abrir Insights
          <ArrowRight className="size-4" />
        </Link>
      </GlassCard>
    </div>
  );
}

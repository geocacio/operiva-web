"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { TemplateCard } from "@/components/operiva/template-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_ROUTES, TEMPLATE_ROUTES } from "@/lib/constants";
import { loadCustomTemplates } from "@/lib/template-draft-storage";
import { getNicheById } from "@/mocks/niches";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedNiche } from "@/store/slices/niche-slice";
import {
  duplicateTemplateById,
  hydrateCustomTemplates,
  selectTemplate,
  setLibraryLoading,
} from "@/store/slices/template-slice";
import type { NicheId } from "@/types/niche";

export function TemplateLibraryView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const selectedNiche = useAppSelector((s) => s.niche.selectedNiche);
  const companyNiche = useAppSelector((s) => s.company.nicheId);
  const nicheParam = (params.get("nicho") ??
    companyNiche ??
    selectedNiche ??
    "funilaria") as NicheId;
  const loading = useAppSelector((s) => s.template.libraryLoading);
  const templates = useAppSelector((s) => s.template.templates);

  const niche = getNicheById(nicheParam);
  const filtered = useMemo(
    () => templates.filter((t) => t.nicheId === nicheParam),
    [templates, nicheParam]
  );

  useEffect(() => {
    dispatch(hydrateCustomTemplates(loadCustomTemplates()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedNiche(nicheParam));
  }, [dispatch, nicheParam]);

  useEffect(() => {
    dispatch(setLibraryLoading(true));
    const t = setTimeout(() => dispatch(setLibraryLoading(false)), 500);
    return () => clearTimeout(t);
  }, [dispatch, nicheParam]);

  const handleUse = (id: string) => {
    dispatch(selectTemplate(id));
    router.push(`${APP_ROUTES.novoServico}?template=${id}`);
  };

  const handleDuplicate = (id: string) => {
    dispatch(duplicateTemplateById(id));
    const newId = store.getState().template.activeTemplateId;
    if (newId) router.push(TEMPLATE_ROUTES.templateEdit(newId));
  };

  return (
    <div>
      <ConfigBreadcrumbs
        items={[
          { label: "Modelos", href: TEMPLATE_ROUTES.library },
          { label: niche?.name ?? nicheParam },
        ]}
      />
      <div className="mb-4 rounded-xl border border-indigo-500/15 bg-indigo-500/5 px-4 py-3">
        <p className="text-xs text-indigo-300">
          <strong className="font-medium">Modelos de plano inicial</strong> — aceleradores para criação de serviços.
          Após criar o serviço, ele é totalmente independente: adicione, remova e reordene etapas livremente.
        </p>
      </div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Modelos disponíveis</h2>
          <p className="mt-1 text-muted-foreground">
            {filtered.length} modelos para {niche?.name ?? nicheParam}
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2 border-white/10">
          <Link href={`${TEMPLATE_ROUTES.templateNew}?nicho=${nicheParam}`}>
            <Plus className="size-4" />
            Criar do zero
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tpl, i) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              delay={i * 0.05}
              onUse={() => handleUse(tpl.id)}
              onDuplicate={() => handleDuplicate(tpl.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

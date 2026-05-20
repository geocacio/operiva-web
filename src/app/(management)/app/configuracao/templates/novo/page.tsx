"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { CONFIG_ROUTES } from "@/lib/constants";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { createBlankTemplate } from "@/store/slices/template-slice";
import type { NicheId } from "@/types/niche";
import { Skeleton } from "@/components/ui/skeleton";

function NovoTemplateRedirect() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const niche = (params.get("nicho") ?? "funilaria") as NicheId;

  useEffect(() => {
    dispatch(createBlankTemplate(niche));
    const newId = store.getState().template.activeTemplateId;
    if (newId) router.replace(CONFIG_ROUTES.templateEdit(newId));
  }, [dispatch, niche, router]);

  return <Skeleton className="h-96 w-full rounded-xl" />;
}

export default function NovoTemplatePage() {
  return (
    <AppShell title="Novo template" subtitle="Criando rascunho…">
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
        <NovoTemplateRedirect />
      </Suspense>
    </AppShell>
  );
}

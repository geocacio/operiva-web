"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { TEMPLATE_ROUTES } from "@/lib/constants";
import { useAppDispatch } from "@/store/hooks";
import { createBlankTemplate } from "@/store/slices/template-slice";
import { store } from "@/store";
import type { NicheId } from "@/types/niche";

export default function TemplateNovoPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const nicho = (params.get("nicho") ?? "funilaria") as NicheId;

  useEffect(() => {
    dispatch(createBlankTemplate(nicho));
    const id = store.getState().template.activeTemplateId;
    if (id) {
      router.replace(TEMPLATE_ROUTES.templateEdit(id));
    }
  }, [dispatch, nicho, router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Skeleton className="h-8 w-48" />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { NicheCard } from "@/components/operiva/niche-card";
import { CONFIG_ROUTES } from "@/lib/constants";
import { mockNiches } from "@/mocks/niches";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedNiche } from "@/store/slices/niche-slice";
import type { NicheId } from "@/types/niche";

export function NicheSelectionView() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelect = (id: NicheId) => {
    dispatch(setSelectedNiche(id));
    router.push(`${CONFIG_ROUTES.templates}?nicho=${id}`);
  };

  return (
    <div>
      <ConfigBreadcrumbs items={[{ label: "Escolher nicho" }]} />
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Qual é o seu nicho?</h2>
        <p className="mt-1 text-muted-foreground">
          Cada nicho traz fluxos, equipes e visibilidade do cliente pré-configurados.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {mockNiches.map((niche, i) => (
          <NicheCard
            key={niche.id}
            niche={niche}
            delay={i * 0.08}
            onSelect={() => handleSelect(niche.id)}
          />
        ))}
      </div>
    </div>
  );
}

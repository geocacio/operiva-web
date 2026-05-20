"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Building2,
  Layers,
  Palette,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  APP_ROUTES,
  TEMPLATE_ROUTES,
} from "@/lib/constants";
import { getNicheById } from "@/mocks/niches";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetOnboarding,
  setCompanyName,
  setCompanyNiche,
} from "@/store/slices/company-slice";
import { setSelectedNiche } from "@/store/slices/niche-slice";
import type { NicheId } from "@/types/niche";

export function SettingsView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const company = useAppSelector((s) => s.company);
  const niche = company.nicheId ? getNicheById(company.nicheId) : null;

  const handleNicheChange = (id: NicheId) => {
    if (
      !confirm(
        "Alterar o nicho pode afetar templates e fluxos existentes. Continuar (demo)?"
      )
    ) {
      return;
    }
    dispatch(setCompanyNiche(id));
    dispatch(setSelectedNiche(id));
  };

  const handleResetOnboarding = () => {
    if (!confirm("Reiniciar onboarding e limpar dados da empresa (demo)?")) return;
    dispatch(resetOnboarding());
    router.push(APP_ROUTES.onboarding);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Building2 className="size-4 text-[#3B82F6]" />
          Empresa
        </div>
        <Separator className="my-4 bg-white/8" />
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">Nome da empresa</label>
            <Input
              value={company.companyName}
              onChange={(e) => dispatch(setCompanyName(e.target.value))}
              placeholder="Nome exibido no portal"
              className="mt-1 border-white/10 bg-white/5"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Nicho operacional</label>
            <p className="mt-1 text-sm">
              {niche?.name ?? "Não definido"}
              {company.nicheId && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({company.nicheId})
                </span>
              )}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["funilaria", "construcao"] as NicheId[]).map((id) => (
                <Button
                  key={id}
                  size="sm"
                  variant={company.nicheId === id ? "default" : "outline"}
                  className={
                    company.nicheId === id ? "bg-[#3B82F6]" : "border-white/10"
                  }
                  onClick={() => handleNicheChange(id)}
                >
                  {getNicheById(id)?.name}
                </Button>
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-[11px] text-[#F59E0B]">
              <AlertTriangle className="size-3" />
              Alteração com aviso — apenas demo local
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Layers className="size-4 text-[#06B6D4]" />
          Templates
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          {company.selectedTemplateIds.length > 0
            ? `${company.selectedTemplateIds.length} templates selecionados no onboarding.`
            : "Gerencie a biblioteca de fluxos da empresa."}
        </p>
        <Button asChild className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB]">
          <Link href={TEMPLATE_ROUTES.library}>Abrir biblioteca</Link>
        </Button>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bell className="size-4 text-[#3B82F6]" />
          Notificações
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          Alertas de atraso, aprovações e atualizações de etapas — preferências mock
          até integração com backend.
        </p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Palette className="size-4 text-[#3B82F6]" />
          Marca e aparência
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          Logo, cores e tema do portal do cliente — personalização em breve (mock).
        </p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-[#10B981]" />
          Demo
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          Reinicie o fluxo de onboarding para demonstrar a configuração inicial.
        </p>
        <Button
          variant="outline"
          className="mt-4 gap-2 border-[#EF4444]/30 text-[#EF4444]"
          onClick={handleResetOnboarding}
        >
          <RotateCcw className="size-4" />
          Resetar onboarding
        </Button>
      </GlassCard>
    </div>
  );
}

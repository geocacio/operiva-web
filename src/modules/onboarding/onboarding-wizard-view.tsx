"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Check, Sparkles } from "lucide-react";
import { WizardProgress } from "@/components/operiva/wizard-progress";
import { IconByName } from "@/components/operiva/icon-by-name";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { APP_ROUTES } from "@/lib/constants";
import { onboardingNicheOptions } from "@/mocks/onboarding-niches";
import { getTemplatesByNiche } from "@/mocks/templates";
import { configTeamRoles } from "@/mocks/config-teams";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { completeOnboarding } from "@/store/slices/company-slice";
import { setSelectedNiche } from "@/store/slices/niche-slice";
import type { NicheId } from "@/types/niche";
import { cn } from "@/lib/utils";

const STEPS = [
  "Empresa",
  "Nicho",
  "Templates",
  "Equipe",
  "Concluir",
] as const;

export function OnboardingWizardView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [nicheId, setNicheId] = useState<NicheId | null>(null);
  const [templateIds, setTemplateIds] = useState<string[]>([]);
  const [roleIds, setRoleIds] = useState<string[]>([]);
  const onboardingComplete = useAppSelector((s) => s.company.onboardingComplete);
  const hydrated = useAppSelector((s) => s.company.hydrated);

  useEffect(() => {
    if (hydrated && onboardingComplete) {
      router.replace(APP_ROUTES.dashboard);
    }
  }, [hydrated, onboardingComplete, router]);

  const templates = nicheId ? getTemplatesByNiche(nicheId) : [];
  const roles = nicheId
    ? configTeamRoles.filter((r) => r.nicheId === nicheId)
    : [];

  const toggleTemplate = (id: string) => {
    setTemplateIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleRole = (id: string) => {
    setRoleIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 1) return companyName.trim().length >= 2;
    if (step === 2) return nicheId !== null;
    if (step === 3) return templateIds.length > 0;
    if (step === 4) return roleIds.length > 0;
    return true;
  };

  const handleFinish = () => {
    if (!nicheId) return;
    dispatch(setSelectedNiche(nicheId));
    dispatch(
      completeOnboarding({
        companyName: companyName.trim(),
        nicheId,
        selectedTemplateIds: templateIds,
        initialTeamRoleIds: roleIds,
      })
    );
    router.push(APP_ROUTES.dashboard);
  };

  return (
    <div className="min-h-dvh bg-[#0B0F19] px-4 py-8 text-[#F9FAFB]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#3B82F6]/20 text-[#3B82F6]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Configure sua operação</h1>
            <p className="text-sm text-[#9CA3AF]">
              Empresa, nicho, templates e equipe — em poucos passos
            </p>
          </div>
        </div>

        <WizardProgress steps={[...STEPS]} currentStep={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <GlassCard className="p-6">
                <label className="text-sm font-medium">Nome da empresa</label>
                <p className="mt-1 text-sm text-[#9CA3AF]">
                  Como seus clientes verão sua marca no portal.
                </p>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex.: Oficina Silva & Cia"
                  className="mt-4 border-[#1F2937] bg-[#111827]"
                />
              </GlassCard>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {onboardingNicheOptions.map((niche) => (
                  <button
                    key={niche.id}
                    type="button"
                    disabled={!niche.available}
                    onClick={() => {
                      if (niche.available && (niche.id === "funilaria" || niche.id === "construcao")) {
                        setNicheId(niche.id);
                        setTemplateIds([]);
                      }
                    }}
                    className={cn(
                      "rounded-xl border p-5 text-left transition-all",
                      nicheId === niche.id
                        ? "border-[#3B82F6] bg-[#3B82F6]/10"
                        : "border-[#1F2937] bg-[#111827] hover:border-[#3B82F6]/40",
                      !niche.available && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <IconByName
                        name={niche.icon}
                        className="size-8 text-[#3B82F6]"
                      />
                      {!niche.available && (
                        <Badge variant="outline" className="text-[10px]">
                          Em breve
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-3 font-semibold">{niche.name}</h3>
                    <p className="mt-1 text-sm text-[#9CA3AF]">{niche.description}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm text-[#9CA3AF]">
                  Selecione os templates iniciais para sua operação ({templates.length}{" "}
                  disponíveis).
                </p>
                {templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTemplate(t.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                      templateIds.includes(t.id)
                        ? "border-[#10B981] bg-[#10B981]/10"
                        : "border-[#1F2937] bg-[#111827]"
                    )}
                  >
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-[#9CA3AF]">
                        {t.stepCount} etapas · ~{t.avgDays} dias
                      </p>
                    </div>
                    {templateIds.includes(t.id) && (
                      <Check className="size-5 text-[#10B981]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <p className="text-sm text-[#9CA3AF]">
                  Defina os papéis iniciais da equipe (mock).
                </p>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => toggleRole(r.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left",
                      roleIds.includes(r.id)
                        ? "border-[#3B82F6] bg-[#3B82F6]/10"
                        : "border-[#1F2937] bg-[#111827]"
                    )}
                  >
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-[#9CA3AF]">
                        {r.memberCount} membros sugeridos
                      </p>
                    </div>
                    {roleIds.includes(r.id) && (
                      <Check className="size-5 text-[#3B82F6]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === 5 && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 text-[#10B981]">
                  <Building2 className="size-8" />
                  <div>
                    <h3 className="text-lg font-semibold">Tudo pronto!</h3>
                    <p className="text-sm text-[#9CA3AF]">
                      Sua operação está pronta — clareza desde o primeiro serviço.
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-[#9CA3AF]">
                  <li>
                    <strong className="text-[#F9FAFB]">Empresa:</strong> {companyName}
                  </li>
                  <li>
                    <strong className="text-[#F9FAFB]">Nicho:</strong>{" "}
                    {onboardingNicheOptions.find((n) => n.id === nicheId)?.name}
                  </li>
                  <li>
                    <strong className="text-[#F9FAFB]">Templates:</strong>{" "}
                    {templateIds.length} selecionados
                  </li>
                  <li>
                    <strong className="text-[#F9FAFB]">Equipe:</strong>{" "}
                    {roleIds.length} papéis
                  </li>
                </ul>
              </GlassCard>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            className="gap-2 text-[#9CA3AF]"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
          {step < 5 ? (
            <Button
              className="gap-2 bg-[#3B82F6] hover:bg-[#2563EB]"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
            >
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              className="gap-2 bg-[#10B981] hover:bg-[#059669]"
              onClick={handleFinish}
            >
              Ir para o dashboard
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

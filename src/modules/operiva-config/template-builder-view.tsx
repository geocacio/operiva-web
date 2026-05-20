"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { ConfigBreadcrumbs } from "@/components/operiva/config-breadcrumbs";
import { ConfigWizardNav } from "@/components/operiva/config-wizard-nav";
import { BuilderFlowCanvas } from "@/components/operiva/builder-flow-canvas";
import { BuilderStepPanel } from "@/components/operiva/builder-step-panel";
import { BuilderStepSidebar } from "@/components/operiva/builder-step-sidebar";
import { Button } from "@/components/ui/button";
import { CONFIG_ROUTES } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addDraftStep,
  duplicateDraftStep,
  loadTemplateForEdit,
  removeDraftStep,
  reorderDraftSteps,
  saveDraftTemplate,
  updateDraftStep,
} from "@/store/slices/template-slice";
import { toast } from "sonner";

export function TemplateBuilderView({ templateId }: { templateId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const draft = useAppSelector((s) => s.template.draftTemplate);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadTemplateForEdit(templateId));
  }, [dispatch, templateId]);

  useEffect(() => {
    if (draft?.steps.length && !selectedStepId) {
      setSelectedStepId(draft.steps[0].id);
    }
  }, [draft, selectedStepId]);

  if (!draft) {
    return <p className="text-muted-foreground">Carregando template…</p>;
  }

  const selectedStep =
    draft.steps.find((s) => s.id === selectedStepId) ?? null;

  const handleSave = () => {
    dispatch(saveDraftTemplate());
    toast.success("Template salvo com sucesso");
    router.push(CONFIG_ROUTES.templateTeam(templateId));
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <ConfigBreadcrumbs
        items={[
          { label: "Templates", href: `${CONFIG_ROUTES.templates}?nicho=${draft.nicheId}` },
          { label: draft.name },
        ]}
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{draft.name}</h2>
          <p className="text-sm text-muted-foreground">Editor de fluxo operacional</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10" asChild>
            <Link href={CONFIG_ROUTES.templateTeam(templateId)}>Próximo: Equipe</Link>
          </Button>
          <Button className="gap-2 bg-indigo-600" onClick={handleSave}>
            <Save className="size-4" />
            Salvar template
          </Button>
        </div>
      </div>
      <ConfigWizardNav templateId={templateId} />
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[240px_1fr_300px]">
        <BuilderStepSidebar
          steps={draft.steps}
          selectedStepId={selectedStepId}
          onSelect={setSelectedStepId}
          onReorder={(ids) => dispatch(reorderDraftSteps(ids))}
          onAdd={() => dispatch(addDraftStep())}
          onDuplicate={(id) => dispatch(duplicateDraftStep(id))}
          onRemove={(id) => {
            dispatch(removeDraftStep(id));
            if (selectedStepId === id) setSelectedStepId(null);
          }}
        />
        <BuilderFlowCanvas
          steps={draft.steps}
          selectedStepId={selectedStepId}
          onSelect={setSelectedStepId}
        />
        <BuilderStepPanel
          step={selectedStep}
          onChange={(step) => dispatch(updateDraftStep(step))}
        />
      </div>
    </div>
  );
}

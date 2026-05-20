"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CONFIG_ROUTES } from "@/lib/constants";

const STEPS = [
  { key: "editar", label: "Fluxo", suffix: "editar" },
  { key: "equipe", label: "Equipe", suffix: "equipe" },
  { key: "cliente", label: "Cliente", suffix: "cliente" },
  { key: "preview", label: "Preview", suffix: "preview" },
] as const;

export function ConfigWizardNav({ templateId }: { templateId: string }) {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-1">
      {STEPS.map((step) => {
        const href = `/app/configuracao/templates/${templateId}/${step.suffix}`;
        const active = pathname.includes(`/${step.suffix}`);
        return (
          <Link
            key={step.key}
            href={href}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition-all",
              active
                ? "bg-indigo-500/20 text-indigo-200"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            {step.label}
          </Link>
        );
      })}
      <Link
        href={`${CONFIG_ROUTES.newService}?template=${templateId}`}
        className="ml-auto rounded-lg px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10"
      >
        Gerar serviço →
      </Link>
    </div>
  );
}

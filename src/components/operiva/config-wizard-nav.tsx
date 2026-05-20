"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_ROUTES, TEMPLATE_ROUTES } from "@/lib/constants";

const STEPS = [
  { key: "editar", label: "Fluxo", href: (id: string) => TEMPLATE_ROUTES.templateEdit(id) },
  { key: "equipe", label: "Equipe", href: (id: string) => TEMPLATE_ROUTES.templateTeam(id) },
  { key: "cliente", label: "Cliente", href: (id: string) => TEMPLATE_ROUTES.templateClient(id) },
  { key: "preview", label: "Preview", href: (id: string) => TEMPLATE_ROUTES.templatePreview(id) },
] as const;

export function ConfigWizardNav({ templateId }: { templateId: string }) {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-1">
      {STEPS.map((step) => {
        const href = step.href(templateId);
        const active = pathname.includes(step.key);
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
        href={`${APP_ROUTES.novoServico}?template=${templateId}`}
        className="ml-auto rounded-lg px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10"
      >
        Gerar serviço →
      </Link>
    </div>
  );
}

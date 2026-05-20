"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TEMPLATE_ROUTES } from "@/lib/constants";

export function ConfigBreadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <Link href={TEMPLATE_ROUTES.library} className="hover:text-foreground">
        Configuração
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="size-3 opacity-50" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

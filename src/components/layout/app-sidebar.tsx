"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  Building2,
  Layers,
  LayoutDashboard,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAV } from "@/lib/constants";

const iconMap = {
  LayoutDashboard,
  Briefcase,
  Layers,
  Zap,
  Users,
  Building2,
  BarChart3,
  Settings,
} as const;

export function AppSidebar({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/8 bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300",
        collapsed ? "w-[72px]" : "w-60"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-white/8 px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
          <Zap className="size-4" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold tracking-tight">Operiva</p>
            <p className="text-[10px] text-muted-foreground">Painel operacional</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {APP_NAV.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active =
            pathname === item.href ||
            (item.href !== "/app" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                active
                  ? "bg-[#3B82F6]/15 text-[#93C5FD] shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-white/8 p-4">
          <p className="text-xs text-muted-foreground">MVP · dados simulados</p>
          <p className="mt-1 text-[10px] text-muted-foreground/70">
            Sem backend — apenas UX
          </p>
        </div>
      )}
    </aside>
  );
}

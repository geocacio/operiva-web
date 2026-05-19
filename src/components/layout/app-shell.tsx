"use client";

import { useEffect } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNotifications } from "@/store/slices/notifications-slice";
import { setMobileNavOpen } from "@/store/slices/ui-slice";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const mobileNavOpen = useAppSelector((s) => s.ui.mobileNavOpen);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="operiva-grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div
        className="operiva-glow pointer-events-none fixed inset-0 z-0"
        style={{ "--glow-x": "30%", "--glow-y": "0%" } as React.CSSProperties}
        aria-hidden
      />

      <div className="relative z-10 hidden lg:flex">
        <AppSidebar collapsed={!sidebarOpen} />
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={(o) => dispatch(setMobileNavOpen(o))}>
        <SheetContent side="left" className="w-60 p-0">
          <AppSidebar />
        </SheetContent>
      </Sheet>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} subtitle={subtitle} />
        <main className={cn("flex-1 overflow-auto p-4 lg:p-6")}>{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/shared/glass-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { getPortalHref } from "@/lib/portal-routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices } from "@/store/slices/services-slice";
import { logoutPortalClient } from "@/store/slices/portal-session-slice";
import type { ServiceStatus } from "@/types";

const TAB_STATUS: Record<string, ServiceStatus[]> = {
  andamento: ["em_andamento", "em_analise", "atrasado"],
  aprovacao: ["aguardando_aprovacao"],
  finalizados: ["concluido"],
  cancelados: ["cancelado"],
};

export function PortalServicesListView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useAppSelector((s) => s.portalSession);
  const items = useAppSelector((s) => s.services.items);
  const [tab, setTab] = useState("andamento");

  useEffect(() => {
    if (session.hydrated && !session.loggedIn) {
      router.replace(APP_ROUTES.portalLogin);
    }
  }, [session.hydrated, session.loggedIn, router]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutPortalClient());
    router.push(APP_ROUTES.portalLogin);
  };

  if (!session.loggedIn) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Olá, {session.clientName}</h1>
          <p className="text-sm text-[#9CA3AF]">Seus serviços</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1">
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#111827] lg:grid-cols-4">
          <TabsTrigger value="andamento">Em andamento</TabsTrigger>
          <TabsTrigger value="aprovacao">Aprovação</TabsTrigger>
          <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
          <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
        </TabsList>

        {(["andamento", "aprovacao", "finalizados", "cancelados"] as const).map(
          (t) => {
            const list = items.filter((s) =>
              (TAB_STATUS[t] ?? []).includes(s.status)
            );
            return (
              <TabsContent key={t} value={t} className="space-y-3">
                {list.length === 0 ? (
                  <p className="text-sm text-[#9CA3AF]">
                    Nenhum serviço nesta categoria.
                  </p>
                ) : (
                  list.map((s) => (
                    <Link key={s.id} href={getPortalHref(s.id)}>
                      <GlassCard className="p-4">
                        <p className="font-medium">{s.title}</p>
                        <div className="mt-2">
                          <StatusBadge status={s.status} />
                        </div>
                      </GlassCard>
                    </Link>
                  ))
                )}
              </TabsContent>
            );
          }
        )}
      </Tabs>
    </div>
  );
}

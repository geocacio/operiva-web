"use client";

import { Bell, Palette, Shield, User } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/mocks";

export function SettingsView() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <User className="size-4 text-indigo-400" />
          Perfil
        </div>
        <Separator className="my-4 bg-white/8" />
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">Nome</label>
            <Input
              defaultValue={currentUser.name}
              className="mt-1 border-white/10 bg-white/5"
              disabled
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">E-mail</label>
            <Input
              defaultValue={currentUser.email}
              className="mt-1 border-white/10 bg-white/5"
              disabled
            />
          </div>
          <Button disabled variant="outline" className="w-full sm:w-auto">
            Salvar (demo)
          </Button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bell className="size-4 text-indigo-400" />
          Notificações
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          Alertas de atraso, aprovações pendentes e atualizações de etapas —
          configurável na versão com backend.
        </p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Palette className="size-4 text-indigo-400" />
          Aparência
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          Tema escuro premium ativo. Personalização de marca em breve.
        </p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shield className="size-4 text-indigo-400" />
          Segurança
        </div>
        <Separator className="my-4 bg-white/8" />
        <p className="text-sm text-muted-foreground">
          MVP frontend-only — autenticação real será integrada posteriormente.
        </p>
      </GlassCard>
    </div>
  );
}

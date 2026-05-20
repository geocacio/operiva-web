"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Smartphone, User } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/lib/constants";
import { useAppDispatch } from "@/store/hooks";
import { loginPortalClient } from "@/store/slices/portal-session-slice";

export function PortalLoginView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(
      loginPortalClient({
        name: name.trim(),
        phone: phone.trim(),
        code: code.trim() || "DEMO",
      })
    );
    router.push(APP_ROUTES.portalServicos);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-[#F9FAFB]">Portal do cliente</h1>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Transparência total — acompanhe cada etapa sem ligar ou cobrar
        </p>
      </div>

      <GlassCard className="w-full max-w-md p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <User className="size-3.5" />
              Nome
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="mt-1 border-[#1F2937] bg-[#111827]"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <Smartphone className="size-3.5" />
              Telefone
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-0000"
              className="mt-1 border-[#1F2937] bg-[#111827]"
            />
          </div>
          <div>
            <label className="text-xs text-[#9CA3AF]">Código de acesso (demo)</label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Qualquer código ou DEMO"
              className="mt-1 border-[#1F2937] bg-[#111827]"
            />
          </div>
          <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB]">
            Entrar
          </Button>
        </form>
        <p className="mt-4 text-center text-[11px] text-[#9CA3AF]">
          Acesso rápido mock — sem SMS nem backend.
        </p>
      </GlassCard>

      <p className="mt-6 text-xs text-[#9CA3AF]">
        Link direto de acompanhamento?{" "}
        <Link href="/portal/svc-194" className="text-[#3B82F6] hover:underline">
          Abrir exemplo
        </Link>
      </p>
    </div>
  );
}

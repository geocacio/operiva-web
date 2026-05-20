import { AppShell } from "@/components/layout/app-shell";
import { SettingsView } from "@/modules/settings/settings-view";

export const metadata = {
  title: "Configurações — Operiva",
};

export default function ConfiguracoesPage() {
  return (
    <AppShell
      title="Configurações"
      subtitle="Dados da empresa e preferências — não é painel administrativo"
    >
      <SettingsView />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/app-shell";
import { ConfigHubView } from "@/modules/operiva-config/config-hub-view";

export const metadata = {
  title: "Configuração operacional — Operiva",
};

export default function ConfiguracaoPage() {
  return (
    <AppShell
      title="Configuração"
      subtitle="Fluxos, templates e geração de serviços"
    >
      <ConfigHubView />
    </AppShell>
  );
}

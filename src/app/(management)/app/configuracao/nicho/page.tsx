import { AppShell } from "@/components/layout/app-shell";
import { NicheSelectionView } from "@/modules/operiva-config/niche-selection-view";

export const metadata = {
  title: "Escolher nicho — Operiva",
};

export default function NichoPage() {
  return (
    <AppShell title="Configuração" subtitle="Escolha o nicho operacional">
      <NicheSelectionView />
    </AppShell>
  );
}

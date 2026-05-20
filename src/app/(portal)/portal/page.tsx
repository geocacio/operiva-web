import { PortalLoginView } from "@/modules/portal/portal-login-view";

export const metadata = {
  title: "Portal do cliente — Operiva",
  description:
    "Cliente acompanha sozinho. Veja etapas, fotos e aprovações em tempo real — com transparência e confiança.",
};

export default function PortalLandingPage() {
  return <PortalLoginView />;
}

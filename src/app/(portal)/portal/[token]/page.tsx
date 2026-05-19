import { ClientPortalView } from "@/modules/client-portal/client-portal-view";

export const metadata = {
  title: "Acompanhamento do Serviço — Operiva",
  description: "Acompanhe seu serviço em tempo real, sem precisar ligar.",
};

export default async function PortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ClientPortalView token={token} />;
}

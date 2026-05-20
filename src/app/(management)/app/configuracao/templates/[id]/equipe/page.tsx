import { redirect } from "next/navigation";
import { TEMPLATE_ROUTES } from "@/lib/constants";

export default async function TemplateTeamLegacyRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(TEMPLATE_ROUTES.templateTeam(id));
}

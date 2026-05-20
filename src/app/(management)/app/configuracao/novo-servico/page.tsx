import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";

export default async function NovoServicoLegacyRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const qs = new URLSearchParams();
  if (sp.template && typeof sp.template === "string") {
    qs.set("template", sp.template);
  }
  const q = qs.toString();
  redirect(`${APP_ROUTES.novoServico}${q ? `?${q}` : ""}`);
}

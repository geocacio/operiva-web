import { redirect } from "next/navigation";
import { TEMPLATE_ROUTES } from "@/lib/constants";

export default async function TemplateNewLegacyRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const qs = new URLSearchParams();
  if (sp.nicho && typeof sp.nicho === "string") qs.set("nicho", sp.nicho);
  const q = qs.toString();
  redirect(`${TEMPLATE_ROUTES.templateNew}${q ? `?${q}` : ""}`);
}

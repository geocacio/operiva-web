import { redirect } from "next/navigation";
import { TEMPLATE_ROUTES } from "@/lib/constants";

export default async function TemplatePreviewLegacyRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(TEMPLATE_ROUTES.templatePreview(id));
}

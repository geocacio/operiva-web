import { redirect } from "next/navigation";

export default async function LegacyExecucaoRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/execucao/${id}`);
}

import { redirect } from "next/navigation";
import { TEMPLATE_ROUTES } from "@/lib/constants";

export default function ConfiguracaoHubRedirect() {
  redirect(TEMPLATE_ROUTES.library);
}

import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";

export default function NichoRedirect() {
  redirect(APP_ROUTES.configuracoes);
}

import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelative(dateIso: string): string {
  return formatDistanceToNow(new Date(dateIso), {
    addSuffix: true,
    locale: ptBR,
  });
}

export function formatDate(dateIso: string): string {
  return format(new Date(dateIso), "dd MMM yyyy", { locale: ptBR });
}

export function formatDateTime(dateIso: string): string {
  return format(new Date(dateIso), "dd MMM yyyy · HH:mm", { locale: ptBR });
}

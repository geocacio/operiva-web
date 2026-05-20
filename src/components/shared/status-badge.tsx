import { Badge } from "@/components/ui/badge";
import { SERVICE_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ServiceStatus } from "@/types";

const statusStyles: Record<ServiceStatus, string> = {
  em_andamento:
    "border-sky-500/30 bg-sky-500/10 text-sky-300",
  aguardando_aprovacao:
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
  atrasado: "border-red-500/30 bg-red-500/10 text-red-300",
  concluido: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  em_analise: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  cancelado: "border-[#6B7280]/30 bg-[#6B7280]/10 text-[#9CA3AF]",
};

export function StatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-normal", statusStyles[status])}
    >
      {SERVICE_STATUS_LABELS[status]}
    </Badge>
  );
}

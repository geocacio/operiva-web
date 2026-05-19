import { Badge } from "@/components/ui/badge";
import { PRIORITY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

const priorityStyles: Record<Priority, string> = {
  alta: "border-red-500/20 bg-red-500/5 text-red-300",
  media: "border-amber-500/20 bg-amber-500/5 text-amber-200",
  baixa: "border-white/10 bg-white/5 text-muted-foreground",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant="outline" className={cn("font-normal", priorityStyles[priority])}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}

"use client";

import { AlertTriangle, Bell, CheckCircle2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { markRead } from "@/store/slices/notifications-slice";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types";

const icons: Record<NotificationType, typeof Bell> = {
  alerta: AlertTriangle,
  info: Info,
  sucesso: CheckCircle2,
  atraso: AlertTriangle,
};

const styles: Record<NotificationType, string> = {
  alerta: "text-amber-400 bg-amber-500/10",
  info: "text-sky-400 bg-sky-500/10",
  sucesso: "text-emerald-400 bg-emerald-500/10",
  atraso: "text-red-400 bg-red-500/10",
};

export function AlertsPanel({ notifications }: { notifications: Notification[] }) {
  const dispatch = useAppDispatch();
  const { reduced, stagger } = useMotionConfig();
  const unread = notifications.filter((n) => !n.read);

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Alertas operacionais</h3>
        {unread.length > 0 && (
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-300">
            {unread.length} novos
          </span>
        )}
      </div>
      <ul className="mt-4 space-y-3">
        {notifications.slice(0, 5).map((n, i) => {
          const Icon = icons[n.type];
          return (
            <motion.li
              key={n.id}
              className={cn(
                "flex gap-3 rounded-lg border p-3 transition-colors",
                n.read
                  ? "border-transparent bg-white/[0.02]"
                  : "border-white/8 bg-white/[0.04]"
              )}
              initial={reduced ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * stagger }}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  styles[n.type]
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {n.message}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {formatRelative(n.createdAt)}
                </p>
              </div>
              {!n.read && (
                <Button
                  variant="ghost"
                  size="xs"
                  className="shrink-0 self-start"
                  onClick={() => dispatch(markRead(n.id))}
                >
                  Marcar lida
                </Button>
              )}
            </motion.li>
          );
        })}
      </ul>
    </GlassCard>
  );
}

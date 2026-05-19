"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import type { ActivityItem } from "@/types";

export function ActivityFeed({
  items,
  title = "Atividade da equipe",
}: {
  items: ActivityItem[];
  title?: string;
}) {
  const { reduced, stagger } = useMotionConfig();

  return (
    <GlassCard className="p-5">
      <h3 className="font-medium">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            className="flex gap-3"
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * stagger }}
          >
            {item.userAvatar ? (
              <img
                src={item.userAvatar}
                alt=""
                className="size-9 shrink-0 rounded-full ring-1 ring-white/10"
              />
            ) : (
              <div className="size-9 shrink-0 rounded-full bg-white/5" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                <span className="font-medium text-foreground">{item.userName}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="text-foreground">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatRelative(item.createdAt)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

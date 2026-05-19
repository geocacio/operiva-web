"use client";

import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { useMotionConfig } from "@/hooks/use-motion";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ClientMessage } from "@/types/execution";

export function MinimalComms({ messages }: { messages: ClientMessage[] }) {
  const { reduced, stagger } = useMotionConfig();
  const preview = messages.slice(0, 5);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-[#F9FAFB]">Comunicação</h2>
      <GlassCard className="border-[#1F2937] bg-[#111827]/60 p-4">
        <p className="mb-3 text-xs text-[#9CA3AF]">
          Visualização rápida — sem chat tradicional
        </p>
        <ul className="space-y-3">
          {preview.map((msg, i) => (
            <motion.li
              key={msg.id}
              className={cn(
                "rounded-lg border px-3 py-2.5",
                msg.from === "cliente"
                  ? "border-[#3B82F6]/20 bg-[#3B82F6]/5"
                  : "border-[#1F2937] bg-[#0B0F19]/50"
              )}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * stagger }}
            >
              <motion.div className="mb-1 flex items-center gap-2">
                {msg.from === "cliente" ? (
                  <User className="size-3.5 text-[#3B82F6]" />
                ) : (
                  <Bot className="size-3.5 text-[#06B6D4]" />
                )}
                <span className="text-xs font-medium text-[#F9FAFB]">
                  {msg.authorName}
                </span>
                <span className="text-[10px] text-[#6B7280]">
                  {formatRelative(msg.createdAt)}
                </span>
              </motion.div>
              <p className="text-sm leading-snug text-[#9CA3AF]">{msg.content}</p>
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </section>
  );
}

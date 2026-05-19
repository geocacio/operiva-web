"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useMotionConfig } from "@/hooks/use-motion";
import type { ExecutionUpload } from "@/types/execution";

export function ExecutionUploadPreview({
  uploads,
}: {
  uploads: ExecutionUpload[];
}) {
  const { reduced } = useMotionConfig();
  const recent = uploads.slice(0, 4);

  if (recent.length === 0) return null;

  return (
    <section className="mx-4 mt-6">
      <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
        Enviados agora
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <AnimatePresence initial={false}>
          {recent.map((upload, i) => (
            <motion.figure
              key={upload.id}
              layout
              className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-[#1F2937]"
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {upload.previewUrl ? (
                <img
                  src={upload.previewUrl}
                  alt={upload.name}
                  className="size-full object-cover"
                />
              ) : (
                <motion.div className="flex size-full items-center justify-center bg-[#1F2937]">
                  <ImageIcon className="size-6 text-[#9CA3AF]" />
                </motion.div>
              )}
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

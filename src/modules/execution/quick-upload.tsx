"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, ImagePlus, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/hooks/use-motion";
import type { ExecutionUpload } from "@/types/execution";

export function QuickUpload({
  uploads,
  onUpload,
  disabled,
}: {
  uploads: ExecutionUpload[];
  onUpload: (fileName: string) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const { reduced } = useMotionConfig();

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length || disabled) return;
      Array.from(files).forEach((f) => onUpload(f.name));
    },
    [disabled, onUpload]
  );

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-[#F9FAFB]">Envio rápido</h2>
      <GlassCard className="border-[#1F2937] bg-[#111827]/60 p-4">
        <motion.div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => !disabled && inputRef.current?.click()}
          className={[
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors",
            dragOver
              ? "border-[#3B82F6] bg-[#3B82F6]/10"
              : "border-[#1F2937] bg-[#0B0F19]/40 hover:border-[#3B82F6]/40",
            disabled ? "pointer-events-none opacity-50" : "cursor-pointer",
          ].join(" ")}
          animate={dragOver && !reduced ? { scale: 1.01 } : { scale: 1 }}
        >
          <Upload className="mb-2 size-8 text-[#3B82F6]" />
          <p className="text-sm font-medium text-[#F9FAFB]">
            Arraste imagens aqui
          </p>
          <p className="mt-1 text-xs text-[#9CA3AF]">ou toque para selecionar</p>
        </motion.div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="flex-1 gap-2 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
          >
            <Camera className="size-4" />
            Tirar foto
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="flex-1 gap-2 border-[#1F2937] bg-[#1F2937]/50 text-[#F9FAFB]"
          >
            <ImagePlus className="size-4" />
            Galeria
          </Button>
        </div>

        <AnimatePresence>
          {uploads.length > 0 && (
            <motion.div
              className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {uploads.slice(0, 8).map((u) => (
                <motion.div
                  key={u.id}
                  layout
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-[#3B82F6]/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={u.previewUrl}
                    alt={u.name}
                    className="size-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1 py-1 text-[9px] text-white truncate">
                    {u.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </section>
  );
}

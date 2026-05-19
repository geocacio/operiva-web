"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
    </span>
  );
}

export function LiveBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="gap-1.5 border-emerald-500/25 bg-emerald-500/5 text-[11px] font-medium tracking-wide text-emerald-400"
    >
      <PulseDot />
      {children}
    </Badge>
  );
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="mb-4 border-white/10 bg-white/[0.03] text-[11px] font-medium uppercase tracking-widest text-zinc-400"
    >
      {children}
    </Badge>
  );
}

export function GridBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(34, 211, 238, 0.06), transparent),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(16, 185, 129, 0.05), transparent)
          `,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
        animate={
          reducedMotion ? undefined : { backgroundPosition: ["0px 0px", "64px 64px"] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 24, repeat: Infinity, ease: "linear" }
        }
      />
    </>
  );
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
}: {
  badge: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

export function MockupChrome({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d0f]/90 shadow-2xl shadow-emerald-950/20 backdrop-blur-sm",
        className
      )}
      whileHover={{ borderColor: "rgba(16,185,129,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-16 -top-16 size-48 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <motion.div className="relative flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 md:px-5">
        <div className="flex items-center gap-2">
          <motion.div className="flex gap-1">
            <span className="size-2 rounded-full bg-zinc-600" />
            <span className="size-2 rounded-full bg-zinc-600" />
            <span className="size-2 rounded-full bg-zinc-600" />
          </motion.div>
          <div>
            <p className="text-xs font-medium text-zinc-300">{title}</p>
            {subtitle && (
              <p className="text-[10px] text-zinc-500">{subtitle}</p>
            )}
          </div>
        </div>
        <LiveBadge>Ao vivo</LiveBadge>
      </motion.div>
      <div className="relative p-4 md:p-5">{children}</div>
    </motion.div>
  );
}

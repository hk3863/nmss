import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";

interface ScreenShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ScreenShell({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: ScreenShellProps) {
  return (
    <div className={cn("relative flex min-h-full flex-col px-5 pb-28 pt-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[32px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-full bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_72%)]" />
        <div className={cn("relative flex flex-col gap-6", contentClassName)}>
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700/75">
                {eyebrow}
              </p>
            ) : null}
            <div className="space-y-2">
              <h1 className="text-[32px] font-semibold leading-[1.05] text-slate-950">
                {title}
              </h1>
              {description ? (
                <p className="max-w-[28ch] text-sm leading-6 text-slate-600">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function StatPill({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "success" | "warning";
}) {
  const toneClasses = {
    neutral: "border-white/60 bg-white/70 text-slate-700",
    success: "border-emerald-200/80 bg-emerald-50/90 text-emerald-700",
    warning: "border-amber-200/80 bg-amber-50/90 text-amber-700",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-3 backdrop-blur", toneClasses[tone])}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-current/70">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-current">{value}</p>
    </div>
  );
}

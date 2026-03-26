import { ReactNode } from "react";
import { motion } from "motion/react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

export function PairingCard({
  badge,
  title,
  description,
  children,
  footer,
}: {
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[30px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-teal-700/80">
        {badge}
      </p>
      <h2 className="mt-3 text-[28px] font-semibold leading-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
      {footer ? <div className="mt-6">{footer}</div> : null}
    </motion.div>
  );
}

export function PairingActionRow({
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  primaryDisabled,
  secondaryVariant = "outline",
}: {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryDisabled?: boolean;
  secondaryVariant?: "outline" | "secondary";
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        className="h-12 rounded-2xl bg-slate-950 text-white hover:bg-slate-800"
        disabled={primaryDisabled}
        onClick={onPrimaryClick}
      >
        {primaryLabel}
      </Button>
      <Button
        className="h-12 rounded-2xl border-white/70 bg-white/75 text-slate-700 hover:bg-white"
        variant={secondaryVariant}
        onClick={onSecondaryClick}
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}

export function PairingChecklist({
  items,
}: {
  items: { label: string; complete?: boolean; loading?: boolean }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-white/60 bg-slate-50/80 px-4 py-3"
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              item.complete
                ? "bg-emerald-100 text-emerald-600"
                : "bg-slate-200 text-slate-500",
            )}
          >
            {item.loading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : item.complete ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <span className="text-xs font-semibold">...</span>
            )}
          </div>
          <p className="text-sm font-medium text-slate-700">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

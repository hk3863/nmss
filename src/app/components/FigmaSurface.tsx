import { cn } from "./ui/utils";

interface FigmaSurfaceProps {
  className?: string;
  variant?: "dialog" | "panel";
}

export default function FigmaSurface({
  className,
  variant = "dialog",
}: FigmaSurfaceProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute overflow-hidden rounded-[30px]",
        variant === "dialog"
          ? "border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,249,0.92))] shadow-[0_24px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl"
          : "border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(243,247,248,0.52))] shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-lg",
        className,
      )}
    >
      <div className="absolute inset-x-6 top-0 h-16 rounded-b-full bg-[radial-gradient(circle_at_top,_rgba(92,191,169,0.22),_transparent_70%)]" />
    </div>
  );
}

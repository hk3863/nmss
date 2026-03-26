import { MapPin, Radar, Volume2 } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { RealMapBackground } from "../components/RealMapBackground";
import { Button } from "../components/ui/button";

const actions = [
  "Allow Once",
  "Allow While Using App",
  "Don't Allow",
];

export default function AccessSharingView() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <RealMapBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_26%),linear-gradient(180deg,rgba(7,12,20,0.12),transparent_28%,rgba(7,12,20,0.34))]" />

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(243,247,249,0.84))] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.24)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-20 rounded-b-full bg-[radial-gradient(circle_at_top,_rgba(74,183,165,0.24),_transparent_70%)]" />

          <div className="relative flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#0f766e,#67e8c8)] text-white shadow-[0_16px_24px_rgba(15,118,110,0.28)]">
              <MapPin className="size-7" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700/80">
                Aman Hiss Badge
              </p>
              <p className="text-sm text-slate-500">quiet awareness, always on</p>
            </div>
          </div>

          <h1 className="mt-6 text-[32px] font-semibold leading-[1.02] text-slate-950">
            Let Aman Hiss use your location?
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Location helps show where you are while Aman Hiss Badge monitors distance and
            sound around you.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
              <Radar className="size-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Approach alerts</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Detects what is coming from behind.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
              <Volume2 className="size-5 text-amber-600" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Sound alerts</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Responds to nearby loud events too.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            {actions.map((label, index) => (
              <Button
                key={label}
                asChild
                className={
                  index === 1
                    ? "h-[52px] w-full rounded-[22px] bg-[linear-gradient(135deg,#0f172a,#1e293b)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.24)] hover:opacity-95"
                    : "h-[52px] w-full rounded-[22px] border-white/70 bg-white/70 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-white"
                }
                variant={index === 1 ? "default" : "outline"}
              >
                <Link to="/map">{label}</Link>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

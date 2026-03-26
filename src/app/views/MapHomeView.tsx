import { BellRing, Radar, ShieldCheck, Waves } from "lucide-react";
import { motion } from "motion/react";
import MapNavWrapper from "../components/MapNavWrapper";

export default function MapHomeView() {
  return (
    <MapNavWrapper>
      <div className="flex min-h-full flex-col justify-between px-5 pb-28 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-[30px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(240,247,247,0.62))] p-5 shadow-[0_24px_55px_rgba(15,23,42,0.16)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-teal-700/80">
                Aman Hiss Badge
              </p>
              <h1 className="mt-2 text-[30px] font-semibold leading-[1.02] text-slate-950">
                Behind-you awareness
              </h1>
              <p className="mt-2 max-w-[24ch] text-sm leading-6 text-slate-600">
                Aman Hiss Badge turns nearby movement and loud sound into tactile feedback.
              </p>
            </div>
            <div className="flex size-14 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#0f766e,#67e8c8)] text-white shadow-[0_16px_24px_rgba(15,118,110,0.28)]">
              <ShieldCheck className="size-7" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.72))] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <Radar className="size-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Distance</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Closer means faster vibration.</p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.72))] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <BellRing className="size-5 text-amber-600" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Sound</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Nearby loud events trigger alerts.</p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.72))] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <Waves className="size-5 text-teal-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Passive</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">No active checking needed.</p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/60 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(30,41,59,0.72))] p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)] backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">Live mode</p>
            <p className="mt-2 text-2xl font-semibold">Ready to detect from behind</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Pair the badge and test both alert channels from the Devices tab.
            </p>
          </div>
        </motion.div>
      </div>
    </MapNavWrapper>
  );
}

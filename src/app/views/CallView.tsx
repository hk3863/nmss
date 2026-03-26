import { PhoneCall, ShieldAlert } from "lucide-react";
import { Link } from "react-router";
import MapNavWrapper from "../components/MapNavWrapper";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";

export default function CallView() {
  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Quick Support"
        title="Need to contact someone fast?"
        description="This keeps the original call flow, but presents it with a cleaner emergency sheet."
        className="justify-end pt-14"
      >
        <div className="rounded-[28px] border border-rose-100/80 bg-[linear-gradient(180deg,rgba(255,251,251,0.95),rgba(255,241,242,0.88))] p-5 shadow-[0_18px_35px_rgba(244,63,94,0.12)]">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <ShieldAlert className="size-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Emergency call</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Reach support quickly, then return to the map when you are done.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button asChild className="h-12 rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.22)] hover:opacity-95">
            <Link to="/map">
              <PhoneCall className="size-4" />
              Yes
            </Link>
          </Button>
          <Button asChild className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline">
            <Link to="/map">No</Link>
          </Button>
        </div>
      </ScreenShell>
    </MapNavWrapper>
  );
}

import { useNavigate } from "react-router";
import { Mic, Radar, Sparkles } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";

export default function Link3View() {
  const navigate = useNavigate();

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Devices"
        title="Choose a test"
        description="Run either check first, or finish later and return to the map."
        className="justify-end pt-14"
      >
        <button
          className="w-full rounded-[28px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.74))] p-5 text-left shadow-[0_16px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
          onClick={() => navigate("/link5")}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-[18px] bg-sky-100 p-3 text-sky-700">
              <Mic className="size-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Audio test</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Trigger a loud sound and verify the microphone alert path.
              </p>
            </div>
          </div>
        </button>

        <button
          className="w-full rounded-[28px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.74))] p-5 text-left shadow-[0_16px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
          onClick={() => navigate("/link8")}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-[18px] bg-teal-100 p-3 text-teal-700">
              <Radar className="size-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Distance test</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Confirm the distance stream is reaching the phone in real time.
              </p>
            </div>
          </div>
        </button>

        <Button
          className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white"
          variant="outline"
          onClick={() => navigate("/map")}
        >
          <Sparkles className="size-4" />
          Done later
        </Button>
      </ScreenShell>
    </MapNavWrapper>
  );
}

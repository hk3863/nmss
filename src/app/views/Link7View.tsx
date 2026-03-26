import { useNavigate } from "react-router";
import { CheckCircle2, Volume2 } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link7View() {
  const navigate = useNavigate();
  const { audioTestPassed } = useBleMic();

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Distance Test"
        title="Distance check passed"
        description="The distance flow is preserved. This just gives it a stronger visual finish."
        className="justify-end pt-16"
      >
        <PairingCard
          badge="Success"
          title="Distance monitoring is ready"
          description="You can now run the audio test, or finish if it has already passed."
        >
          <div className="rounded-[24px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(219,234,254,0.8))] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-700" />
              <p className="text-sm leading-6 text-sky-950">
                Live distance values are arriving and the badge can use them for vibration timing.
              </p>
            </div>
          </div>
        </PairingCard>

        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.22)] hover:opacity-95" onClick={() => navigate("/link5")}>
            <Volume2 className="size-4" />
            Test audio
          </Button>
          <Button className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline" onClick={() => navigate(audioTestPassed ? "/link9" : "/link5")}>
            Done
          </Button>
        </div>
      </ScreenShell>
    </MapNavWrapper>
  );
}

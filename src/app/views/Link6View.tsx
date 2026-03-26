import { useNavigate } from "react-router";
import { CheckCircle2, Radar } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link6View() {
  const navigate = useNavigate();
  const { distanceTestPassed } = useBleMic();

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Audio Test"
        title="Audio check passed"
        description="The flow stays the same, but the success state now feels more polished."
        className="justify-end pt-16"
      >
        <PairingCard
          badge="Success"
          title="Sound monitoring is ready"
          description="Continue to the distance test or finish if you already completed it."
        >
          <div className="rounded-[24px] border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(236,253,245,0.96),rgba(209,250,229,0.78))] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-6 text-emerald-900">
                Loud-sound feedback is working and ready for live use.
              </p>
            </div>
          </div>
        </PairingCard>

        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.22)] hover:opacity-95" onClick={() => navigate("/link8")}>
            <Radar className="size-4" />
            Test distance
          </Button>
          <Button className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline" onClick={() => navigate(distanceTestPassed ? "/link9" : "/link8")}>
            Done
          </Button>
        </div>
      </ScreenShell>
    </MapNavWrapper>
  );
}

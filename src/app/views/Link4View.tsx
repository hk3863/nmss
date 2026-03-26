import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";

export default function Link4View() {
  const navigate = useNavigate();

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Devices"
        title="Connection failed"
        description="The original behavior stays the same. This is just a clearer failure state."
        className="justify-end pt-16"
      >
        <PairingCard
          badge="Try again"
          title="Aman Hiss Badge was not confirmed"
          description="Move the badge closer, make sure it is on, and retry the pairing flow."
        >
          <div className="rounded-[24px] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,251,235,0.96),rgba(254,243,199,0.76))] p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
              <p className="text-sm leading-6 text-amber-900">
                If browser permissions are limited, the app may need another attempt before the test sequence starts.
              </p>
            </div>
          </div>
        </PairingCard>

        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.22)] hover:opacity-95" onClick={() => navigate("/link")}>
            Retry
          </Button>
          <Button className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline" onClick={() => navigate("/map")}>
            Close
          </Button>
        </div>
      </ScreenShell>
    </MapNavWrapper>
  );
}

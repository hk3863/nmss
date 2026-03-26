import { useNavigate } from "react-router";
import { CheckCheck, Sparkles } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";

export default function Link9View() {
  const navigate = useNavigate();

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Setup Complete"
        title="Aman Hiss Badge is ready"
        description="The route behavior is the same. This is the polished final confirmation."
        className="justify-end pt-16"
      >
        <PairingCard
          badge="Success"
          title="All tests passed"
          description="You can now return to the map with both audio and distance checks completed."
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(236,253,245,0.96),rgba(209,250,229,0.78))] p-4">
              <CheckCheck className="size-5 text-emerald-600" />
              <p className="mt-3 text-sm font-semibold text-emerald-950">Audio passed</p>
            </div>
            <div className="rounded-[24px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(219,234,254,0.8))] p-4">
              <Sparkles className="size-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-sky-950">Distance passed</p>
            </div>
          </div>
        </PairingCard>

        <Button className="h-12 rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white shadow-[0_16px_28px_rgba(15,23,42,0.22)] hover:opacity-95" onClick={() => navigate("/map")}>
          Return to map
        </Button>
      </ScreenShell>
    </MapNavWrapper>
  );
}

import { useNavigate } from "react-router";
import { Bluetooth, ShieldCheck } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingActionRow, PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { useBleMic } from "../contexts/BleMicContext";

export default function LinkView() {
  const navigate = useNavigate();
  const { connectBLE, resetTestResults } = useBleMic();

  const handleConnect = async () => {
    resetTestResults();
    try {
      await connectBLE();
      navigate("/link2");
    } catch (e) {
      console.error(e);
      navigate("/link4");
    }
  };

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Devices"
        title="Pair Aman Hiss Badge"
        className="justify-end pt-16"
      >
        <PairingCard
          badge="Step 1"
          title="Start Bluetooth pairing"
          description="Keep the badge nearby and connect it to begin the test flow."
          footer={
            <PairingActionRow
              primaryLabel="Connect"
              secondaryLabel="Later"
              onPrimaryClick={handleConnect}
              onSecondaryClick={() => navigate("/map")}
            />
          }
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border border-white/70 bg-white/74 p-4">
              <Bluetooth className="size-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Nearby pairing</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Fast setup over bluetooth.</p>
            </div>
            <div className="rounded-[24px] border border-white/70 bg-white/74 p-4">
              <ShieldCheck className="size-5 text-teal-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Live feedback</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Distance and sound monitoring tests.</p>
            </div>
          </div>
        </PairingCard>
      </ScreenShell>
    </MapNavWrapper>
  );
}

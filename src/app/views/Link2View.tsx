import { useEffect } from "react";
import { useNavigate } from "react-router";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard, PairingChecklist } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";

export default function Link2View() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/link3");
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Devices"
        title="Connecting..."
        description="The app is checking the badge and preparing the test flow."
        className="justify-end pt-18"
      >
        <PairingCard
          badge="In progress"
          title="Preparing Aman Hiss Badge"
          description="This should only take a moment."
        >
          <PairingChecklist
            items={[
              { label: "Searching for device", complete: true },
              { label: "Opening Bluetooth channel", loading: true },
              { label: "Preparing test sequence", loading: true },
            ]}
          />
        </PairingCard>
      </ScreenShell>
    </MapNavWrapper>
  );
}

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, BluetoothConnected, Footprints } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link8View() {
  const navigate = useNavigate();
  const { isConnected, distance, setDistanceTestPassed, audioTestPassed } = useBleMic();
  const failureTimerRef = useRef<number | null>(null);
  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (distance > 0) {
      if (failureTimerRef.current) {
        window.clearTimeout(failureTimerRef.current);
        failureTimerRef.current = null;
      }

      if (!successTimerRef.current) {
        successTimerRef.current = window.setTimeout(() => {
          setDistanceTestPassed(true);
          navigate(audioTestPassed ? "/link9" : "/link7");
        }, 5000);
      }
    } else {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }

      if (!failureTimerRef.current) {
        failureTimerRef.current = window.setTimeout(() => {
          navigate("/link4");
        }, 10000);
      }
    }
  }, [audioTestPassed, distance, navigate, setDistanceTestPassed]);

  useEffect(() => {
    return () => {
      if (failureTimerRef.current) {
        window.clearTimeout(failureTimerRef.current);
      }
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Distance Test"
        title="Move with the badge"
        description="The distance logic is unchanged. This is a redesigned live-monitoring state."
        className="justify-end pt-10"
      >
        <div className="flex justify-center py-2">
          <motion.div
            animate={{ scale: distance > 0 ? [1, 1.08, 1] : 1 }}
            transition={{ repeat: distance > 0 ? Infinity : 0, duration: 1.35 }}
            className="flex size-32 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(242,247,248,0.76))] shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl"
          >
            <div className="flex size-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#38bdf8)] text-white shadow-[0_14px_28px_rgba(15,118,110,0.24)]">
              <Footprints className="size-9" />
            </div>
          </motion.div>
        </div>

        <PairingCard
          badge={isConnected ? "Monitoring" : "Disconnected"}
          title={
            isConnected
              ? distance > 0
                ? "Distance detected"
                : "Waiting for movement"
              : "Badge not connected"
          }
          description={
            isConnected
              ? distance > 0
                ? `Current distance signal: ${distance}. Keep moving for a few seconds.`
                : "No distance value yet. Trigger movement to continue the test."
              : "Reconnect the badge first so the app can continue."
          }
        >
          <div className="rounded-[24px] border border-white/70 bg-white/74 p-4">
            <div className="flex items-start gap-3">
              {isConnected ? (
                <BluetoothConnected className="mt-0.5 size-5 shrink-0 text-sky-700" />
              ) : (
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-rose-600" />
              )}
              <p className="text-sm leading-6 text-slate-600">
                {isConnected
                  ? distance > 0
                    ? "The app will automatically continue once the distance stream remains active."
                    : "If nothing changes after 10 seconds, the flow will return to retry."
                  : "No live Bluetooth connection is available for the test right now."}
              </p>
            </div>
          </div>
        </PairingCard>

        <Button className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline" onClick={() => navigate("/map")}>
          Cancel
        </Button>
      </ScreenShell>
    </MapNavWrapper>
  );
}

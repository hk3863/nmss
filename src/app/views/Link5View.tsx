import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Volume2 } from "lucide-react";
import MapNavWrapper from "../components/MapNavWrapper";
import { PairingCard } from "../components/PairingCard";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link5View() {
  const navigate = useNavigate();
  const { startMicMonitor, stopMicMonitor, decibels, isLoud, setAudioTestPassed } = useBleMic();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    startMicMonitor()
      .then(() => setHasStarted(true))
      .catch((e) => {
        console.error(e);
        navigate("/map");
      });

    return () => {
      stopMicMonitor();
    };
  }, [startMicMonitor, stopMicMonitor, navigate]);

  useEffect(() => {
    if (hasStarted && isLoud) {
      const timer = window.setTimeout(() => {
        setAudioTestPassed(true);
        navigate("/link6");
      }, 1000);
      return () => window.clearTimeout(timer);
    }
  }, [hasStarted, isLoud, navigate, setAudioTestPassed]);

  const normalizedIntensity = Math.max(0, Math.min(1, (decibels - 30) / 70));
  const ringColor = isLoud ? "rgba(251, 113, 133, " : "rgba(14, 165, 233, ";

  return (
    <MapNavWrapper>
      <ScreenShell
        eyebrow="Audio Test"
        title="Make a loud sound"
        description="The same test logic is running underneath. This is a more polished visualization."
        className="justify-end pt-10"
      >
        <div className="flex justify-center py-2">
          <div className="relative flex h-40 w-40 items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full"
                style={{
                  border: `2px solid ${ringColor}${0.52 / ring})`,
                  backgroundColor: `${ringColor}${0.1 / ring})`,
                }}
                animate={{
                  width: `${100 + normalizedIntensity * 140 * ring}%`,
                  height: `${100 + normalizedIntensity * 140 * ring}%`,
                  opacity: [0.25, 0.9, 0.25],
                }}
                transition={{
                  width: { duration: 0.14, ease: "easeOut" },
                  height: { duration: 0.14, ease: "easeOut" },
                  opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: ring * 0.16 },
                }}
              />
            ))}

            <motion.div
              className="absolute z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full text-white shadow-2xl"
              style={{
                background: isLoud
                  ? "linear-gradient(135deg, #fb7185, #f97316)"
                  : "linear-gradient(135deg, #0f172a, #155e75)",
                boxShadow: `0 0 ${20 + normalizedIntensity * 40}px ${ringColor}0.42)`,
              }}
              animate={{ scale: 1 + normalizedIntensity * 0.16 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <Volume2 className="mb-2 size-5 text-white/80" />
              <span className="text-3xl font-black tracking-tight">{Math.round(decibels)}</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">
                dB
              </span>
            </motion.div>
          </div>
        </div>

        {hasStarted ? (
          <PairingCard
            badge="Listening"
            title={isLoud ? "Trigger detected" : "Waiting for sound"}
            description={
              isLoud
                ? "The audio threshold has been reached and the test is moving forward."
                : "Clap, speak loudly, or make a short sharp noise near the device."
            }
          />
        ) : null}

        <Button className="h-12 rounded-[22px] border-white/70 bg-white/75 text-slate-700 hover:bg-white" variant="outline" onClick={() => navigate("/map")}>
          Cancel
        </Button>
      </ScreenShell>
    </MapNavWrapper>
  );
}

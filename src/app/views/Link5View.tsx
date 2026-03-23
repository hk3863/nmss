import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import { motion } from "motion/react";
import Link5 from "../../imports/Link5";
import MapNavWrapper from "../components/MapNavWrapper";
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
      const timer = setTimeout(() => {
        navigate("/link6"); // Go to success screen
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, isLoud, navigate]);

  useEffect(() => {
  if (hasStarted && isLoud) {
    const timer = setTimeout(() => {
      setAudioTestPassed(true);
      navigate("/link6");
    }, 1000);
    return () => clearTimeout(timer);
  }
}, [hasStarted, isLoud, navigate, setAudioTestPassed]);

  // Normalize decibels to a 0-1 scale for animations (assuming 30dB min, 100dB max)
  const normalizedIntensity = Math.max(0, Math.min(1, (decibels - 30) / 70));
  
  // Dynamic colors based on loudness
  const ringColor = isLoud ? "rgba(255, 59, 48, " : "rgba(10, 132, 255, ";

  return (
    <MapNavWrapper>
      <Link5 />
      
      {/* dB Overlay Floating Widget */}
      {hasStarted && (
        <div className="absolute left-1/2 top-[170px] -translate-x-1/2 flex flex-col items-center justify-center z-30 pointer-events-none">
          {/* Pulsing visualizer */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full"
                style={{
                  border: `2px solid ${ringColor}${0.5 / ring})`,
                  backgroundColor: `${ringColor}${0.1 / ring})`
                }}
                animate={{
                  width: `${100 + (normalizedIntensity * 150 * ring)}%`,
                  height: `${100 + (normalizedIntensity * 150 * ring)}%`,
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  width: { duration: 0.1, ease: "easeOut" },
                  height: { duration: 0.1, ease: "easeOut" },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: ring * 0.2 }
                }}
              />
            ))}
            
            {/* Center Core */}
            <motion.div 
              className="absolute z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
              style={{
                background: isLoud 
                  ? 'linear-gradient(135deg, #ff3b30, #ff9500)' 
                  : 'linear-gradient(135deg, #2c2c2e, #1c1c1e)',
                boxShadow: `0 0 ${20 + normalizedIntensity * 40}px ${ringColor}${0.6})`
              }}
              animate={{
                scale: 1 + (normalizedIntensity * 0.2)
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-white text-3xl font-black tracking-tighter">
                {Math.round(decibels)}
              </span>
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                dB
              </span>
            </motion.div>
          </div>

          {/* Loudness Indicator Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isLoud ? 1 : 0,
              y: isLoud ? 0 : 10
            }}
            className="mt-8 bg-white/95 backdrop-blur text-[#ff3b30] px-5 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20 flex items-center gap-2"
          >
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-2 h-2 rounded-full bg-[#ff3b30]"
            />
            Loud Noise!
          </motion.div>
        </div>
      )}

      {/* Cancel button mask - invisible clickable area */}
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

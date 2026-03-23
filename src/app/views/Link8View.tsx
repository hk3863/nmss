import { useEffect, useRef } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import Link8 from "../../imports/Link8";
import MapNavWrapper from "../components/MapNavWrapper";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link8View() {
  const navigate = useNavigate();
  const { isConnected, distance, setDistanceTestPassed, audioTestPassed } = useBleMic();
  const failureTimerRef = useRef<number | null>(null);
  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (distance > 0) {
      if (failureTimerRef.current) {
        clearTimeout(failureTimerRef.current);
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
        clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }

      if (!failureTimerRef.current) {
        failureTimerRef.current = window.setTimeout(() => {
          navigate("/link4");
        }, 10000);
      }
    }
  }, [distance, navigate, audioTestPassed, setDistanceTestPassed]);

  // Separate unmount-only cleanup — NOT in the distance effect
  useEffect(() => {
    return () => {
      if (failureTimerRef.current) clearTimeout(failureTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  return (
    <MapNavWrapper>
      <Link8 />
      <div className="absolute left-1/2 top-[410px] -translate-x-1/2 flex flex-col items-center justify-center z-30 pointer-events-none">
        {isConnected ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#34c759] font-bold bg-white px-4 py-2 rounded-full shadow-md animate-pulse">
              Monitoring Distance...
            </span>
            {distance > 0 && (
              <span className="text-[#ff3b30] font-bold bg-white px-4 py-2 rounded-full shadow-md animate-bounce">
                Moving! Level: {distance}
              </span>
            )}
          </div>
        ) : (
          <span className="text-[#ff3b30] font-bold bg-white px-4 py-2 rounded-full shadow-md">
            Not Connected
          </span>
        )}
      </div>
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}
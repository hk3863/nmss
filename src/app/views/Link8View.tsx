import { useEffect, useRef } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import Link8 from "../../imports/Link8";
import MapNavWrapper from "../components/MapNavWrapper";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link8View() {
  const navigate = useNavigate();
  const { isConnected, distance } = useBleMic();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // If we receive a distance reading, cancel the timeout failure
    if (distance > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Otherwise, fail after 10 seconds of no movement
    timerRef.current = window.setTimeout(() => {
      navigate("/link4");
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [distance, navigate]);

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
      {/* Cancel button */}
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

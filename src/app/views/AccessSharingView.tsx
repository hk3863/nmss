import { Link } from "react-router";
import AccessSharing from "../../imports/AccessSharing";
import { RealMapBackground } from "../components/RealMapBackground";

export default function AccessSharingView() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        [data-name^="access"] {
          background-color: transparent !important;
          pointer-events: none !important;
        }
        [data-name="Снимок экрана 2020-10-23 в 16.38.52"] {
          display: none !important;
        }
      `}} />
      <RealMapBackground />
      <div className="absolute inset-0 pointer-events-none *:pointer-events-auto">
        <AccessSharing />
      </div>
      {/* Clickable Overlays */}
      <Link to="/map" className="absolute left-[92px] top-[444px] w-[208px] h-[46px] z-10 cursor-pointer" />
      <Link to="/map" className="absolute left-[92px] top-[490px] w-[208px] h-[46px] z-10 cursor-pointer" />
      <Link to="/map" className="absolute left-[92px] top-[536px] w-[208px] h-[44px] z-10 cursor-pointer" />
    </div>
  );
}

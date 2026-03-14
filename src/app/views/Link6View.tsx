import { Link as ReactRouterLink } from "react-router";
import Link6 from "../../imports/Link6";
import MapNavWrapper from "../components/MapNavWrapper";

export default function Link6View() {
  return (
    <MapNavWrapper>
      <Link6 />
      {/* Clickable Overlays */}
      <ReactRouterLink to="/link8" className="absolute left-[92px] top-[400px] w-[206px] h-[50px] z-20 cursor-pointer" />
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

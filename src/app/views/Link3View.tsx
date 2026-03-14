import { Link as ReactRouterLink } from "react-router";
import Link3 from "../../imports/Link3";
import MapNavWrapper from "../components/MapNavWrapper";

export default function Link3View() {
  return (
    <MapNavWrapper>
      <Link3 />
      {/* Clickable Overlays */}
      <ReactRouterLink to="/link5" className="absolute left-[92px] top-[385px] w-[206px] h-[30px] z-20 cursor-pointer" />
      <ReactRouterLink to="/link8" className="absolute left-[92px] top-[415px] w-[206px] h-[35px] z-20 cursor-pointer" />
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

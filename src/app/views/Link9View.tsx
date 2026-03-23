import { Link as ReactRouterLink } from "react-router";
import Link9 from "../../imports/Link9";
import MapNavWrapper from "../components/MapNavWrapper";

export default function Link9View() {
  return (
    <MapNavWrapper>
      <Link9 />
      {/* Done → go to map */}
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}
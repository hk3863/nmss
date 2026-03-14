import { Link as ReactRouterLink } from "react-router";
import Link4 from "../../imports/Link4";
import MapNavWrapper from "../components/MapNavWrapper";

export default function Link4View() {
  return (
    <MapNavWrapper>
      <Link4 />
      {/* Cancel button */}
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[459px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

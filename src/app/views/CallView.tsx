import { Link } from "react-router";
import Call from "../../imports/Call";
import MapNavWrapper from "../components/MapNavWrapper";

export default function CallView() {
  return (
    <MapNavWrapper>
      <Call />
      {/* Clickable Overlays */}
      <Link to="/map" className="absolute left-[92px] top-[459px] w-[104px] h-[51px] z-20 cursor-pointer" />
      <Link to="/map" className="absolute left-[196px] top-[459px] w-[102px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

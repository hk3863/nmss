import { Link as ReactRouterLink, useNavigate } from "react-router";
import Link6 from "../../imports/Link6";
import MapNavWrapper from "../components/MapNavWrapper";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link6View() {
  const navigate = useNavigate();
  const { distanceTestPassed } = useBleMic();

  return (
    <MapNavWrapper>
      <Link6 />
      {/* Test distance */}
      <ReactRouterLink to="/link8" className="absolute left-[92px] top-[400px] w-[206px] h-[50px] z-20 cursor-pointer" />
      {/* Done — only truly done if distance also passed, otherwise nudge to link8 */}
      <div
        onClick={() => navigate(distanceTestPassed ? "/link9" : "/link8")}
        className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer"
      />
    </MapNavWrapper>
  );
}
import { Link as ReactRouterLink, useNavigate } from "react-router";
import Link7 from "../../imports/Link7";
import MapNavWrapper from "../components/MapNavWrapper";
import { useBleMic } from "../contexts/BleMicContext";

export default function Link7View() {
  const navigate = useNavigate();
  const { audioTestPassed } = useBleMic();

  return (
    <MapNavWrapper>
      <Link7 />
      {/* Test audio → Link5 */}
      <ReactRouterLink to="/link5" className="absolute left-[92px] top-[400px] w-[206px] h-[50px] z-20 cursor-pointer" />
      {/* Done — only truly done if audio also passed */}
      <div
        onClick={() => navigate(audioTestPassed ? "/link9" : "/link5")}
        className="absolute left-[92px] top-[456px] w-[206px] h-[51px] z-20 cursor-pointer"
      />
    </MapNavWrapper>
  );
}
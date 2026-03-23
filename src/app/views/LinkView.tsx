import { Link as ReactRouterLink, useNavigate } from "react-router";
import LinkComponent from "../../imports/Link";
import MapNavWrapper from "../components/MapNavWrapper";
import { useBleMic } from "../contexts/BleMicContext";

export default function LinkView() {
  const navigate = useNavigate();
  const { connectBLE, resetTestResults } = useBleMic();

  const handleConnect = async () => {
    resetTestResults();
    try {
      await connectBLE();
      navigate('/link2');
    } catch (e) {
      console.error(e);
      navigate('/link4');
    }
  };

  return (
    <MapNavWrapper>
      <LinkComponent />
      {/* Clickable Overlays */}
      <div 
        onClick={handleConnect}
        className="absolute left-[92px] top-[459px] w-[104px] h-[51px] z-20 cursor-pointer" 
      />
      <ReactRouterLink to="/map" className="absolute left-[196px] top-[459px] w-[102px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}
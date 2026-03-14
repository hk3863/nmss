import { useEffect } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import Link2 from "../../imports/Link2";
import MapNavWrapper from "../components/MapNavWrapper";

export default function Link2View() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/link3");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MapNavWrapper>
      <Link2 />
      {/* Cancel button */}
      <ReactRouterLink to="/map" className="absolute left-[92px] top-[459px] w-[206px] h-[51px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

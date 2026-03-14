import { Link } from "react-router";
import Profile from "../../imports/Profile";
import MapNavWrapper from "../components/MapNavWrapper";

export default function ProfileView() {
  return (
    <MapNavWrapper>
      <Profile />
      
      {/* Clickable Overlays */}
      {/* Back Button (Chevron Left) -> Map */}
      <Link to="/map" className="absolute left-0 top-[20px] w-[60px] h-[60px] z-20 cursor-pointer" />
      
      {/* Sign out -> Welcome/Access Sharing screen */}
      <Link to="/" className="absolute left-[260px] top-[75px] w-[100px] h-[45px] z-20 cursor-pointer" />
    </MapNavWrapper>
  );
}

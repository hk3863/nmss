import { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { PhoneIcon, SwitchIcon, PinIcon, UserIcon } from "./icons";
import { RealMapBackground } from "./RealMapBackground";

interface MapNavWrapperProps {
  children: ReactNode;
}

export default function MapNavWrapper({ children }: MapNavWrapperProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Dynamic override to make the Figma map transparent so we can see the real map */}
      <style dangerouslySetInnerHTML={{__html: `
        [data-name^="map"], [data-name^="link"], [data-name^="call"], [data-name^="access"] {
          background-color: transparent !important;
          pointer-events: none !important;
        }
        [data-name="Снимок экрана 2020-10-23 в 16.38.52"] {
          display: none !important;
        }
      `}} />

      <RealMapBackground />

      <div className="absolute inset-0 z-0 pointer-events-none *:pointer-events-auto">
        {/* We need the routing overlays to remain clickable, so we keep pointer-events-auto for children. The Figma component itself is forced to none via the style tag above. */}
        {children}
      </div>
      
      {/* Obscure the original Figma nav bar with a solid white block */}
      <div className="absolute left-0 bottom-0 w-full h-[90px] bg-white z-10 flex flex-row items-center justify-around px-2 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-b-[40px]">
        
        {/* Phone Nav Item */}
        <Link 
          to="/call" 
          className="w-16 h-16 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          <PhoneIcon active={path === "/call"} />
        </Link>
        
        {/* Map / Pin Nav Item */}
        <Link 
          to="/map" 
          className="w-16 h-16 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          <PinIcon active={path === "/map"} />
        </Link>

        {/* Device Pairing / Switch Nav Item */}
        <Link 
          to="/link" 
          className="w-16 h-16 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          <SwitchIcon active={path.startsWith("/link")} />
        </Link>
        
        {/* User Nav Item */}
        <Link 
          to="/user" 
          className="w-16 h-16 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          <UserIcon active={path === "/user"} />
        </Link>
        
      </div>
    </div>
  );
}

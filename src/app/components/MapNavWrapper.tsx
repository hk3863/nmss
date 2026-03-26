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
  const navItemClass = (active: boolean) =>
    `relative flex h-16 w-16 items-center justify-center rounded-2xl border transition duration-200 ${
      active
        ? "border-[#bde7dd] bg-[linear-gradient(180deg,rgba(236,255,250,0.98),rgba(219,245,239,0.85))] shadow-[0_14px_28px_rgba(15,118,110,0.18)]"
        : "border-transparent bg-transparent hover:-translate-y-0.5 hover:bg-white/35"
    }`;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        [data-name^="map"], [data-name^="link"], [data-name^="call"], [data-name^="access"], [data-name^="profile"] {
          background-color: transparent !important;
          pointer-events: none !important;
        }
        [data-name*="2020-10-23"] {
          display: none !important;
        }
      `}} />
      <RealMapBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.08),transparent_24%,transparent_70%,rgba(15,23,42,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-9 z-0 h-20 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 z-10 pointer-events-none *:pointer-events-auto">
        {children}
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex w-[calc(100%-28px)] -translate-x-1/2 items-center justify-around rounded-[30px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,248,0.76))] px-2 py-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <Link
          to="/call"
          className={navItemClass(path === "/call")}
        >
          {path === "/call" ? <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-[#4ab7a5]" /> : null}
          <PhoneIcon active={path === "/call"} />
        </Link>

        <Link
          to="/map"
          className={navItemClass(path === "/map")}
        >
          {path === "/map" ? <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-[#4ab7a5]" /> : null}
          <PinIcon active={path === "/map"} />
        </Link>

        <Link
          to="/link"
          className={navItemClass(path.startsWith("/link"))}
        >
          {path.startsWith("/link") ? <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-[#4ab7a5]" /> : null}
          <SwitchIcon active={path.startsWith("/link")} />
        </Link>

        <Link
          to="/user"
          className={navItemClass(path === "/user")}
        >
          {path === "/user" ? <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-[#4ab7a5]" /> : null}
          <UserIcon active={path === "/user"} />
        </Link>
      </div>
    </div>
  );
}

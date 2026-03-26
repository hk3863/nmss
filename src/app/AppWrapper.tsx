import { Outlet } from "react-router";

export default function AppWrapper() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_10%,_rgba(116,214,195,0.45),_transparent_24%),radial-gradient(circle_at_80%_14%,_rgba(255,255,255,0.7),_transparent_18%),linear-gradient(180deg,_#eef6f3_0%,_#dbe7f3_46%,_#f3ece1_100%)] p-0 md:p-8">
      <div
        className="relative h-screen w-screen overflow-hidden bg-[#edf4f1] shadow-[0_30px_90px_rgba(15,23,42,0.24)] md:h-[844px] md:w-[390px] md:rounded-[42px] md:border-[10px] md:border-[#101828]"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_22%,transparent_75%,rgba(15,23,42,0.05))]" />
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 hidden h-7 w-32 -translate-x-1/2 rounded-full bg-black/80 shadow-[0_4px_12px_rgba(0,0,0,0.3)] md:block" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-[linear-gradient(180deg,rgba(237,244,241,0.92),rgba(237,244,241,0))]" />
        <Outlet />
      </div>
    </div>
  );
}

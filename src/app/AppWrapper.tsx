import { Outlet } from "react-router";

export default function AppWrapper() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-200 overflow-hidden">
      <div 
        className="relative bg-white overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.15)] md:rounded-[40px] md:border-[10px] md:border-black"
        style={{ width: 390, height: 844 }}
      >
        <Outlet />
      </div>
    </div>
  );
}

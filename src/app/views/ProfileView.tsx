import { CalendarDays, ChevronLeft, LogOut, Phone, User2 } from "lucide-react";
import { Link } from "react-router";
import MapNavWrapper from "../components/MapNavWrapper";
import { ScreenShell } from "../components/ScreenShell";
import { Button } from "../components/ui/button";

export default function ProfileView() {
  return (
    <MapNavWrapper>
      <div className="px-5 pb-28 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild className="size-11 rounded-[18px] border-white/70 bg-white/80 text-slate-700 hover:bg-white" variant="outline">
            <Link to="/map">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
          <Button asChild className="h-11 rounded-[18px] border-white/70 bg-white/80 px-4 text-slate-700 hover:bg-white" variant="outline">
            <Link to="/">
              <LogOut className="size-4" />
              Sign out
            </Link>
          </Button>
        </div>

        <ScreenShell
          eyebrow="Profile"
          title="Hayeon Jeong"
          className="p-0"
          contentClassName="gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#0f766e,#38bdf8)] text-white shadow-[0_18px_28px_rgba(15,118,110,0.24)]">
              <User2 className="size-10" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Badge User
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950">Aman Hiss Badge profile</p>
              <p className="text-sm text-slate-500">Connected details and contact info</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[24px] border border-white/65 bg-white/74 p-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-5 text-teal-700" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Date of Birth</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">May 7, 2000</p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/65 bg-white/74 p-4">
              <div className="flex items-center gap-3">
                <Phone className="size-5 text-sky-700" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Number</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">056 123 456</p>
                </div>
              </div>
            </div>
          </div>
        </ScreenShell>
      </div>
    </MapNavWrapper>
  );
}

import svgPaths from "./svg-pdlbrnub3u";

function NavigateFill({ className }: { className?: string }) {
  return <div className={className || "absolute left-[90px] size-[24px] top-[264px]"} data-name="Navigate_fill" />;
}

export default function AccessSharing() {
  return (
    <div className="bg-[#f5f5f5] relative size-full" data-name="access sharing">
      <div className="absolute h-[316px] left-[92px] top-[264px] w-[208px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208 316">
          <path d={svgPaths.p10a48a00} fill="var(--fill-0, white)" id="Rectangle 3" />
        </svg>
      </div>
      <NavigateFill />
      <p className="-translate-x-1/2 absolute font-['Blinker:Bold',sans-serif] h-[47px] leading-[normal] left-[195.5px] not-italic text-[20px] text-black text-center top-[276px] tracking-[1.4px] w-[163px]">Allow “app name” to use your location?</p>
      <p className="-translate-x-1/2 absolute font-['Blinker:Regular',sans-serif] h-[66px] leading-[normal] left-[194.5px] not-italic text-[16px] text-black text-center top-[366px] tracking-[1.4px] w-[161px]">Your location is used to show your position on the map</p>
      <p className="-translate-x-1/2 absolute font-['Blinker:Regular',sans-serif] h-[19px] leading-[normal] left-[194.5px] not-italic text-[16px] text-black text-center top-[457px] tracking-[1.4px] w-[133px]">Allow Once</p>
      <p className="-translate-x-1/2 absolute font-['Blinker:Regular',sans-serif] h-[19px] leading-[normal] left-[196px] not-italic text-[16px] text-black text-center top-[501px] tracking-[1.4px] w-[178px]">Allow while Using App</p>
      <p className="-translate-x-1/2 absolute font-['Blinker:Regular',sans-serif] h-[19px] leading-[normal] left-[195px] not-italic text-[16px] text-black text-center top-[548px] tracking-[1.4px] w-[148px]">Don’t Allow</p>
      <div className="absolute h-0 left-[91px] top-[444px] w-[208.002px]">
        <div className="absolute inset-[-0.7px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208.002 0.7">
            <line id="Line 1" stroke="var(--stroke-0, black)" strokeOpacity="0.3" strokeWidth="0.7" x2="208.002" y1="0.35" y2="0.35" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[91px] top-[490px] w-[208.002px]">
        <div className="absolute inset-[-0.7px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208.002 0.7">
            <line id="Line 1" stroke="var(--stroke-0, black)" strokeOpacity="0.3" strokeWidth="0.7" x2="208.002" y1="0.35" y2="0.35" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[92px] top-[536px] w-[208.002px]">
        <div className="absolute inset-[-0.7px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208.002 0.7">
            <line id="Line 1" stroke="var(--stroke-0, black)" strokeOpacity="0.3" strokeWidth="0.7" x2="208.002" y1="0.35" y2="0.35" />
          </svg>
        </div>
      </div>
    </div>
  );
}
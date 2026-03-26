import React from "react";

export function PhoneIcon({ active }: { active?: boolean }) {
  const color = active ? "#0f766e" : "#7c8798";
  return (
    <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      {active && (
        <defs>
          <filter id="shadow_phone" x="-4" y="0" width="45" height="45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_36" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_36" result="shape" />
          </filter>
        </defs>
      )}
      <g filter={active ? "url(#shadow_phone)" : undefined}>
        <path d="M6.67962 5.98704L8.95956 3.70711C9.35008 3.31658 9.98325 3.31658 10.3738 3.70711L15.6262 8.95956C16.0168 9.35008 16.0168 9.98325 15.6262 10.3738L13.4529 12.5471C13.1824 12.8176 13.1154 13.2308 13.2864 13.5729C15.2642 17.5284 18.4716 20.7358 22.4271 22.7136C22.7692 22.8846 23.1824 22.8176 23.4529 22.5471L25.6262 20.3738C26.0168 19.9832 26.6499 19.9832 27.0404 20.3738L32.2929 25.6262C32.6834 26.0168 32.6834 26.6499 32.2929 27.0404L30.013 29.3204C27.9016 31.4317 24.559 31.6693 22.1703 29.8777L15.6286 24.9714C13.885 23.6638 12.3362 22.115 11.0286 20.3714L6.12226 13.8297C4.33072 11.441 4.56827 8.0984 6.67962 5.98704Z" stroke={color} strokeWidth="2"/>
      </g>
    </svg>
  );
}

export function SwitchIcon({ active }: { active?: boolean }) {
  const color = active ? "#0f766e" : "#7c8798";
  return (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      {active && (
        <defs>
          <filter id="shadow_switch" x="-4" y="0" width="45" height="45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_36" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_36" result="shape" />
          </filter>
        </defs>
      )}
      <g filter={active ? "url(#shadow_switch)" : undefined}>
        <path d="M11 27.5L10.2929 28.2071L11 28.9142L11.7071 28.2071L11 27.5ZM13.75 9.25C14.3023 9.25 14.75 8.80229 14.75 8.25C14.75 7.69772 14.3023 7.25 13.75 7.25L13.75 8.25L13.75 9.25ZM6.875 23.375L6.16789 24.0821L10.2929 28.2071L11 27.5L11.7071 26.7929L7.58211 22.6679L6.875 23.375ZM11 27.5L11.7071 28.2071L15.8321 24.0821L15.125 23.375L14.4179 22.6679L10.2929 26.7929L11 27.5ZM11 27.5L12 27.5L12 10.25L11 10.25L10 10.25L10 27.5L11 27.5ZM13 8.25L13 9.25L13.75 9.25L13.75 8.25L13.75 7.25L13 7.25L13 8.25ZM11 10.25L12 10.25C12 9.69772 12.4477 9.25 13 9.25L13 8.25L13 7.25C11.3431 7.25 10 8.59315 10 10.25L11 10.25Z" fill={color}/>
        <path d="M22 5.5L21.2929 4.79289L22 4.08579L22.7071 4.79289L22 5.5ZM22 24.125L23 24.125V24.125L22 24.125ZM19.25 27.125C18.6977 27.125 18.25 26.6773 18.25 26.125C18.25 25.5727 18.6977 25.125 19.25 25.125L19.25 26.125L19.25 27.125ZM17.875 9.625L17.1679 8.9179L21.2929 4.79289L22 5.5L22.7071 6.20711L18.5821 10.3321L17.875 9.625ZM22 5.5L22.7071 4.79289L26.8321 8.91789L26.125 9.625L25.4179 10.3321L21.2929 6.20711L22 5.5ZM22 5.5L23 5.5L23 24.125L22 24.125L21 24.125L21 5.5L22 5.5ZM20 26.125L20 27.125L19.25 27.125L19.25 26.125L19.25 25.125L20 25.125L20 26.125ZM22 24.125L23 24.125C23 25.7819 21.6569 27.125 20 27.125L20 26.125L20 25.125C20.5523 25.125 21 24.6773 21 24.125L22 24.125Z" fill={color}/>
      </g>
    </svg>
  );
}

export function PinIcon({ active }: { active?: boolean }) {
  const color = active ? "#0f766e" : "#7c8798";
  return (
    <svg width="37" height="43" viewBox="0 0 37 43" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      {active && (
        <defs>
          <filter id="shadow_pin" x="-4" y="0" width="45" height="45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_36" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_36" result="shape" />
          </filter>
        </defs>
      )}
      <g filter={active ? "url(#shadow_pin)" : undefined}>
        <path d="M30.0625 18.5C30.0625 26.5022 21.0092 31.8102 18.9245 32.9263C18.6547 33.0708 18.3453 33.0708 18.0755 32.9263C15.9908 31.8102 6.9375 26.5022 6.9375 18.5C6.9375 11.5625 12.5399 6.9375 18.5 6.9375C24.6667 6.9375 30.0625 11.5625 30.0625 18.5Z" stroke={color} strokeWidth="2"/>
        <circle cx="18.5" cy="18.5" r="5.16667" stroke={color} strokeWidth="2"/>
      </g>
    </svg>
  );
}

export function UserIcon({ active }: { active?: boolean }) {
  const color = active ? "#0f766e" : "#7c8798";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      {active && (
        <defs>
          <filter id="shadow_user" x="-4" y="0" width="45" height="45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_36" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_36" result="shape" />
          </filter>
        </defs>
      )}
      <g filter={active ? "url(#shadow_user)" : undefined}>
        <circle cx="20" cy="13.3334" r="5.66667" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.93264 25.8303C9.89941 23.6006 12.2481 22.5 14.6783 22.5H25.3217C27.7519 22.5 30.1006 23.6006 31.0674 25.8303C31.7198 27.335 32.3234 29.2762 32.4675 31.5001C32.5032 32.0512 32.0523 32.5 31.5 32.5H8.5C7.94772 32.5 7.49676 32.0512 7.53248 31.5001C7.67664 29.2762 8.28023 27.335 8.93264 25.8303Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

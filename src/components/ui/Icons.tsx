import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Menu = (p: IconProps) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Svg>;
export const Close = (p: IconProps) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const ChevronLeft = (p: IconProps) => <Svg {...p}><path d="m15 5-7 7 7 7" /></Svg>;
export const ChevronRight = (p: IconProps) => <Svg {...p}><path d="m9 5 7 7-7 7" /></Svg>;
export const ChevronDown = (p: IconProps) => <Svg {...p}><path d="m5 9 7 7 7-7" /></Svg>;
export const ArrowRight = (p: IconProps) => <Svg {...p}><path d="M4 12h16m-6-6 6 6-6 6" /></Svg>;
export const ArrowUpRight = (p: IconProps) => <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>;
export const Plus = (p: IconProps) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const Minus = (p: IconProps) => <Svg {...p}><path d="M5 12h14" /></Svg>;
export const Check = (p: IconProps) => <Svg {...p}><path d="m5 12 5 5L20 7" /></Svg>;
export const Calendar = (p: IconProps) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>;
export const Users = (p: IconProps) => <Svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></Svg>;
export const Bed = (p: IconProps) => <Svg {...p}><path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M6 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" /></Svg>;
export const Maximize = (p: IconProps) => <Svg {...p}><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" /></Svg>;
export const Eye = (p: IconProps) => <Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Svg>;
export const Star = (p: IconProps) => <Svg {...p}><path d="m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7L12 3Z" /></Svg>;
export const Phone = (p: IconProps) => <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Svg>;
export const Mail = (p: IconProps) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>;
export const MapPin = (p: IconProps) => <Svg {...p}><path d="M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Svg>;
export const Clock = (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const Pool = (p: IconProps) => <Svg {...p}><path d="M2 17c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5M7 14V5a2 2 0 0 1 4 0M13 14V5a2 2 0 0 1 4 0M7 8h6M7 12h6" /></Svg>;
export const Spa = (p: IconProps) => <Svg {...p}><path d="M12 21c-5 0-9-3.5-9-8 3 0 5.5 1 7 3-1-4 0-8 2-12 2 4 3 8 2 12 1.5-2 4-3 7-3 0 4.5-4 8-9 8Z" /></Svg>;
export const Wifi = (p: IconProps) => <Svg {...p}><path d="M2.5 8.5a14 14 0 0 1 19 0M5.5 12a10 10 0 0 1 13 0M8.5 15.5a5.5 5.5 0 0 1 7 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></Svg>;
export const Car = (p: IconProps) => <Svg {...p}><path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5h-2M3 13v5h2M3 13h18" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /></Svg>;
export const Plane = (p: IconProps) => <Svg {...p}><path d="M10 21v-4l-6 2v-2l6-4V7a2 2 0 1 1 4 0v6l6 4v2l-6-2v4l-2-1-2 1Z" /></Svg>;
export const Dumbbell = (p: IconProps) => <Svg {...p}><path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" /></Svg>;
export const Coffee = (p: IconProps) => <Svg {...p}><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9ZM16 11h1.5a2.5 2.5 0 0 1 0 5H16M7 3c0 1.5 1 1.5 1 3M11 3c0 1.5 1 1.5 1 3" /></Svg>;
export const Utensils = (p: IconProps) => <Svg {...p}><path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18M17 3c-2 1-3 4-3 8h3v10M17 3v8" /></Svg>;
export const Briefcase = (p: IconProps) => <Svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></Svg>;
export const Shield = (p: IconProps) => <Svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></Svg>;
export const Bell = (p: IconProps) => <Svg {...p}><path d="M4 17h16M5 17a7 7 0 0 1 14 0M12 10V8M9 20h6" /></Svg>;
export const Snowflake = (p: IconProps) => <Svg {...p}><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></Svg>;
export const Elevator = (p: IconProps) => <Svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 11V7l-2 2M9 7l2 2M15 13v4l-2-2M15 17l2-2" /></Svg>;
export const Trees = (p: IconProps) => <Svg {...p}><path d="M8 21v-4M8 17c-3 0-4.5-2-4.5-4.5L8 4l4.5 8.5C12.5 15 11 17 8 17ZM17 21v-3M17 18c-2.2 0-3.5-1.5-3.5-3.5L17 8l3.5 6.5C20.5 16.5 19.2 18 17 18Z" /></Svg>;
export const Wine = (p: IconProps) => <Svg {...p}><path d="M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0L8 3ZM12 13v7M8 20h8M8 7h8" /></Svg>;
export const Sparkles = (p: IconProps) => <Svg {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM5 18l.7 1.8L7.5 20.5l-1.8.7L5 23l-.7-1.8-1.8-.7 1.8-.7L5 18ZM19 3l.5 1.3 1.3.5-1.3.5L19 6.5l-.5-1.2-1.3-.5 1.3-.5L19 3Z" /></Svg>;
export const ZoomIn = (p: IconProps) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></Svg>;
export const ZoomOut = (p: IconProps) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M8 11h6" /></Svg>;
export const Printer = (p: IconProps) => <Svg {...p}><path d="M7 8V3h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7v-7Z" /></Svg>;
export const Copy = (p: IconProps) => <Svg {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></Svg>;
export const Quote = (p: IconProps) => <Svg {...p}><path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2M20 7h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2" /></Svg>;
export const Globe = (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Svg>;
export const Concierge = (p: IconProps) => <Svg {...p}><path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 11V9M10 9h4M9 21h6" /></Svg>;
export const Lock = (p: IconProps) => <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>;
export const Info = (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></Svg>;
export const Leaf = (p: IconProps) => <Svg {...p}><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14ZM5 19c3-4 6-7 10-10" /></Svg>;

/* Brand marks (filled) */
export const WhatsApp = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12.04 2C6.56 2 2.1 6.45 2.1 11.93c0 1.98.57 3.9 1.66 5.57L2 22l4.63-1.7a9.9 9.9 0 0 0 5.4 1.57h.01c5.48 0 9.94-4.45 9.94-9.93A9.87 9.87 0 0 0 12.04 2Zm0 18.17c-1.68 0-3.3-.47-4.71-1.36l-.34-.2-2.75 1 .98-2.68-.22-.35a8.1 8.1 0 0 1-1.25-4.33c0-4.5 3.66-8.17 8.17-8.17a8.1 8.1 0 0 1 5.78 2.4 8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.17-8.17 8.17Zm4.49-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.63.8-.78.97-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.3.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.44.06-.66.3-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.57.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29Z" />
  </svg>
);
export const Facebook = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  </svg>
);
export const Instagram = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
export const XSocial = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.5 3h3l-7.1 8.1L21.7 21h-6.3l-4.9-6.4L4.8 21h-3l7.6-8.7L1.5 3h6.4l4.5 5.9L17.5 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.2 14.5Z" />
  </svg>
);
export const TikTok = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M16.6 3c.3 2.4 1.7 3.9 4.1 4.1v3.1c-1.5.1-2.9-.4-4.1-1.2v6.3c0 3.5-2.5 5.9-5.8 5.9A5.6 5.6 0 0 1 5.3 15c.2-3.3 3-5.8 6.4-5.4v3.3c-1.8-.5-3.4.8-3.3 2.4.1 1.2 1 2.1 2.2 2.2 1.5.1 2.6-1 2.6-2.5V3h3.4Z" />
  </svg>
);

import type { ReactNode } from "react";

/**
 * Small, bundled icon set. Keeping these SVGs in the component avoids a network
 * font dependency, which was causing the icon names to appear as visible text.
 */
const iconPaths: Record<string, ReactNode> = {
  handyman: (
    <>
      <path d="m14 5 5 5-2.5 2.5-2-2L7 18l-3-3 7.5-7.5-2-2L12 3l2 2Z" />
      <path d="m3 4 3 3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),
  star: (
    <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 5.9-5.4-2.8-5.4 2.8 1-5.9L3.3 9.4l6-.9Z" />
  ),
  favorite: (
    <path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
  ),
  location_on: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow_forward: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  arrow_back: (
    <>
      <path d="M19 12H5m6-6-6 6 6 6" />
    </>
  ),
  verified: (
    <>
      <path d="m12 3 2.1 2 2.9-.3.9 2.7 2.5 1.5-1 2.7 1 2.7-2.5 1.5-.9 2.7-2.9-.3-2.1 2-2.1-2-2.9.3-.9-2.7-2.5-1.5 1-2.7-1-2.7 2.5-1.5.9-2.7 2.9.3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  chat: (
    <>
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
      <path d="M8 10h8m-8 4h5" />
    </>
  ),
  verified_user: (
    <>
      <path d="m12 3 7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  call: (
    <path d="M7.5 3.5 5 5c-1 1 1.5 6.5 5.5 10.5S20 22 21 19.5L22.5 17l-4-2.5-2 2c-2.5-1-4-2.5-5-5l2-2Z" />
  ),
  more_vert: (
    <>
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </>
  ),
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5 5.5-5.5" />
    </>
  ),
  add: <path d="M12 5v14M5 12h14" />,
  send: (
    <>
      <path d="m21 3-7 18-3.5-7.5L3 10Z" />
      <path d="m10.5 13.5 5-5" />
    </>
  ),
  explore: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  chat_bubble: (
    <>
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18M10 12v2h4v-2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </>
  ),
};

export function Icon({ children }: { children: string }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[children] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

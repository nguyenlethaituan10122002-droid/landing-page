/**
 * Bo icon SVG tu ve — khong dung thu vien icon nao.
 * Net 1.6px, style dong nhat, thua ke mau tu currentColor.
 */
type P = { className?: string }

const base = 'h-6 w-6'
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Svg = ({ className, children }: P & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true" {...strokeProps}>
    {children}
  </svg>
)

export const IconAircon = (p: P) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="7" rx="2" />
    <path d="M5.5 8.5h13M6 14.5c0 1.6 1 2.2 1 3.5M12 14.5c0 2 1.2 2.5 1.2 4M18 14.5c0 1.6-1 2.2-1 3.5" />
  </Svg>
)
export const IconFridge = (p: P) => (
  <Svg {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M5 9.5h14M8 5.8v1.8M8 12.5v2.4" />
  </Svg>
)
export const IconWasher = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="2.5" width="17" height="19" rx="2.5" />
    <circle cx="12" cy="14" r="4.6" />
    <path d="M7 6.2h.01M10 6.2h.01M9.2 14a2.8 2.8 0 0 0 5.6 0" />
  </Svg>
)
export const IconSparkle = (p: P) => (
  <Svg {...p}>
    <path d="M12 2.5v19M2.5 12h19M5.4 5.4l13.2 13.2M18.6 5.4 5.4 18.6" />
    <circle cx="12" cy="12" r="2.6" />
  </Svg>
)
export const IconDrum = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.4" />
    <path d="M12 3v4.6M12 16.4V21M3 12h4.6M16.4 12H21" />
  </Svg>
)
export const IconTv = (p: P) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="13" rx="2" />
    <path d="M8.5 21h7M12 17v4" />
  </Svg>
)
export const IconAppliance = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <circle cx="8.2" cy="8.2" r="2" />
    <circle cx="15.8" cy="8.2" r="2" />
    <path d="M6.2 15.5h11.6" />
  </Svg>
)
export const IconMove = (p: P) => (
  <Svg {...p}>
    <path d="M12 2.8v18.4M2.8 12h18.4M12 2.8 9.4 5.6M12 2.8l2.6 2.8M12 21.2l-2.6-2.8M12 21.2l2.6-2.8M2.8 12l2.8-2.6M2.8 12l2.8 2.6M21.2 12l-2.8-2.6M21.2 12l-2.8 2.6" />
  </Svg>
)
export const IconClock = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 6.8V12l3.4 2" /></Svg>
)
export const IconShield = (p: P) => (
  <Svg {...p}>
    <path d="M12 2.6 4.5 5.8v6c0 4.4 3.1 8.3 7.5 9.6 4.4-1.3 7.5-5.2 7.5-9.6v-6z" />
    <path d="m8.8 11.8 2.3 2.3 4.1-4.4" />
  </Svg>
)
export const IconCalendar = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="4.8" width="18" height="16.2" rx="2.4" />
    <path d="M3 9.8h18M8 2.6v4M16 2.6v4" />
  </Svg>
)
export const IconTag = (p: P) => (
  <Svg {...p}>
    <path d="M20.6 12.9 12.7 20.8a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1-.6-1.5l.3-6.5a2 2 0 0 1 1.9-1.9l6.5-.3a2 2 0 0 1 1.5.6l6.7 6.7a2 2 0 0 1 .1 2.7z" />
    <circle cx="8.2" cy="8.2" r="1.4" />
  </Svg>
)
export const IconGift = (p: P) => (
  <Svg {...p}>
    <rect x="2.8" y="8" width="18.4" height="4.4" rx="1.2" />
    <path d="M4.6 12.4V20a1.4 1.4 0 0 0 1.4 1.4h12a1.4 1.4 0 0 0 1.4-1.4v-7.6M12 8v13.4" />
    <path d="M12 8S10.6 2.6 8 2.6a2.7 2.7 0 0 0 0 5.4zM12 8s1.4-5.4 4-5.4a2.7 2.7 0 0 1 0 5.4z" />
  </Svg>
)
export const IconChip = (p: P) => (
  <Svg {...p}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.8" />
    <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />
  </Svg>
)
export const IconPhone = (p: P) => (
  <Svg {...p}>
    <path d="M21.5 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.6 18.6 0 0 1-8.1-2.9 18.3 18.3 0 0 1-5.6-5.6A18.6 18.6 0 0 1 2.8 4.9a1.9 1.9 0 0 1 1.9-2.1h2.8a1.9 1.9 0 0 1 1.9 1.6c.1 1 .35 1.9.7 2.8a1.9 1.9 0 0 1-.4 2l-1.2 1.2a15 15 0 0 0 5.6 5.6l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.35 1.8.6 2.8.7a1.9 1.9 0 0 1 1.6 1.9z" />
  </Svg>
)
export const IconChat = (p: P) => (
  <Svg {...p}>
    <path d="M21 11.6a8.1 8.1 0 0 1-8.7 8.1 9 9 0 0 1-3.4-.8L3 21l2.2-5.1a8.1 8.1 0 0 1-.8-3.5A8.1 8.1 0 0 1 12.6 4h.5A8.1 8.1 0 0 1 21 11.6z" />
  </Svg>
)
export const IconCheck = (p: P) => (
  <Svg {...p}><path d="m4.5 12.5 5 5 10-11" /></Svg>
)
export const IconArrow = (p: P) => (
  <Svg {...p}><path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" /></Svg>
)
export const IconChevron = (p: P) => (
  <Svg {...p}><path d="m7 9.5 5 5 5-5" /></Svg>
)
export const IconMapPin = (p: P) => (
  <Svg {...p}>
    <path d="M20 10.4c0 5.9-8 12.2-8 12.2s-8-6.3-8-12.2a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10.2" r="2.9" />
  </Svg>
)
export const IconMail = (p: P) => (
  <Svg {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2.2" /><path d="m2.9 6.4 9.1 6.4 9.1-6.4" /></Svg>
)
/**
 * Dau hieu Zalo — chu "Zalo" tren nen bo tron mau xanh thuong hieu.
 * Dung <text> thay vi ve tay tung net chu: luon doc dung, khong bi bien dang.
 * font-family="inherit" -> ke thua Be Vietnam Pro cua trang.
 */
export const IconZalo = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
    <rect width="48" height="48" rx="14" fill="#0068FF" />
    <text
      x="24"
      y="25"
      textAnchor="middle"
      dominantBaseline="central"
      fill="#fff"
      fontSize="16.5"
      fontWeight="800"
      fontFamily="inherit"
      letterSpacing="-0.4"
    >
      Zalo
    </text>
  </svg>
)

export const serviceIcons: Record<string, (p: P) => React.JSX.Element> = {
  aircon: IconAircon, fridge: IconFridge, washer: IconWasher, sparkle: IconSparkle,
  drum: IconDrum, tv: IconTv, appliance: IconAppliance, move: IconMove,
}

export const featureIcons: Record<string, (p: P) => React.JSX.Element> = {
  clock: IconClock, shield: IconShield, calendar: IconCalendar,
  tag: IconTag, gift: IconGift, chip: IconChip,
}

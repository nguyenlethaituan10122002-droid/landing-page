'use client'
import { useEffect, useState } from 'react'
import { IconPhone, IconZalo, IconArrow } from '@/components/icons/Icons'
import { site } from '@/content/site'
import { displayPhone, telHref, zaloHref } from '@/lib/format'

/**
 * Cum nut noi goc phai duoi — chi hien tren desktop sau khi cuon qua 600px.
 * Xep tu tren xuong: len dau trang · chat Zalo · goi dien.
 * (Tren mobile da co thanh CTA co dinh o day man hinh nen an cum nay di.)
 */
export function FloatingCall() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed right-6 bottom-6 z-40 hidden flex-col items-center gap-3 transition-all duration-500 lg:flex ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Lên đầu trang"
        className="group/top grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-brand-700 shadow-[var(--shadow-card)] transition-colors hover:bg-brand-50"
      >
        <IconArrow className="h-5 w-5 -rotate-90" />
      </button>

      <FloatItem
        href={zaloHref(site.zalo)}
        label="Chat Zalo"
        external
        className="h-14 w-14 bg-[#0068FF] shadow-[0_10px_28px_rgb(0_104_255/0.4)] hover:shadow-[0_14px_36px_rgb(0_104_255/0.55)]"
      >
        <IconZalo className="h-14 w-14 rounded-full" />
      </FloatItem>

      <FloatItem
        href={telHref(site.phone)}
        label={`Gọi ${displayPhone(site.phone)}`}
        className="ping-ring h-16 w-16 bg-accent-500 text-brand-950 shadow-[var(--shadow-glow)]"
      >
        <IconPhone className="h-7 w-7" />
      </FloatItem>
    </div>
  )
}

/** Nut tron co nhan chu truot ra ben trai khi ro chuot. */
function FloatItem({
  href, label, external, className, children,
}: {
  href: string
  label: string
  external?: boolean
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative grid place-items-center overflow-visible rounded-full transition-transform hover:scale-105 ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] rounded-lg bg-brand-950 px-3 py-1.5 text-[13px] font-bold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  )
}

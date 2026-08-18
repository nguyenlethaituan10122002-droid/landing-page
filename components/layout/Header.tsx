'use client'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Container } from '@/components/ui/Container'
import { IconPhone } from '@/components/icons/Icons'
import { navLinks } from '@/content/nav'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Khoa cuon nen khi menu mobile dang mo
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-4">
          <a href="#top" aria-label={`${site.name} — về đầu trang`} className="min-w-0 flex-1 lg:flex-none">
            <Logo tone={scrolled ? 'dark' : 'light'} />
          </a>

          <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                  scrolled ? 'text-ink-2 hover:bg-brand-50 hover:text-brand-700' : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telHref(site.phone)}
              className="hidden items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-[14px] font-bold text-brand-950 shadow-[var(--shadow-glow)] transition-all hover:bg-accent-300 active:scale-95 sm:inline-flex"
            >
              <IconPhone className="h-4 w-4" />
              {displayPhone(site.phone)}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                scrolled || open ? 'bg-brand-50 text-brand-800' : 'bg-white/10 text-white backdrop-blur-sm'
              }`}
            >
              <span className="relative block h-4 w-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300"
                    style={{
                      top: open ? '7px' : `${i * 7}px`,
                      transform: open ? `rotate(${i === 0 ? 45 : i === 2 ? -45 : 45}deg)` : 'none',
                      opacity: open && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Panel menu tren mobile */}
      <div
        className={`overflow-hidden border-t border-line bg-white transition-[max-height] duration-400 ease-[var(--ease-out-soft)] lg:hidden ${
          open ? 'max-h-[520px]' : 'max-h-0'
        }`}
      >
        <Container className="py-4">
          <nav aria-label="Điều hướng trên điện thoại" className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[15px] font-semibold text-ink last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={telHref(site.phone)}
            className="mt-4 flex h-13 items-center justify-center gap-2 rounded-full bg-accent-500 py-3.5 font-bold text-brand-950"
          >
            <IconPhone className="h-5 w-5" />
            Gọi {displayPhone(site.phone)}
          </a>
        </Container>
      </div>
    </header>
  )
}

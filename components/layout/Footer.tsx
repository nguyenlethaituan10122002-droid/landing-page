import { Container } from '@/components/ui/Container'
import { Logo } from './Logo'
import { IconPhone, IconChat, IconMail, IconMapPin, IconClock } from '@/components/icons/Icons'
import { site, fullAddress } from '@/content/site'
import { navLinks } from '@/content/nav'
import { displayPhone, telHref, zaloHref } from '@/lib/format'

/**
 * Chan trang.
 * Da luoc bo: ma so thue, Fanpage, Google Maps, chi nhanh khac
 * — khach khong cung cap du lieu that (nguyen tac NT-01).
 */
export function Footer() {
  const contacts = [
    { icon: IconPhone, label: 'Hotline chính', value: displayPhone(site.phone), href: telHref(site.phone) },
    { icon: IconPhone, label: 'Hotline phụ', value: displayPhone(site.phoneAlt), href: telHref(site.phoneAlt) },
    { icon: IconChat, label: 'Zalo', value: displayPhone(site.zalo), href: zaloHref(site.zalo) },
    { icon: IconMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <footer className="bg-brand-950 text-brand-200">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="min-w-0">
            <Logo tone="light" taglineFrom="always" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-brand-200/80">
              {site.description}
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-[14px]">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <address className="not-italic leading-relaxed">{fullAddress}</address>
            </div>
            <div className="mt-3 flex items-center gap-2.5 text-[14px]">
              <IconClock className="h-4 w-4 shrink-0 text-accent-300" />
              <span>{site.hours.display}</span>
            </div>
          </div>

          <nav aria-label="Liên kết nhanh" className="min-w-0">
            <h2 className="text-[13px] font-bold tracking-wider text-white uppercase">Liên kết</h2>
            <ul className="mt-5 space-y-3 text-[14px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-accent-300">{l.label}</a>
                </li>
              ))}
              <li>
                <a href="/chinh-sach-bao-mat" className="transition-colors hover:text-accent-300">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="text-[13px] font-bold tracking-wider text-white uppercase">Liên hệ</h2>
            <ul className="mt-5 space-y-3.5">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-accent-300 transition-colors group-hover:bg-accent-500 group-hover:text-brand-950">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] text-brand-200/60">{c.label}</span>
                      <span className="block truncate text-[14px] font-semibold text-white">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-brand-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <p>Sửa chữa &amp; bảo dưỡng điện lạnh tại nhà — TP. Hồ Chí Minh</p>
        </div>
      </Container>
    </footer>
  )
}

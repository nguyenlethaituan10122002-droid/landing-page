import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconPhone, IconShield } from '@/components/icons/Icons'
import { pricing, pricingNote } from '@/content/pricing'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'

/**
 * Bang gia — khoi quan trong nhat ve chuyen doi.
 * Dung <table> ngu nghia tren desktop (Google doc duoc), the xep chong tren mobile
 * de KHONG phai cuon ngang.
 */
export function Pricing() {
  return (
    <section id="bang-gia" aria-labelledby="bang-gia-title" className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="bang-gia-title"
          eyebrow="Bảng giá"
          title="Giá dịch vụ công khai, không phát sinh"
          desc="Bảng giá áp dụng cho khu vực TP.HCM. Kỹ thuật viên báo giá chi tiết tại nhà trước khi thực hiện."
        />

        <Reveal className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
          {/* --- Desktop: bang that --- */}
          <table className="hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">
              Bảng giá dịch vụ sửa chữa và vệ sinh điện lạnh tại nhà TP.HCM
            </caption>
            <thead>
              <tr className="bg-brand-900 text-white">
                <th scope="col" className="px-6 py-4 text-[13px] font-bold tracking-wide uppercase">Hạng mục</th>
                <th scope="col" className="px-6 py-4 text-[13px] font-bold tracking-wide uppercase">Thiết bị / phạm vi</th>
                <th scope="col" className="px-6 py-4 text-right text-[13px] font-bold tracking-wide uppercase">Giá</th>
                <th scope="col" className="px-6 py-4 text-right text-[13px] font-bold tracking-wide uppercase">Bảo hành</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row, i) => (
                <tr key={`${row.item}-${row.scope}`} className={`border-t border-line transition-colors hover:bg-brand-50 ${i % 2 ? 'bg-brand-50/40' : ''}`}>
                  <th scope="row" className="px-6 py-4 text-[14.5px] font-bold text-brand-900">{row.item}</th>
                  <td className="px-6 py-4 text-[14px] text-ink-2">{row.scope}</td>
                  <td className="px-6 py-4 text-right text-[14.5px] font-extrabold whitespace-nowrap text-warm-500">{row.price}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-[12.5px] font-bold whitespace-nowrap text-brand-700">
                      <IconShield className="h-3.5 w-3.5" />
                      {row.warranty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Mobile: the xep chong, khong cuon ngang --- */}
          <ul className="divide-y divide-line md:hidden">
            {pricing.map((row) => (
              <li key={`${row.item}-${row.scope}-m`} className="p-5">
                <h3 className="text-[15px] font-extrabold text-brand-900">{row.item}</h3>
                <p className="mt-1 text-[13px] text-muted">{row.scope}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[16px] font-extrabold text-warm-500">{row.price}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-[12px] font-bold text-brand-700">
                    <IconShield className="h-3.5 w-3.5" />
                    BH {row.warranty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1} className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[var(--radius-card)] border border-brand-200 bg-white p-5 sm:flex-row sm:p-6">
          <p id="bao-hanh" className="max-w-2xl text-[13.5px] leading-relaxed text-ink-2">
            {pricingNote}
          </p>
          <a
            href={telHref(site.phone)}
            className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-700 px-5 font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-600 sm:w-auto sm:px-6"
          >
            <IconPhone className="h-4 w-4" />
            {/* Man hinh rat hep chi hien nhan ngan de khong tran */}
            <span className="xs:hidden">Gọi báo giá</span>
            <span className="hidden xs:inline">Gọi báo giá {displayPhone(site.phone)}</span>
          </a>
        </Reveal>
      </Container>
    </section>
  )
}

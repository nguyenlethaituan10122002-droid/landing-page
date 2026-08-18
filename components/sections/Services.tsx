import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { serviceIcons, IconCheck, IconChevron, IconPhone } from '@/components/icons/Icons'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { telHref } from '@/lib/format'

export function Services() {
  return (
    <section id="dich-vu" aria-labelledby="dich-vu-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="dich-vu-title"
          eyebrow="Dịch vụ"
          title="Sửa chữa & bảo dưỡng mọi thiết bị điện lạnh"
          desc="Máy lạnh · tủ lạnh · máy giặt · bếp từ · lò vi sóng · máy rửa chén · máy lọc nước — nhận sửa tại nhà tất cả hãng."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon]
            return (
              <Reveal as="li" key={s.slug} delay={((i % 8) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}>
                <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-all duration-400 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 transition-colors duration-400 group-hover:from-brand-700 group-hover:to-brand-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>

                  <h3 className="mt-5 text-[17px] leading-snug font-extrabold text-brand-900">{s.name}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{s.desc}</p>

                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13.5px] text-muted">
                        <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Danh sach loi thuong gap — giu nguyen van trong HTML de bot doc duoc */}
                  {s.faults && (
                    <details className="group/d mt-4 rounded-xl bg-brand-50 px-3.5 py-2.5">
                      <summary className="flex items-center justify-between gap-2 text-[13px] font-bold text-brand-700">
                        Các lỗi thường gặp
                        <IconChevron className="h-4 w-4 transition-transform duration-300 group-open/d:rotate-180" />
                      </summary>
                      <ul className="mt-2.5 space-y-1.5 border-t border-brand-200/60 pt-2.5">
                        {s.faults.map((f) => (
                          <li key={f} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-5">
                    <span className="min-w-0">
                      {s.price ? (
                        <>
                          <span className="block text-[18px] font-extrabold text-warm-500">{s.price}</span>
                          <span className="mt-0.5 block text-[12px] text-muted">{s.priceNote}</span>
                        </>
                      ) : (
                        <span className="block text-[13.5px] font-semibold text-ink-2">{s.priceNote}</span>
                      )}
                    </span>
                    <a
                      href={telHref(site.phone)}
                      aria-label={`Gọi tư vấn ${s.name}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-accent-500 hover:text-brand-950"
                    >
                      <IconPhone className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

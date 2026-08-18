import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconChevron, IconPhone } from '@/components/icons/Icons'
import { faqs } from '@/content/faq'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'

/**
 * Dung <details>/<summary> goc HTML: khong can JS, noi dung luon nam trong DOM
 * nen Google doc duoc toan bo cau tra loi (khop voi JSON-LD FAQPage).
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading id="faq-title" eyebrow="Hỏi đáp" title="Câu hỏi thường gặp" />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}>
              <details className="group overflow-hidden rounded-2xl border border-line bg-white transition-colors open:border-brand-200 open:bg-brand-50/50 hover:border-brand-200">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-brand-900 sm:px-6 sm:py-5">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 transition-transform duration-300 group-open:rotate-180 group-open:bg-brand-700 group-open:text-white">
                    <IconChevron className="h-4 w-4" />
                  </span>
                </summary>
                <p className="border-t border-line px-5 py-4 text-[14.5px] leading-relaxed text-ink-2 sm:px-6">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-900 p-6 text-center sm:flex-row sm:text-left">
            <p className="text-[14.5px] leading-relaxed text-brand-200">
              Còn thắc mắc khác? Gọi tổng đài để được kỹ thuật viên tư vấn trực tiếp.
            </p>
            <a
              href={telHref(site.phone)}
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-accent-500 px-6 font-bold whitespace-nowrap text-brand-950 transition-colors hover:bg-accent-300"
            >
              <IconPhone className="h-4 w-4" />
              {displayPhone(site.phone)}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

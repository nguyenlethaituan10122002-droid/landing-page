import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { featureIcons } from '@/components/icons/Icons'
import { promises } from '@/content/promises'

/**
 * Dai cam ket nhanh.
 * Chi hien con so co can cu — khong dung so thong ke tu khai (NT-01).
 */
export function Promises() {
  return (
    <section aria-label="Cam kết dịch vụ" className="relative z-10 -mt-8 lg:-mt-12">
      <Container>
        <div className="grid gap-3 rounded-[var(--radius-card)] border border-line bg-white p-4 shadow-[var(--shadow-lift)] sm:grid-cols-3 sm:gap-2 sm:p-5">
          {promises.map((p, i) => {
            const Icon = featureIcons[p.icon]
            return (
              <Reveal
                key={p.label}
                delay={(i + 1) as 1 | 2 | 3}
                className="flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-colors hover:bg-brand-50 sm:flex-col sm:gap-2 sm:py-4 sm:text-center"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-[19px] leading-tight font-extrabold text-brand-900 sm:text-[21px]">
                    {p.value}
                  </span>
                  <span className="mt-0.5 block text-[13px] font-medium text-muted">{p.label}</span>
                </span>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

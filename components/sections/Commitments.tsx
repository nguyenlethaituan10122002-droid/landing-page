import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featureIcons } from '@/components/icons/Icons'
import { commitments } from '@/content/commitments'

export function Commitments() {
  return (
    <section id="cam-ket" aria-labelledby="cam-ket-title" className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 grid-pattern opacity-70" />
      <div
        className="absolute -bottom-40 -left-32 h-[440px] w-[440px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />

      <Container className="relative">
        <SectionHeading
          id="cam-ket-title"
          tone="dark"
          eyebrow="Cam kết"
          title="Vì sao khách hàng chọn chúng tôi"
          desc="Minh bạch từ giá đến quy trình — bạn biết chính xác mình trả tiền cho việc gì."
        />

        {/* Luoi 6 cot: 3 the tren (2 cot moi the) + 2 the duoi (3 cot moi the) -> khong con o le */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {commitments.map((c, i) => {
            const Icon = featureIcons[c.icon]
            return (
              <Reveal
                as="li"
                key={c.no}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              >
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-400 ease-[var(--ease-out-soft)] hover:border-accent-500/40 hover:bg-white/[0.08]">
                  <span className="absolute top-3 right-5 text-[52px] leading-none font-extrabold text-accent-300/35 transition-colors duration-400 group-hover:text-accent-300/70">
                    {c.no}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/15 text-accent-300 transition-colors duration-400 group-hover:bg-accent-500 group-hover:text-brand-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold text-white">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-brand-200/85">{c.desc}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

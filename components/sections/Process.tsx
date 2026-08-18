import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/content/process'
import { img, type ImageKey } from '@/lib/images'

export function Process() {
  return (
    <section id="quy-trinh" aria-labelledby="quy-trinh-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="quy-trinh-title"
          eyebrow="Quy trình"
          title="4 bước — từ lúc gọi đến khi máy chạy lại"
          desc="Mọi bước đều rõ ràng để bạn dễ theo dõi và yên tâm cho đến khi máy hoạt động ổn định trở lại."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const photo = img(step.image as ImageKey)
            return (
              <Reveal as="li" key={step.no} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="relative">
                {/* Duong noi giua cac buoc tren desktop */}
                {i < processSteps.length - 1 && (
                  <span className="draw-line absolute top-[86px] -right-3 z-10 hidden h-0.5 w-6 bg-gradient-to-r from-brand-400 to-transparent lg:block" />
                )}

                <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-400 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL={photo.blurDataURL}
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-[16px] font-extrabold text-brand-950 shadow-lg">
                      {step.no}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-[16px] font-extrabold text-brand-900">{step.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{step.desc}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

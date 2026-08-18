'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { img, beforeAfterPairs } from '@/lib/images'

/**
 * So sanh Truoc / Sau bang thanh keo.
 * Anh that tu cong viec ve sinh may giat cua doi ky thuat.
 */
export function BeforeAfter() {
  return (
    <section aria-labelledby="truoc-sau-title" className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="truoc-sau-title"
          eyebrow="Hình ảnh thật"
          title="Trước và sau khi vệ sinh"
          desc="Ảnh chụp trực tiếp trong quá trình làm việc — kéo thanh giữa để so sánh."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {beforeAfterPairs.map((pair, i) => (
            <Reveal key={pair.label} delay={(i + 1) as 1 | 2} className="reveal-zoom">
              <Slider before={pair.before} after={pair.after} label={pair.label} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50)
  const b = img(before as never)
  const a = img(after as never)

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
      <div className="relative aspect-square select-none">
        {/* Anh SAU nam duoi */}
        <Image src={a.src} alt={a.alt} fill sizes="(max-width:768px) 100vw, 50vw"
          placeholder="blur" blurDataURL={a.blurDataURL} className="object-cover" />

        {/* Anh TRUOC cat theo vi tri thanh keo */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={b.src} alt={b.alt} fill sizes="(max-width:768px) 100vw, 50vw"
            placeholder="blur" blurDataURL={b.blurDataURL} className="object-cover" />
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-brand-950/80 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-sm">
          Trước
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-accent-500 px-3 py-1.5 text-[12px] font-bold text-brand-950">
          Sau
        </span>

        {/* Duong keo */}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-accent-500 shadow-lg">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-950" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="m9 7-4 5 4 5M15 7l4 5-4 5" />
            </svg>
          </span>
        </div>

        <input
          type="range" min={0} max={100} value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`So sánh trước và sau — ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="border-t border-line px-5 py-3.5 text-[14px] font-semibold text-brand-900">
        {label}
      </figcaption>
    </figure>
  )
}

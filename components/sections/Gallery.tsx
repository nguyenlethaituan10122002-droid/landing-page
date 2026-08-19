'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import { img, galleryKeys } from '@/lib/images'

/** Gallery anh cong viec thuc te — toan bo do doi ky thuat chup tai hien truong. */
export function Gallery() {
  const photos = galleryKeys.map(img)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="hinh-anh" aria-labelledby="hinh-anh-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="hinh-anh-title"
          eyebrow="Công việc thực tế"
          title="Hình ảnh tại công trình"
          desc="Trải bạt bảo vệ sàn, tháo lồng vệ sinh sâu, dọn dẹp sạch sẽ trước khi bàn giao — ảnh chụp thực tế, không dàn dựng."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, i) => (
            <Reveal as="li" key={galleryKeys[i]} delay={((i % 8) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Phóng to ảnh: ${photo.alt}`}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-brand-50"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* Bieu tuong kinh lup hien khi ro chuot */}
                <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white/95 text-brand-800 opacity-0 transition-all duration-400 ease-[var(--ease-out-soft)] group-hover:scale-100 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m20 20-4.2-4.2M11 8.6v4.8M8.6 11h4.8" />
                  </svg>
                </span>

                {/* aria-hidden: noi dung nay trung voi alt cua anh, de trinh doc man hinh
                    khong doc lai lan hai */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 translate-y-3 p-3.5 text-left text-[12.5px] leading-snug font-medium text-white opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {photo.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onNav={setOpen} />
    </section>
  )
}

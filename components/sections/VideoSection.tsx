'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconCheck } from '@/components/icons/Icons'
import { video, videoEmbedUrl } from '@/content/video'
import { img } from '@/lib/images'

const DIEM_NHAN = [
  'Che chắn đồ đạc trước khi bắt đầu',
  'Xịt rửa dàn lạnh bằng máy bơm áp lực',
  'Vệ sinh cánh quạt lồng sóc — nơi bám bẩn nhiều nhất',
  'Lắp lại, chạy thử và dọn sạch khu vực',
]

/**
 * Nhung video theo kieu "facade": ban dau chi la mot tam anh tinh + nut play.
 * Chi khi khach bam thi moi nap iframe YouTube.
 *
 * Vi sao khong nhung iframe thang: mot iframe YouTube keo theo ~700 KB
 * JavaScript va hang chuc request NGAY khi tai trang, du khach khong he bam
 * play. Diem Performance rot thang, ma LCP cua trang lai nam o hero.
 * Facade giu nguyen toc do trang, doi lai khach phai bam mot lan.
 */
export function VideoSection() {
  const [dangChay, setDangChay] = useState(false)
  const poster = img('video-poster')

  return (
    <section id="video" aria-labelledby="video-title" className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <SectionHeading
              id="video-title"
              align="left"
              eyebrow="Xem tận mắt"
              title="Quy trình vệ sinh máy lạnh tại nhà"
              desc="Không có gì thuyết phục bằng việc xem thợ làm thật. Toàn bộ quy trình được quay lại nguyên vẹn, không cắt ghép."
            />

            <Reveal delay={1}>
              <ul className="mt-8 space-y-3.5">
                {DIEM_NHAN.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-ink-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15">
                      <IconCheck className="h-3 w-3 text-brand-700" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={2} className="reveal-right mx-auto w-full max-w-[300px] lg:max-w-none">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] bg-brand-950 shadow-[var(--shadow-lift)]">
              {dangChay ? (
                <iframe
                  src={videoEmbedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setDangChay(true)}
                  aria-label={`Phát video: ${video.title}`}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    sizes="(max-width: 1024px) 300px, 380px"
                    placeholder="blur"
                    blurDataURL={poster.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/20" />

                  <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-110">
                    {/* Tam giac play — lech phai 2px cho can thi giac */}
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-brand-950" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <span className="block text-[14px] font-extrabold text-white">
                      Vệ sinh máy lạnh tận nơi
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-brand-200">
                      Bấm để xem · 5 phút 57 giây
                    </span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

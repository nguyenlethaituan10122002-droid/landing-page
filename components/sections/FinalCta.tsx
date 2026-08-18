import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { IconPhone, IconChat, IconArrow } from '@/components/icons/Icons'
import { site } from '@/content/site'
import { displayPhone, telHref, zaloHref } from '@/lib/format'
import { img } from '@/lib/images'
import { Snowfall } from '@/components/ui/Snowfall'

export function FinalCta() {
  const photo = img('g-08')

  return (
    <section id="lien-he" aria-labelledby="lien-he-title" className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <Image
        src={photo.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/94 to-brand-900/80" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <Snowfall mậtĐộ="thưa" />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="lien-he-title" className="text-[28px] leading-[1.18] font-extrabold text-white sm:text-[36px] lg:text-[42px]">
            Máy đang hỏng? Gọi ngay,
            <br />
            <span className="text-gradient">thợ tới sau 30 phút</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-brand-200 sm:text-[17px]">
            Tổng đài hoạt động {site.hours.sentence}. Miễn phí kiểm tra, báo giá trước khi sửa.
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <a
              href={telHref(site.phone)}
              className="shine inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent-500 px-8 text-base font-bold text-brand-950 shadow-[var(--shadow-glow)] transition-all hover:bg-accent-300 active:scale-[.97]"
            >
              <IconPhone className="h-5 w-5" />
              Gọi {displayPhone(site.phone)}
            </a>
            <a
              href={zaloHref(site.zalo)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border-2 border-white/25 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              <IconChat className="h-5 w-5" />
              Chat Zalo
            </a>
            <a
              href="#dat-lich"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-base font-bold text-brand-200 transition-colors hover:text-white"
            >
              Đặt lịch online
              <IconArrow className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-7 text-[13.5px] text-brand-200/70">
            Hotline phụ {displayPhone(site.phoneAlt)} · Miễn phí kiểm tra trong nội thành TP.HCM
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

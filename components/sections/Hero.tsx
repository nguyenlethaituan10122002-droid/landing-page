import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { BookingForm } from '@/components/form/BookingForm'
import { IconPhone, IconCheck, IconArrow } from '@/components/icons/Icons'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'
import { img } from '@/lib/images'
import { Snowfall } from '@/components/ui/Snowfall'

const usps = ['Miễn phí kiểm tra', 'Giá cả minh bạch', 'Bảo hành đến 12 tháng', 'Làm việc cả T7 – CN']

export function Hero() {
  const hero = img('hero')

  return (
    <section id="top" className="relative overflow-hidden bg-brand-950 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Anh nen that: ky thuat vien dang ve sinh dan lanh */}
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={hero.blurDataURL}
        className="ken-burns object-cover object-center opacity-80"
      />
      {/* Lop phu gradient giup chu luon du tuong phan */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/96 via-brand-950/80 to-brand-900/55" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div
        className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 68%)' }}
      />
      <Snowfall />

      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_440px] lg:gap-14">
          {/* ---------- Cot trai: thong diep chinh ---------- */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[13px] font-semibold backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Đang nhận lịch — thợ có mặt sau 30 phút
            </span>

            <h1 className="mt-6 text-[32px] leading-[1.14] font-extrabold sm:text-[42px] lg:text-[52px]">
              Sửa máy lạnh, tủ lạnh,
              <br />
              <span className="text-gradient">máy giặt tại nhà</span> TP.HCM
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-brand-200 sm:text-[17px]">
              Kiểm tra miễn phí, báo giá trước khi sửa — không phát sinh. Kỹ thuật viên tay nghề cao,
              có mặt trong 30 phút, bảo hành đến 12 tháng.
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {usps.map((u) => (
                <li key={u} className="flex items-center gap-2.5 text-[14.5px] font-semibold text-white/95">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/20 text-accent-300">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {u}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref(site.phone)}
                className="shine inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent-500 px-8 text-base font-bold text-brand-950 shadow-[var(--shadow-glow)] transition-all hover:bg-accent-300 active:scale-[.97]"
              >
                <IconPhone className="h-5 w-5" />
                Gọi {displayPhone(site.phone)}
              </a>
              <a
                href="#dat-lich"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
              >
                Đặt lịch online
                <IconArrow className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-6 text-[13.5px] text-brand-200/80">
              Hoạt động {site.hours.sentence} · Miễn phí kiểm tra trong nội thành
            </p>
          </div>

          {/* ---------- Cot phai: form dat lich ---------- */}
          <div id="dat-lich" className="lg:sticky lg:top-24">
            <BookingForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

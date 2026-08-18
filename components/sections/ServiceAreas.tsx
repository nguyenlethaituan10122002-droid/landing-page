import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconMapPin, IconClock } from '@/components/icons/Icons'
import { areas } from '@/content/areas'
import { img } from '@/lib/images'

/**
 * Khoi SEO dia phuong quan trong nhat — moi ten quan la mot cum tu khoa
 * va dong thoi la mot muc areaServed trong JSON-LD.
 */
export function ServiceAreas() {
  const photo = img('hero-portrait')

  return (
    <section id="khu-vuc" aria-labelledby="khu-vuc-title" className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
          <div>
            <SectionHeading
              id="khu-vuc-title"
              align="left"
              eyebrow="Khu vực phục vụ"
              title="Có mặt khắp TP.HCM & vùng lân cận"
              desc="Đội kỹ thuật được phân bổ theo từng cụm quận, giúp tối ưu thời gian di chuyển — trung bình chỉ 20–30 phút tuỳ vị trí và tình hình giao thông."
            />

            <Reveal delay={1}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <li
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3.5 py-2 text-[13.5px] font-semibold text-brand-800 transition-colors hover:border-brand-400 hover:bg-brand-100"
                  >
                    <IconMapPin className="h-3.5 w-3.5 text-brand-500" />
                    {a}
                  </li>
                ))}
              </ul>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink-2 shadow-[var(--shadow-soft)]">
                <IconClock className="h-4 w-4 text-brand-600" />
                Nhận lịch 8:00 – 21:00 tất cả các ngày, kể cả lễ
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="reveal-right hidden lg:block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="420px"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[15px] font-extrabold">Thợ có mặt sau 30 phút</p>
                <p className="mt-1 text-[13px] text-brand-200">Điều phối kỹ thuật viên gần bạn nhất</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

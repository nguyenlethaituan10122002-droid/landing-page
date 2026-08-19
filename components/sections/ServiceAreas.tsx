import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconMapPin, IconClock } from '@/components/icons/Icons'
import { areas } from '@/content/areas'
import { branches, branchCount } from '@/content/branches'
import { site, fullAddress } from '@/content/site'
import { img } from '@/lib/images'

/**
 * Khoi SEO dia phuong quan trong nhat.
 * Hai lop bo tro nhau:
 *  - Danh sach DIEM HOAT DONG: moi dia chi la mot node LocalBusiness rieng
 *    trong JSON-LD (xem lib/schema.ts), co branchOf tro ve tru so.
 *  - Danh sach QUAN NHAN SUA: rong hon, vao areaServed — phu ca nhung quan
 *    khong co diem nhung van nhan lich.
 */
export function ServiceAreas() {
  const photo = img('hero-portrait')

  return (
    <section id="khu-vuc" aria-labelledby="khu-vuc-title" className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <SectionHeading
              id="khu-vuc-title"
              align="left"
              eyebrow="Khu vực phục vụ"
              title="Có mặt khắp TP.HCM & vùng lân cận"
              desc={`${branchCount} điểm hoạt động trải khắp thành phố, đội kỹ thuật phân bổ theo từng cụm quận để rút ngắn thời gian di chuyển — trung bình 20–30 phút là có thợ tới nơi.`}
            />

            <Reveal delay={1}>
              {/* Tru so tach rieng len dau vi day la dia chi dang ky kinh doanh */}
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-brand-300 bg-white p-4 shadow-[var(--shadow-soft)]">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p className="text-[14px] leading-relaxed text-ink-2">
                  <span className="font-extrabold text-brand-900">Trụ sở chính:</span> {fullAddress}
                </p>
              </div>

              <p className="mt-7 text-[12.5px] font-bold tracking-wider text-muted uppercase">
                Các điểm hoạt động
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {branches.map((b) => (
                  <li
                    key={`${b.district}-${b.street}`}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 transition-colors hover:border-brand-400"
                  >
                    <IconMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                    <span className="min-w-0 text-[13.5px] leading-snug">
                      <span className="block font-semibold text-brand-900">{b.street}</span>
                      <span className="block text-[12.5px] text-muted">{b.district}, TP.HCM</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[12.5px] font-bold tracking-wider text-muted uppercase">
                Nhận sửa tại các quận
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
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

              <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink-2 shadow-[var(--shadow-soft)]">
                <IconClock className="h-4 w-4 text-brand-600" />
                Nhận lịch {site.hours.sentence}, kể cả lễ
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="reveal-right hidden lg:block lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="380px"
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

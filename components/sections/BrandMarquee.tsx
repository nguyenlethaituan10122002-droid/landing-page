import { Container } from '@/components/ui/Container'
import { brands } from '@/content/brands'

/**
 * Dai hang nhan sua — chay ngang bang CSS thuan.
 * Dung CHU thay vi logo hang de tranh rui ro nhan hieu.
 */
export function BrandMarquee() {
  const loop = [...brands, ...brands]

  return (
    <section aria-label="Các thương hiệu nhận sửa chữa" className="border-y border-line bg-brand-50 py-9">
      <Container>
        <p className="text-center text-[13px] font-bold tracking-wider text-muted uppercase">
          Nhận sửa mọi thương hiệu
        </p>
      </Container>

      <div
        className="marquee-wrap relative mt-5 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <ul className="marquee-track items-center gap-3">
          {loop.map((b, i) => (
            <li
              key={`${b}-${i}`}
              aria-hidden={i >= brands.length}
              className="rounded-full border border-brand-200/70 bg-white px-6 py-2.5 text-[15px] font-bold whitespace-nowrap text-brand-700/85"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

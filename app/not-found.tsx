import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { IconPhone, IconArrow } from '@/components/icons/Icons'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-950 py-20">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <Container className="relative text-center">
        <p className="text-[64px] leading-none font-extrabold text-accent-500 sm:text-[88px]">404</p>
        <h1 className="mt-4 text-[26px] font-extrabold text-white sm:text-[32px]">
          Không tìm thấy trang này
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-brand-200">
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Bạn quay về trang chủ hoặc gọi trực tiếp hotline nhé.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-brand-950 transition-colors hover:bg-accent-300"
          >
            Về trang chủ
            <IconArrow className="h-4 w-4" />
          </Link>
          <a
            href={telHref(site.phone)}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
          >
            <IconPhone className="h-4 w-4" />
            Gọi {displayPhone(site.phone)}
          </a>
        </div>
      </Container>
    </main>
  )
}

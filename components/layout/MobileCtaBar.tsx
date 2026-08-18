'use client'
import { IconPhone, IconChat } from '@/components/icons/Icons'
import { site } from '@/content/site'
import { displayPhone, telHref, zaloHref } from '@/lib/format'

/** Thanh hanh dong co dinh o day man hinh — chi hien tren mobile/tablet. */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-800/40 bg-brand-950/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2.5 p-2.5">
        <a
          href={telHref(site.phone)}
          className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-accent-500 font-bold text-brand-950 active:scale-[.97] transition-transform"
        >
          <IconPhone className="h-[18px] w-[18px]" />
          <span className="text-[15px]">Gọi {displayPhone(site.phone)}</span>
        </a>
        <a
          href={zaloHref(site.zalo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-brand-400/40 bg-white/5 font-bold text-white active:scale-[.97] transition-transform"
        >
          <IconChat className="h-[18px] w-[18px]" />
          <span className="text-[15px]">Chat Zalo</span>
        </a>
      </div>
    </div>
  )
}

import Image from 'next/image'
import { site } from '@/content/site'

type Props = {
  tone?: 'dark' | 'light'
  /** Header giau dong mo ta duoi 400px de chua cho nut goi; footer luon hien. */
  taglineFrom?: 'xs' | 'always'
  className?: string
}

export function Logo({ tone = 'dark', taglineFrom = 'xs', className = '' }: Props) {
  const light = tone === 'light'
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <Image
        src="/images/logo.png"
        alt={`Logo ${site.name}`}
        width={48}
        height={48}
        className="h-10 w-10 shrink-0 rounded-full ring-1 ring-black/5 sm:h-11 sm:w-11"
        priority
      />
      {/* min-w-0 cho phep chu bi cat thay vi day tran ra ngoai tren may hep */}
      <span className="min-w-0 leading-tight">
        <span className={`block truncate text-[14px] font-extrabold tracking-tight sm:text-base ${light ? 'text-white' : 'text-brand-900'}`}>
          {site.name}
        </span>
        <span
          className={`truncate text-[11px] font-medium sm:text-xs ${
            taglineFrom === 'always' ? 'block' : 'hidden xs:block'
          } ${light ? 'text-brand-200' : 'text-muted'}`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  )
}

import { Reveal } from './Reveal'

/** Tieu de section dung chung — dam bao phan cap heading nhat quan toan trang. */
export function SectionHeading({
  eyebrow, title, desc, id, align = 'center', tone = 'light',
}: {
  eyebrow?: string
  title: string
  desc?: string
  id?: string
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold tracking-wide uppercase ${
            tone === 'dark' ? 'bg-white/10 text-accent-300' : 'bg-brand-100 text-brand-700'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={`mt-4 text-[26px] leading-[1.2] font-extrabold sm:text-[32px] lg:text-[38px] ${
          tone === 'dark' ? 'text-white' : 'text-brand-900'
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 text-[15px] leading-relaxed sm:text-[17px] ${
            tone === 'dark' ? 'text-brand-200' : 'text-ink-2'
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  )
}

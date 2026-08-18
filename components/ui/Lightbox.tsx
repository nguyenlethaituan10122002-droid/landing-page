'use client'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import type { ManagedImage } from '@/lib/images'

/** Hop xem anh phong to. Dong bang phim Esc, bam nen, hoac nut X. Chuyen anh bang phim mui ten. */
export function Lightbox({
  photos, index, onClose, onNav,
}: {
  photos: readonly ManagedImage[]
  index: number | null
  onClose: () => void
  onNav: (next: number) => void
}) {
  const open = index !== null

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open || index === null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav((index + 1) % photos.length)
      if (e.key === 'ArrowLeft') onNav((index - 1 + photos.length) % photos.length)
    },
    [open, index, photos.length, onClose, onNav],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev
    }
  }, [open, handleKey])

  if (index === null) return null
  const photo = photos[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-950/94 p-4 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {(['prev', 'next'] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNav(dir === 'next' ? (index + 1) % photos.length : (index - 1 + photos.length) % photos.length)
          }}
          aria-label={dir === 'next' ? 'Ảnh kế tiếp' : 'Ảnh trước'}
          className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:grid ${
            dir === 'next' ? 'right-5' : 'left-5'
          }`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={dir === 'next' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} />
          </svg>
        </button>
      ))}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="lightbox-in flex max-h-full w-full max-w-3xl flex-col items-center"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          sizes="(max-width:768px) 92vw, 700px"
          className="max-h-[74vh] w-auto rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 max-w-xl text-center text-[13.5px] leading-relaxed text-brand-200">
          {photo.alt}
          <span className="mt-1.5 block text-[12px] text-brand-200/50">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

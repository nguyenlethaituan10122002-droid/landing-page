'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Bao boc phan tu de hien dan khi cuon toi.
 * Dung IntersectionObserver, tu ngat sau lan dau -> khong ton CPU khi cuon.
 */
export function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: React.ReactNode
  /** Bac tre xuat hien (0 = khong tre). Dung cho hieu ung so le trong luoi. */
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const d = delay ? ` reveal-d${delay}` : ''
  return (
    // @ts-expect-error - ref type khac nhau giua cac the
    <Tag ref={ref} className={`reveal${d}${shown ? ' is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

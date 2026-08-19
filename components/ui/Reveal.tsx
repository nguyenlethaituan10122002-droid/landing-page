'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Bao boc phan tu de hien dan khi cuon toi.
 *
 * Toan trang dung CHUNG MOT IntersectionObserver thay vi moi khoi mot cai.
 * Trang co ~50 khoi Reveal, neu moi khoi tu tao observer rieng thi trinh duyet
 * phai dung 50 bo quan sat -> ton thoi gian CPU luc khoi tao (chi so TBT).
 */

type CanBao = (hien: boolean) => void

let boQuanSat: IntersectionObserver | null = null
const danhSach = new WeakMap<Element, CanBao>()

function layBoQuanSat(): IntersectionObserver {
  if (boQuanSat) return boQuanSat
  boQuanSat = new IntersectionObserver(
    (cacMuc) => {
      for (const muc of cacMuc) {
        if (!muc.isIntersecting) continue
        danhSach.get(muc.target)?.(true)
        danhSach.delete(muc.target)
        boQuanSat!.unobserve(muc.target) // hien roi thi thoi khong theo doi nua
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return boQuanSat
}

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
    const io = layBoQuanSat()
    danhSach.set(el, setShown)
    io.observe(el)
    return () => {
      danhSach.delete(el)
      io.unobserve(el)
    }
  }, [])

  const d = delay ? ` reveal-d${delay}` : ''
  return (
    // @ts-expect-error - kieu ref khac nhau giua cac the
    <Tag ref={ref} className={`reveal${d}${shown ? ' is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

'use client'
import { useEffect, useRef } from 'react'

/**
 * Thanh tien trinh doc trang o mep tren.
 * Ghi thang vao style qua ref + requestAnimationFrame -> khong tao lai render React,
 * nen khong anh huong chi so INP.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0
      if (bar.current) bar.current.style.transform = `scaleX(${pct / 100})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-accent-500 to-accent-300"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

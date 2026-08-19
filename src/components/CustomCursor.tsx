import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', handleMove)

    const enter = () => {
      const el = ringRef.current
      if (!el) return
      el.style.width = '54px'
      el.style.height = '54px'
      el.style.borderColor = '#2FAE66'
      el.style.backgroundColor = 'rgba(11,11,11,0.06)'
    }
    const leave = () => {
      const el = ringRef.current
      if (!el) return
      el.style.width = '34px'
      el.style.height = '34px'
      el.style.borderColor = '#0B0B0B'
      el.style.backgroundColor = 'transparent'
    }

    const interactive = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    )
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    let raf: number
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`
        ringRef.current.style.top = `${ring.y}px`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-ink rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-[34px] h-[34px] border border-ink rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200"
      />
    </>
  )
}

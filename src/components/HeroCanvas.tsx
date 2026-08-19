import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.parentElement
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dots: { x: number; y: number }[] = []
    const mouse = { x: -9999, y: -9999 }

    const SPACING = 34
    const RADIUS = 1.4
    const REACT_RADIUS = 130

    const resize = () => {
      width = canvas.width = hero.offsetWidth
      height = canvas.height = hero.offsetHeight
      dots = []
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          dots.push({ x, y })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const d of dots) {
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y)
        const proximity = Math.max(0, 1 - dist / REACT_RADIUS)
        const r = RADIUS + proximity * 2.2
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fillStyle =
          proximity > 0
            ? `rgba(47, 174, 102, ${0.15 + proximity * 0.55})`
            : 'rgba(11, 11, 11, 0.10)'
        ctx.fill()
      }
    }

    resize()
    draw()

    let raf: number
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    const handleResize = () => {
      resize()
      if (reduced) draw()
    }
    const handleMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const handleLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', handleResize)

    if (!reduced) {
      raf = requestAnimationFrame(loop)
      hero.addEventListener('mousemove', handleMove)
      hero.addEventListener('mouseleave', handleLeave)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      hero.removeEventListener('mousemove', handleMove)
      hero.removeEventListener('mouseleave', handleLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-[0.55] pointer-events-none"
      aria-hidden="true"
    />
  )
}

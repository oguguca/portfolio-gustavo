import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(GSAPSplitText, ScrollTrigger)

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div'
  onLetterAnimationComplete?: () => void
}

/**
 * SplitText — matches the public API of reactbits.dev's SplitText
 * (https://reactbits.dev/text-animations/split-text): GSAP's SplitText
 * plugin for the text-splitting, ScrollTrigger for the viewport-based
 * reveal. Both are free as of GSAP 3.13.
 */
export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !text) return

    // Parse a CSS-style margin ("-100px", "10%") into a ScrollTrigger start offset.
    const startPct = (1 - threshold) * 100
    const m = /^(-?\d+(?:\.\d+)?)(px|%)?$/.exec(rootMargin)
    const marginValue = m ? parseFloat(m[1]) : 0
    const marginUnit = m?.[2] ?? 'px'
    const sign = marginValue < 0 ? '-=' : '+='
    const start = `top ${startPct}%${sign}${Math.abs(marginValue)}${marginUnit}`

    const types = splitType.split(',').map((s) => s.trim())
    const splitter = new GSAPSplitText(el, {
      type: splitType,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    })

    const targets = types.includes('chars') && splitter.chars.length
      ? splitter.chars
      : types.includes('words') && splitter.words.length
      ? splitter.words
      : splitter.lines

    targets.forEach((t) => {
      ;(t as HTMLElement).style.willChange = 'transform, opacity'
    })

    const tween = gsap.fromTo(targets, { ...from }, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      onComplete: onLetterAnimationComplete,
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      splitter.revert()
    }
  }, [text, delay, duration, ease, splitType, threshold, rootMargin, onLetterAnimationComplete])

  const Tag = tag as keyof JSX.IntrinsicElements

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ overflow: 'hidden', display: 'inline-block' }}
    >
      {text}
    </Tag>
  )
}

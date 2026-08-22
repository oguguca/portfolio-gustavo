import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  triggerRef?: RefObject<HTMLElement | null>
  containerClassName?: string
  textClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  triggerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top top',
  scrollEnd = 'bottom bottom',
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''

    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }, [children])

  useLayoutEffect(() => {
    const el = containerRef.current

    if (!el) return

    const triggerElement = triggerRef?.current ?? el

    const scroller =
      scrollContainerRef?.current ?? window

    const charElements = el.querySelectorAll<HTMLElement>('.char')

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      gsap.set(charElements, {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
      })

      return
    }

    const ctx = gsap.context(() => {
      /*
        Estado inicial EXATAMENTE no estilo Scroll Float:
        - vem de baixo
        - esticada verticalmente
        - comprimida horizontalmente
      */
      gsap.set(charElements, {
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
        willChange: 'opacity, transform',
      })

      gsap.to(charElements, {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        duration: animationDuration,
        ease,
        stagger,

        scrollTrigger: {
          trigger: triggerElement,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }, el)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [
    scrollContainerRef,
    triggerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ])

  return (
    <h2
      ref={containerRef}
      className={`scroll-float ${containerClassName}`}
    >
      <span className={`scroll-float-text ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  )
}

export default ScrollFloat
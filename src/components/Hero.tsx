import { motion } from 'framer-motion'
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import HeroCanvas from './HeroCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TYPED_LINES = [
  'engenheiro de software',
  'java · node.js · react',
  'aberto a novas oportunidades',
]

function useTypewriter(active: boolean) {
  const [text, setText] = useState(TYPED_LINES[0])

  useEffect(() => {
    if (!active) {
      setText(TYPED_LINES[0])
      return
    }

    let lineIndex = 0
    let charIndex = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = TYPED_LINES[lineIndex]

      if (!deleting) {
        charIndex++
        setText(current.slice(0, charIndex))
        if (charIndex === current.length) {
          deleting = true
          timeout = setTimeout(tick, 1600)
          return
        }
        timeout = setTimeout(tick, 45)
      } else {
        charIndex--
        setText(current.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          lineIndex = (lineIndex + 1) % TYPED_LINES.length
          timeout = setTimeout(tick, 300)
          return
        }
        timeout = setTimeout(tick, 25)
      }
    }

    timeout = setTimeout(tick, 900)
    return () => clearTimeout(timeout)
  }, [active])

  return text
}

const wordVariants = {
  hidden: { y: '112%' },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 0.84, 0.44, 1] as const,
      delay: 0.05 + i * 0.07,
    },
  }),
}

export default function Hero() {
  const reduced = useReducedMotion()
  const typed = useTypewriter(!reduced)
  const words = ['Engenheiro', 'de', 'Software.']

  return (
    <section className="relative overflow-hidden max-w-wrap mx-auto px-8 pt-[88px] pb-16">
      <HeroCanvas />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-mono text-[13px] text-accent mb-7"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-accent animate-pulse2" />
          disponível para novos projetos
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-7 h-px bg-ink" />
          <span className="font-mono text-[13px] tracking-widest uppercase text-muted">
            Gustavo Parpinelli
          </span>
        </motion.div>

        <h1 className="text-[42px] md:text-[68px] lg:text-[92px] font-extrabold tracking-[-0.035em] leading-[0.98] mb-8">
          {words.map((word, i) => (
            <span
              key={word}
              className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em] mr-[0.22em] last:mr-0"
            >
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`inline-block ${word === 'Software.' ? 'text-accent' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="text-lg text-[#2A2A2A] max-w-[44ch] mb-8"
        >
          Transformo problemas complexos em software confiável — do design da
          API à experiência final de quem usa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 font-mono text-sm text-muted bg-bgAlt border border-line rounded-full px-[18px] py-[9px] mb-10"
        >
          <span className="text-accent">&gt;</span>
          <span>{typed}</span>
          <span className="w-[7px] h-[14px] bg-ink animate-blink" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="flex gap-3.5 flex-wrap mb-14"
        >
          <MagneticButton href="#projetos" variant="solid">
            Ver projetos
          </MagneticButton>
          <MagneticButton href="#contato" variant="ghost">
            Entrar em contato
          </MagneticButton>
        </motion.div>

        <motion.a
          href="#sobre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="flex items-center gap-2.5 font-mono text-[11.5px] text-muted tracking-wider uppercase w-fit"
        >
          <span className="relative w-px h-[34px] bg-line overflow-hidden">
            <span className="absolute left-0 top-[-100%] w-full h-full bg-accent animate-rail" />
          </span>
          rolar
        </motion.a>
      </div>
    </section>
  )
}

function MagneticButton({
  href,
  variant,
  children,
}: {
  href: string
  variant: 'solid' | 'ghost'
  children: ReactNode
}) {
  const base =
    'relative overflow-hidden inline-block text-sm font-semibold px-[26px] py-[14px] border border-ink transition-all duration-150'
  const styles =
    variant === 'solid'
      ? 'bg-ink text-bg hover:bg-accent hover:border-accent'
      : 'bg-transparent text-ink hover:bg-ink hover:text-bg'

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'translate(0,0)'
  }

  return (
    <a
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles}`}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}

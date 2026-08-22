import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

import Reveal from './Reveal'

const SLOTS = [1, 2, 3, 4]

function TiltCard({ n }: { n: number }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useTransform(y, [0, 1], [8, -8])
  const rotateY = useTransform(x, [0, 1], [-8, 8])

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()

    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }

  const handleLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div
      data-cursor-hover
      className="group"
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundImage:
            'linear-gradient(135deg, rgba(200,117,255,0.055) 25%, transparent 25%, transparent 50%, rgba(200,117,255,0.055) 50%, rgba(200,117,255,0.055) 75%, transparent 75%, transparent)',
          backgroundSize: '18px 18px',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
        className="
          relative
          aspect-[16/11]
          overflow-hidden
          rounded-[20px]
          border
          border-dashed
          border-line/80
          bg-bgAlt/55
          backdrop-blur-md
          flex
          flex-col
          items-center
          justify-center
          gap-2.5
          transition-[border-color,box-shadow,background-color]
          duration-300
          group-hover:border-accent/70
          group-hover:bg-bgAlt/70
          group-hover:shadow-[0_0_45px_rgba(200,117,255,0.16)]
        "
      >
        {/* Glow do card */}
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-44
            w-44
            rounded-full
            bg-accent/20
            blur-[55px]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-16
            h-40
            w-40
            rounded-full
            bg-[#5227FF]/20
            blur-[60px]
            opacity-50
          "
        />

        <span className="relative z-10 font-mono text-3xl text-muted leading-none transition-colors group-hover:text-accent">
          +
        </span>

        <span className="relative z-10 text-[11.5px] text-muted font-mono">
          projeto-0{n}.slot
        </span>
      </motion.div>

      <div className="flex justify-between items-baseline mt-4 gap-3">
        <div className="text-xl font-bold text-ink">
          Em breve
        </div>

        <div className="text-[13px] text-muted text-right">
          Adicione título e descrição
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section
  id="projetos"
  className="min-h-[100svh] flex flex-col justify-center py-14 border-b border-line max-w-wrap mx-auto px-8"
>
      <Reveal className="flex items-start justify-between flex-wrap gap-6 mb-12">
        <h2 className="text-[38px] md:text-[60px] font-extrabold tracking-tight leading-[1.02] text-ink">
          Projetos em
          <br />
          destaque
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <div
            className="
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-line/80
              bg-bgAlt/70
              backdrop-blur-md
              pl-5
              pr-2.5
              py-2.5
              font-semibold
              text-[15px]
              text-ink
              transition-all
              duration-300
              hover:border-accent/60
              hover:shadow-[0_0_25px_rgba(200,117,255,0.12)]
            "
          >
            <span>Gustavo</span>

            <span className="bg-accent/15 border border-accent/20 text-accent w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs tracking-widest">
              •••
            </span>
          </div>

          <a
            href="https://github.com/oguguca"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-ink ml-auto md:ml-4 transition-colors hover:text-accent"
          >
            Ver no GitHub

            <span
              className="
                w-[30px]
                h-[30px]
                border
                border-line
                rounded-full
                flex
                items-center
                justify-center
                text-sm
                transition-all
                duration-300
                group-hover:border-accent
                group-hover:bg-accent
                group-hover:text-bg
                group-hover:rotate-45
                group-hover:shadow-[0_0_20px_rgba(200,117,255,0.25)]
              "
            >
              ↗
            </span>
          </a>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-7 gap-x-6">
        {SLOTS.map((n, i) => (
          <Reveal key={n} delay={i * 0.08}>
            <TiltCard n={n} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
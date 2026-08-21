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
    <div data-cursor-hover className="group" style={{ perspective: 800 }}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="aspect-[16/11] rounded-[20px] border border-dashed border-line bg-[repeating-linear-gradient(135deg,#F1F1EF_0px,#F1F1EF_2px,#FAFAFA_2px,#FAFAFA_14px)] flex flex-col items-center justify-center gap-2.5 overflow-hidden transition-colors duration-300 group-hover:border-ink"
      >
        <span className="font-mono text-3xl text-muted leading-none">+</span>
        <span className="text-[11.5px] text-muted font-mono">
          projeto-0{n}.slot
        </span>
      </motion.div>
      <div className="flex justify-between items-baseline mt-4 gap-3">
        <div className="text-xl font-bold">Em breve</div>
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
      className="py-20 border-b border-line max-w-wrap mx-auto px-8"
    >
      <Reveal className="flex items-start justify-between flex-wrap gap-6 mb-12">
        <h2 className="text-[38px] md:text-[60px] font-extrabold tracking-tight leading-[1.02]">
          Projetos em
          <br />
          destaque
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2.5 bg-ink text-bg rounded-full pl-5 pr-2.5 py-2.5 font-semibold text-[15px]">
            <span>Gustavo</span>
            <span className="bg-bg text-ink w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs tracking-widest">
              •••
            </span>
          </div>
          <a
            href="https://github.com/oguguca"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold ml-auto md:ml-4"
          >
            Ver no GitHub
            <span className="w-[30px] h-[30px] border border-ink rounded-full flex items-center justify-center text-sm transition-all group-hover:bg-ink group-hover:text-bg group-hover:rotate-45">
              ↗
            </span>
          </a>
        </div>
      </Reveal>

      {/* PLACEHOLDERS: quando tiver um projeto, troque a .project-thumb por
          uma <img src="..." alt="..." /> e edite título/descrição abaixo */}
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

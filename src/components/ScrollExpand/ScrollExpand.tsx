import {
  useRef,
  type ReactNode,
} from 'react'

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'

import './ScrollExpand.css'

type ScrollExpandProps = {
  children: ReactNode
  preview?: ReactNode
  className?: string
}

export default function ScrollExpand({
  children,
  preview,
  className = '',
}: ScrollExpandProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /*
    FRAME

    começa pequeno e arredondado
    termina ocupando toda a tela
  */
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.68],
    [
      'inset(22% 29% 22% 29% round 28px)',
      'inset(0% 0% 0% 0% round 0px)',
    ]
  )

  /*
    Pequeno zoom enquanto abre.
  */
  const scale = useTransform(
    scrollYProgress,
    [0, 0.68],
    [1.08, 1]
  )

  /*
    Preview "Habilidades" desaparece.
  */
  const previewOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58],
    [1, 1, 0]
  )

  const previewY = useTransform(
    scrollYProgress,
    [0.32, 0.58],
    [0, -35]
  )

  /*
    Conteúdo real aparece somente quando
    o frame já está praticamente aberto.
  */
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [0, 1]
  )

  const contentY = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [35, 0]
  )

  return (
    <div
      ref={sectionRef}
      className={`scroll-expand-root ${className}`}
    >
      <div className="scroll-expand-stage">
        <motion.div
          style={{
            clipPath,
          }}
          className="scroll-expand-frame"
        >
          {/* Fundo do frame */}
          <motion.div
            style={{ scale }}
            className="scroll-expand-background"
          />

          {/* Glow interno */}
          <div className="scroll-expand-glow scroll-expand-glow-one" />
          <div className="scroll-expand-glow scroll-expand-glow-two" />

          {/* Preview inicial */}
          <motion.div
            style={{
              opacity: previewOpacity,
              y: previewY,
            }}
            className="scroll-expand-preview"
          >
            {preview}
          </motion.div>

          {/* Habilidades completas */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
            }}
            className="scroll-expand-content"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
import { motion } from 'framer-motion'

import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="inicio"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        px-6
        md:px-10
        pt-[56px]
      "
    >
      {/* Glow sutil atrás do conteúdo */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{
          opacity: reduced ? 0.12 : [0.08, 0.16, 0.08],
          scale: reduced ? 1 : [1, 1.08, 1],
        }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[800px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-accent/10
          blur-[150px]
        "
      />

      {/* Conteúdo central */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh-56px)]
          w-full
          max-w-[1500px]
          items-center
          justify-center
        "
      >
        <div className="w-full text-center">

          {/* Nome */}
          <div className="overflow-hidden pb-[0.12em]">
            <motion.h1
              initial={
                reduced
                  ? false
                  : {
                      y: '110%',
                      opacity: 0,
                      filter: 'blur(12px)',
                    }
              }
              animate={{
                y: '0%',
                opacity: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                whitespace-nowrap

                text-[clamp(3.2rem,8vw,8.7rem)]

                font-extrabold

                leading-[0.92]

                tracking-[-0.065em]

                text-ink
              "
            >
              Gustavo Parpinelli
            </motion.h1>
          </div>

          {/* Linha decorativa */}
          <motion.div
            initial={
              reduced
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.9,
              delay: reduced ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mx-auto
              mt-7
              h-px
              w-[90px]
              origin-center
              bg-accent
              md:mt-9
              md:w-[130px]
            "
          />

          {/* Cargo */}
          <motion.div
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    y: 24,
                    filter: 'blur(8px)',
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.85,
              delay: reduced ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-[0.28em]

              text-[clamp(1.25rem,2.4vw,2.3rem)]

              font-medium

              tracking-[-0.035em]
            "
          >
            <span className="text-muted">
              Engenheiro de
            </span>

            <span className="font-semibold text-accent">
              Software.
            </span>
          </motion.div>

          {/* detalhe inferior */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: reduced ? 0 : 0.9,
            }}
            className="
              mx-auto
              mt-10
              flex
              w-fit
              items-center
              gap-3
              font-mono
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-muted/60
            "
          >
            <span className="h-[4px] w-[4px] rounded-full bg-accent" />
            Software Engineer
            <span className="h-[4px] w-[4px] rounded-full bg-accent" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
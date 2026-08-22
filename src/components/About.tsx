import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

import type { MouseEvent } from 'react'

import Reveal from './Reveal'

const infoCards = [
  {
    number: '01',
    label: 'Formação',
    value: 'Análise e Desenvolvimento de Sistemas',
    detail: 'Graduação',
  },
  {
    number: '02',
    label: 'Especialização',
    value: 'Infraestrutura de TI',
    detail: 'Pós-graduação',
  },
  {
    number: '03',
    label: 'Stack principal',
    value: 'Java · Node.js · React',
    detail: 'Backend & Frontend',
  },
  {
    number: '04',
    label: 'Foco',
    value: 'Desenvolvimento de Software',
    detail: 'Sistemas & aplicações web',
  },
]

function ProfileCard() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 22,
  })

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 22,
  })

  const glowX = useTransform(mouseX, value => `${value}%`)
  const glowY = useTransform(mouseY, value => `${value}%`)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const percentX = (x / rect.width) * 100
    const percentY = (y / rect.height) * 100

    mouseX.set(percentX)
    mouseY.set(percentY)

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateY.set(((x - centerX) / centerX) * 5)
    rotateX.set(-((y - centerY) / centerY) * 5)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)

    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <div
      className="relative w-full max-w-[340px] mx-auto"
      style={{ perspective: 1000 }}
    >
      {/* glow externo */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-10
          rounded-full
          bg-accent/10
          blur-[90px]
        "
      />

      <motion.div
        data-cursor-hover
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="
          group
          relative
          aspect-[4/5]
          overflow-hidden
          rounded-[28px]
          border
          border-line/80
          bg-bgAlt/45
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,0.28)]
        "
      >
        {/* Spotlight seguindo mouse */}
        <motion.div
          aria-hidden="true"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(200,117,255,0.28), transparent 38%)`
            ),
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* iluminação base */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-accent/15
            blur-[80px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-28
            -left-20
            h-72
            w-72
            rounded-full
            bg-[#5227FF]/15
            blur-[100px]
          "
        />

        {/* área da foto */}
        <div
          className="
            absolute
            inset-[12px]
            overflow-hidden
            rounded-[20px]
            border
            border-line/70
          "
        >
          {/*
            QUANDO TIVER SUA FOTO:

            substitua todo o conteúdo desta div por:

            <img
              src="/gustavo.jpg"
              alt="Gustavo Parpinelli"
              className="w-full h-full object-cover"
            />
          */}

          <div
            className="
              relative
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              overflow-hidden
              bg-[#10091b]/70
            "
          >
            {/* grade decorativa */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.08]
                bg-[linear-gradient(rgba(200,117,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(200,117,255,0.5)_1px,transparent_1px)]
                bg-[size:36px_36px]
              "
            />

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                absolute
                h-44
                w-44
                rounded-full
                bg-accent/15
                blur-[55px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border
                border-dashed
                border-accent/50
                bg-bg/5
                backdrop-blur-md
              "
            >
              <span className="font-mono text-3xl text-accent">
                +
              </span>
            </div>

            <span
              className="
                relative
                z-10
                mt-5
                font-mono
                text-[11px]
                uppercase
                tracking-[0.16em]
                text-muted
              "
            >
              adicionar foto
            </span>
          </div>
        </div>

        {/* badge superior */}
        <div
          className="
            absolute
            left-6
            top-6
            z-30
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/25
            px-3
            py-2
            backdrop-blur-md
          "
          style={{
            transform: 'translateZ(35px)',
          }}
        >
          <span className="h-2 w-2 rounded-full bg-accent" />

          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.14em]
              text-white/80
            "
          >
            disponível
          </span>
        </div>

        {/* identificação inferior */}
        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            z-30
          "
          style={{
            transform: 'translateZ(45px)',
          }}
        >
          <div
            className="
              rounded-[18px]
              border
              border-white/10
              bg-black/30
              p-4
              backdrop-blur-xl
            "
          >
            <div className="text-[17px] font-bold text-white">
              Gustavo Parpinelli
            </div>

            <div
              className="
                mt-1
                font-mono
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-white/55
              "
            >
              Software Engineer
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="sobre"
      className="
        relative
        min-h-[100svh]
        border-b
        border-line
        px-6
        py-16
        md:px-8
        md:py-20
      "
    >
      <div className="max-w-wrap mx-auto">
        {/* Cabeçalho */}
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span
              className="
                mb-3
                block
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-accent
              "
            >
              // conheça um pouco mais
            </span>

            <h2
              className="
                text-[34px]
                font-extrabold
                tracking-[-0.04em]
                text-ink
                md:text-[46px]
              "
            >
              Sobre mim
            </h2>
          </div>

          <span className="font-mono text-[11px] text-muted">
            01 / sobre
          </span>
        </Reveal>

        {/* Conteúdo principal */}
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[340px_1fr]
            lg:gap-16
          "
        >
          {/* Card da foto */}
          <Reveal>
            <ProfileCard />
          </Reveal>

          {/* Conteúdo textual */}
          <div>
            <Reveal>
              <span
                className="
                  mb-5
                  block
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-accent
                "
              >
                minha trajetória
              </span>

              <h3
                className="
                  max-w-[780px]
                  text-[28px]
                  font-extrabold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-ink
                  md:text-[38px]
                  lg:text-[44px]
                "
              >
                Construo software pensando em
                <span className="text-accent">
                  {' '}
                  clareza
                </span>
                , manutenção e na experiência de quem usa.
              </h3>
            </Reveal>

            <Reveal delay={0.06}>
  <div
    className="
      mt-7
      grid
      w-full
      gap-3
      text-[15px]
      leading-[1.75]
      text-muted
      md:grid-cols-2
    "
  >
                <p>
                  Sou formado em Análise e Desenvolvimento de Sistemas
                  e venho construindo uma base sólida em desenvolvimento
                  de software, com atenção especial à organização,
                  qualidade e evolução do código.
                </p>

                <p>
                  Trabalho e estudo tecnologias como Java, Node.js e
                  React, buscando compreender toda a jornada de uma
                  aplicação — da lógica e das APIs até a experiência
                  final na interface.
                </p>
              </div>
            </Reveal>

            {/* Cards de informações */}
            <div
              className="
                mt-9
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              {infoCards.map((item, index) => (
                <Reveal
                  key={item.label}
                  delay={0.1 + index * 0.05}
                >
                  <motion.div
                    data-cursor-hover
                    whileHover={{
                      y: -4,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-[18px]
                      border
                      border-line/80
                      bg-bgAlt/35
                      p-5
                      backdrop-blur-md
                      transition-[border-color,box-shadow,background-color]
                      duration-300
                      hover:border-accent/45
                      hover:bg-bgAlt/50
                      hover:shadow-[0_15px_45px_rgba(200,117,255,0.08)]
                    "
                  >
                    {/* glow hover */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-12
                        -top-12
                        h-28
                        w-28
                        rounded-full
                        bg-accent/10
                        blur-[45px]
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div>
                        <span
                          className="
                            mb-3
                            block
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.14em]
                            text-accent
                          "
                        >
                          {item.label}
                        </span>

                        <div
                          className="
                            max-w-[28ch]
                            text-[15px]
                            font-semibold
                            leading-snug
                            text-ink
                          "
                        >
                          {item.value}
                        </div>

                        <div
                          className="
                            mt-2
                            text-[11px]
                            text-muted
                          "
                        >
                          {item.detail}
                        </div>
                      </div>

                      <span
                        className="
                          font-mono
                          text-[10px]
                          text-muted/40
                          transition-colors
                          group-hover:text-accent
                        "
                      >
                        {item.number}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Rodapé informativo */}
            <Reveal delay={0.32}>
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-x-6
                  gap-y-3
                  border-t
                  border-line/70
                  pt-6
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-accent" />

                  <span className="font-mono text-[11px] text-muted">
                    disponível para oportunidades
                  </span>
                </div>

                <span className="hidden h-3 w-px bg-line sm:block" />

                <span className="font-mono text-[11px] text-muted">
                  Java · Node.js · React
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
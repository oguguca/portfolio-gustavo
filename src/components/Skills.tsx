import type { IconType } from 'react-icons'

import {
  SiOpenjdk,
  SiNodedotjs,
  SiSpring,
  SiMysql,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVite,
} from 'react-icons/si'

import { motion } from 'framer-motion'

import ScrollExpand from './ScrollExpand/ScrollExpand'

type Skill = {
  name: string
  description: string
  icon: IconType
}

type SkillGroup = {
  number: string
  title: string
  subtitle: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    number: '01',
    title: 'Backend',
    subtitle: 'Lógica, APIs e regras de negócio',
    skills: [
      {
        name: 'Java',
        description: 'Linguagem principal',
        icon: SiOpenjdk,
      },
      {
        name: 'Node.js',
        description: 'Backend JavaScript',
        icon: SiNodedotjs,
      },
      {
        name: 'Spring',
        description: 'Aplicações com Java',
        icon: SiSpring,
      },
      {
        name: 'MySQL',
        description: 'Banco de dados',
        icon: SiMysql,
      },
    ],
  },

  {
    number: '02',
    title: 'Frontend',
    subtitle: 'Interfaces modernas e responsivas',
    skills: [
      {
        name: 'React',
        description: 'Interfaces e componentes',
        icon: SiReact,
      },
      {
        name: 'TypeScript',
        description: 'JavaScript tipado',
        icon: SiTypescript,
      },
      {
        name: 'JavaScript',
        description: 'Desenvolvimento web',
        icon: SiJavascript,
      },
      {
        name: 'Tailwind CSS',
        description: 'Estilização de interfaces',
        icon: SiTailwindcss,
      },
    ],
  },

  {
    number: '03',
    title: 'Ferramentas',
    subtitle: 'Workflow e desenvolvimento',
    skills: [
      {
        name: 'Git',
        description: 'Controle de versão',
        icon: SiGit,
      },
      {
        name: 'GitHub',
        description: 'Código e colaboração',
        icon: SiGithub,
      },
      {
        name: 'Vite',
        description: 'Build e ambiente web',
        icon: SiVite,
      },
    ],
  },
]

function SkillItem({ skill }: { skill: Skill }) {
  const Icon = skill.icon

  return (
    <motion.div
      data-cursor-hover
      whileHover={{ x: 4 }}
      transition={{
        duration: 0.2,
      }}
      className="
        group
        relative
        flex
        items-center
        gap-4
        overflow-hidden
        rounded-[14px]
        border
        border-line/70
        bg-black/10
        px-4
        py-3.5
        backdrop-blur-sm
        transition-all
        duration-300

        hover:border-accent/50
        hover:bg-accent/[0.04]
        hover:shadow-[0_10px_35px_rgba(200,117,255,0.08)]
      "
    >
      {/* glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-10
          top-1/2
          h-20
          w-20
          -translate-y-1/2
          rounded-full
          bg-accent/20
          blur-[35px]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* ícone */}
      <div
        className="
          relative
          z-10
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-[10px]
          border
          border-line/80
          bg-bgAlt/30

          text-[20px]
          text-muted

          transition-all
          duration-300

          group-hover:border-accent/50
          group-hover:text-accent
          group-hover:shadow-[0_0_25px_rgba(200,117,255,0.15)]
        "
      >
        <Icon />
      </div>

      {/* textos */}
      <div className="relative z-10 min-w-0">
        <div
          className="
            text-[14px]
            font-semibold
            text-ink
            transition-colors
            group-hover:text-accent
          "
        >
          {skill.name}
        </div>

        <div className="mt-0.5 text-[11px] text-muted">
          {skill.description}
        </div>
      </div>

      <span
        className="
          relative
          z-10
          ml-auto
          font-mono
          text-[11px]
          text-muted/25

          transition-all
          duration-300

          group-hover:translate-x-1
          group-hover:text-accent
        "
      >
        ↗
      </span>
    </motion.div>
  )
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <motion.div
      data-cursor-hover
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group/card
        relative
        h-full
        overflow-hidden

        rounded-[24px]

        border
        border-line/80

        bg-bgAlt/20

        p-5

        backdrop-blur-xl

        transition-[border-color,background-color,box-shadow]
        duration-300

        hover:border-accent/35
        hover:bg-bgAlt/30
        hover:shadow-[0_25px_80px_rgba(0,0,0,0.24)]
      "
    >
      {/* brilho */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-accent/10
          blur-[75px]

          opacity-30
          transition-opacity
          duration-300

          group-hover/card:opacity-80
        "
      />

      {/* título da categoria */}
      <div
        className="
          relative
          z-10

          mb-4

          flex
          items-start
          justify-between
          gap-4

          border-b
          border-line/70

          pb-4
        "
      >
        <div>
          <span
            className="
              mb-2
              block

              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-accent
            "
          >
            // {group.title}
          </span>

          <h3
            className="
              text-[21px]
              font-bold
              tracking-[-0.035em]
              text-ink
            "
          >
            {group.title}
          </h3>

          <p className="mt-1 text-[11px] text-muted">
            {group.subtitle}
          </p>
        </div>

        <span className="font-mono text-[9px] text-muted/40">
          {group.number}
        </span>
      </div>

      {/* tecnologias */}
      <div className="relative z-10 flex flex-col gap-2.5">
        {group.skills.map(skill => (
          <SkillItem
            key={skill.name}
            skill={skill}
          />
        ))}
      </div>
    </motion.div>
  )
}

function SkillsPreview() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      "
    >
      <span
        className="
          mb-4
          font-mono
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-accent
        "
      >
        02 / stack
      </span>

      <h2
        className="
          text-[clamp(2.7rem,6vw,5.5rem)]
          font-extrabold
          tracking-[-0.055em]
          leading-none
          text-ink
        "
      >
        Habilidades
      </h2>

      <p
        className="
          mt-5
          font-mono
          text-[11px]
          uppercase
          tracking-[0.12em]
          text-muted
        "
      >
        Backend · Frontend · Ferramentas
      </p>

      {/* mini indicadores */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {['Java', 'React', 'Node.js', 'TypeScript'].map(item => (
          <span
            key={item}
            className="
              rounded-full
              border
              border-line/70
              bg-bgAlt/30
              px-3
              py-1.5

              font-mono
              text-[9px]
              text-muted

              backdrop-blur-md
            "
          >
            {item}
          </span>
        ))}
      </div>

      <div
        className="
          mt-9
          flex
          items-center
          gap-3

          font-mono
          text-[9px]
          uppercase
          tracking-[0.16em]
          text-muted/50
        "
      >
        <span className="h-px w-8 bg-accent/60" />

        continue rolando

        <span className="h-px w-8 bg-accent/60" />
      </div>
    </div>
  )
}

function ExpandedSkills() {
  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center

        px-6
        pt-[78px]
        pb-8

        md:px-8
      "
    >
      <div className="mx-auto w-full max-w-wrap">
        {/* cabeçalho */}
        <div
          className="
            mb-7
            flex
            items-end
            justify-between
            gap-6
          "
        >
          <div>
            <span
              className="
                mb-2.5
                block
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-accent
              "
            >
              // tecnologias & ferramentas
            </span>

            <h2
              className="
                text-[32px]
                font-extrabold
                tracking-[-0.045em]
                text-ink

                md:text-[42px]
              "
            >
              Habilidades
            </h2>

            <p
              className="
                mt-2
                max-w-[560px]
                text-[12px]
                leading-relaxed
                text-muted
              "
            >
              Tecnologias que fazem parte da minha stack e do meu
              processo de desenvolvimento.
            </p>
          </div>

          <span className="font-mono text-[10px] text-muted">
            02 / stack
          </span>
        </div>

        {/* categorias */}
        <div
          className="
            grid
            grid-cols-1
            gap-4

            lg:grid-cols-3
          "
        >
          {skillGroups.map(group => (
            <SkillGroupCard
              key={group.title}
              group={group}
            />
          ))}
        </div>

        {/* rodapé */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-4

            border-t
            border-line/60

            pt-4
          "
        >
          <span className="font-mono text-[9px] text-muted/70">
            backend · frontend · ferramentas
          </span>

          <div
            className="
              flex
              items-center
              gap-2

              font-mono
              text-[9px]
              text-muted
            "
          >
            <span className="h-[5px] w-[5px] rounded-full bg-accent" />

            aprendizado contínuo
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="habilidades"
      className="
        relative
        border-b
        border-line
      "
    >
      <ScrollExpand preview={<SkillsPreview />}>
        <ExpandedSkills />
      </ScrollExpand>
    </section>
  )
}
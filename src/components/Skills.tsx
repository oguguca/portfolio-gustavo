import Reveal from './Reveal'

const skills = [
  {
    tag: '// backend',
    name: 'Java',
    desc: 'Linguagem principal de trabalho',
  },
  {
    tag: '// backend',
    name: 'Node.js',
    desc: 'APIs e serviços em JavaScript',
  },
  {
    tag: '// frontend',
    name: 'React',
    desc: 'Interfaces e aplicações web',
  },
]

export default function Skills() {
  return (
    <section
  id="habilidades"
  className="min-h-[100svh] flex flex-col justify-center py-16 border-b border-line max-w-wrap mx-auto px-8"
>
      <Reveal className="flex items-baseline justify-between flex-wrap gap-4 mb-11">
        <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight text-ink">
          Habilidades
        </h2>

        <span className="font-mono text-[13px] text-muted">
          02 / stack
        </span>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <div
              data-cursor-hover
              className="
                group
                relative
                overflow-hidden
                h-full
                min-h-[130px]
                rounded-sm
                border
                border-line/80
                bg-bgAlt/70
                p-5
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-accent/70
                hover:shadow-[0_0_35px_rgba(200,117,255,0.16)]
              "
            >
              {/* Glow interno no hover */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-accent/20
                  blur-[45px]
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                <span className="block font-mono text-[11px] text-accent mb-2.5">
                  {s.tag}
                </span>

                <div className="text-[17px] font-bold text-ink mb-1.5">
                  {s.name}
                </div>

                <div className="text-[13px] leading-relaxed text-muted">
                  {s.desc}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* PLACEHOLDERS */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Reveal key={`ph-${i}`} delay={0.18 + i * 0.04}>
            <div
              className="
                group
                relative
                min-h-[130px]
                h-full
                overflow-hidden
                rounded-sm
                border
                border-dashed
                border-line/80
                bg-bgAlt/30
                backdrop-blur-sm
                flex
                flex-col
                items-center
                justify-center
                text-center
                text-muted
                gap-1.5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-accent/70
                hover:text-accent
                hover:bg-bgAlt/50
                hover:shadow-[0_0_30px_rgba(200,117,255,0.12)]
              "
            >
              <span className="font-mono text-[22px] leading-none">
                +
              </span>

              <span className="font-mono text-xs">
                adicionar habilidade
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
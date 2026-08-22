import Reveal from './Reveal'

import ScrollStack, {
  ScrollStackItem,
} from './ScrollStack/ScrollStack'

const projects = [
  {
    number: '01',
    title: 'Projeto 01',
    description:
      'Seu primeiro projeto em destaque. Depois vamos substituir este conteúdo pelo projeto real.',
    stack: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    number: '02',
    title: 'Projeto 02',
    description:
      'Seu segundo projeto em destaque. Aqui poderá entrar uma imagem, descrição e tecnologias utilizadas.',
    stack: ['Java', 'Spring', 'API REST'],
  },
  {
    number: '03',
    title: 'Projeto 03',
    description:
      'Seu terceiro projeto em destaque. O card sobe e se empilha sobre os anteriores.',
    stack: ['Node.js', 'Express', 'JavaScript'],
  },
  {
    number: '04',
    title: 'Projeto 04',
    description:
      'Seu quarto projeto em destaque. Depois deste card, a página continua normalmente para Contato.',
    stack: ['React', 'Node.js', 'Git'],
  },
]

export default function Projects() {
  return (
    <section
      id="projetos"
      className="relative border-b border-line"
    >
      {/* Cabeçalho */}
      <div className="max-w-wrap mx-auto px-8 pt-20">
        <Reveal className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-accent mb-4">
              // trabalhos selecionados
            </span>

            <h2 className="text-[38px] md:text-[60px] font-extrabold tracking-tight leading-[1.02] text-ink">
              Projetos em
              <br />
              destaque
            </h2>
          </div>

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
              className="group inline-flex items-center gap-2.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
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
                  transition-all
                  duration-300
                  group-hover:border-accent
                  group-hover:bg-accent
                  group-hover:text-bg
                  group-hover:rotate-45
                "
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll Stack */}
      <div className="max-w-wrap mx-auto">
        <ScrollStack
          useWindowScroll
          className="!h-auto !overflow-visible"
          itemDistance={200}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.85}
          scaleDuration={0.5}
          rotationAmount={0}
          blurAmount={0}
        >
          {projects.map(project => (
            <ScrollStackItem
              key={project.number}
              itemClassName="
                !h-[68vh]
                !min-h-[500px]
                !max-h-[650px]
                !p-0
                !rounded-[28px]
                overflow-hidden
                border
                border-line/80
                bg-bgAlt/85
                backdrop-blur-xl
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >
              <div className="relative h-full grid md:grid-cols-[1.1fr_0.9fr] overflow-hidden">
                {/* Preview */}
                <div
                  className="
                    relative
                    overflow-hidden
                    border-b
                    md:border-b-0
                    md:border-r
                    border-line/70
                    bg-[#12091f]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-accent/20 blur-[100px]" />

                  <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#5227FF]/20 blur-[120px]" />

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-30
                      bg-[linear-gradient(135deg,rgba(200,117,255,0.08)_25%,transparent_25%,transparent_50%,rgba(200,117,255,0.08)_50%,rgba(200,117,255,0.08)_75%,transparent_75%,transparent)]
                      bg-[length:24px_24px]
                    "
                  />

                  <div className="relative z-10 text-center">
                    <span className="block font-mono text-accent text-sm mb-4">
                      projeto-{project.number}.preview
                    </span>

                    <div className="w-16 h-16 mx-auto rounded-full border border-dashed border-accent/50 flex items-center justify-center text-accent text-3xl">
                      +
                    </div>

                    <span className="block mt-4 font-mono text-xs text-muted">
                      adicione a imagem aqui
                    </span>
                  </div>
                </div>

                {/* Informações */}
                <div className="relative p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-10">
                      <span className="font-mono text-xs tracking-[0.18em] text-accent">
                        {project.number} / 04
                      </span>

                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        projeto
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-[42px] font-extrabold tracking-tight text-ink mb-5">
                      {project.title}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-muted max-w-[42ch]">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map(technology => (
                        <span
                          key={technology}
                          className="font-mono text-[11px] text-muted border border-line rounded-full px-3 py-1.5 bg-bg/30"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-5">
                      <a
                        href="#"
                        className="font-mono text-sm text-ink hover:text-accent transition-colors"
                      >
                        Ver projeto ↗
                      </a>

                      <a
                        href="https://github.com/oguguca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-muted hover:text-accent transition-colors"
                      >
                        Código ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
import Reveal from './Reveal'

const SLOTS = [1, 2, 3, 4]

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
            <div data-cursor-hover className="group">
              <div className="aspect-[16/11] rounded-[20px] border border-dashed border-line bg-[repeating-linear-gradient(135deg,#F1F1EF_0px,#F1F1EF_2px,#FAFAFA_2px,#FAFAFA_14px)] flex flex-col items-center justify-center gap-2.5 overflow-hidden transition-[border-color,transform] duration-300 group-hover:border-ink group-hover:-translate-y-1">
                <span className="font-mono text-3xl text-muted leading-none">
                  +
                </span>
                <span className="text-[11.5px] text-muted font-mono">
                  projeto-0{n}.slot
                </span>
              </div>
              <div className="flex justify-between items-baseline mt-4 gap-3">
                <div className="text-xl font-bold">Em breve</div>
                <div className="text-[13px] text-muted text-right">
                  Adicione título e descrição
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

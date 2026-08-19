import Reveal from './Reveal'

const skills = [
  { tag: '// backend', name: 'Java', desc: 'Linguagem principal de trabalho' },
  { tag: '// backend', name: 'Node.js', desc: 'APIs e serviços em JavaScript' },
  { tag: '// frontend', name: 'React', desc: 'Interfaces e aplicações web' },
]

export default function Skills() {
  return (
    <section
      id="habilidades"
      className="py-20 border-b border-line max-w-wrap mx-auto px-8"
    >
      <Reveal className="flex items-baseline justify-between flex-wrap gap-4 mb-11">
        <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">
          Habilidades
        </h2>
        <span className="font-mono text-[13px] text-muted">02 / stack</span>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <div
              data-cursor-hover
              className="bg-white border border-line rounded-sm p-5 h-full transition-[border-color,transform] hover:border-ink hover:-translate-y-0.5"
            >
              <span className="block font-mono text-[11px] text-accent mb-2.5">
                {s.tag}
              </span>
              <div className="text-[17px] font-bold mb-1.5">{s.name}</div>
              <div className="text-[13px] text-muted">{s.desc}</div>
            </div>
          </Reveal>
        ))}

        {/* PLACEHOLDERS: duplique um objeto do array `skills` acima em
            src/components/Skills.tsx para adicionar uma nova habilidade */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Reveal key={`ph-${i}`} delay={0.18 + i * 0.04}>
            <div className="border border-dashed border-line rounded-sm min-h-[130px] h-full flex flex-col items-center justify-center text-center text-muted gap-1.5 transition-colors hover:border-accent hover:text-accent">
              <span className="font-mono text-[22px] leading-none">+</span>
              <span className="font-mono text-xs">adicionar habilidade</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

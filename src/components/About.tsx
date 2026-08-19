import Reveal from './Reveal'

const stats = [
  { label: 'Cargo', value: 'Engenheiro de Software' },
  { label: 'Stack principal', value: 'Java · Node.js · React' },
  { label: 'Localização', value: '-- edite aqui --' },
  { label: 'Status', value: 'disponível' },
]

export default function About() {
  return (
    <section
      id="sobre"
      className="py-20 border-b border-line max-w-wrap mx-auto px-8"
    >
      <Reveal className="flex items-baseline justify-between flex-wrap gap-4 mb-11">
        <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">
          Sobre mim
        </h2>
        <span className="font-mono text-[13px] text-muted">01 / sobre</span>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          {/* EDITE ESTE TEXTO com sua história real */}
          <p className="text-[16.5px] text-[#2A2A2A] max-w-[46ch] mb-4">
            Sou engenheiro de software com base sólida em Java, interessado em
            construir sistemas robustos, organizados e fáceis de manter.
            Gosto de entender o problema a fundo antes de escrever a primeira
            linha de código.
          </p>
          <p className="text-[16.5px] text-[#2A2A2A] max-w-[46ch]">
            Venho expandindo minha atuação para o ecossistema JavaScript,
            trabalhando com Node.js no backend e React no frontend, buscando
            ter uma visão completa de produto — do banco de dados à
            interface.
          </p>
          <div className="font-mono text-xs text-muted border-l-2 border-accent pl-3 mt-5">
            // edite este parágrafo com sua trajetória, formação e objetivos
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex justify-between items-baseline py-[18px] border-b border-line last:border-b-0 first:pt-0 transition-[padding-left,border-color] hover:pl-2 hover:border-ink"
            >
              <span className="text-sm text-muted">{s.label}</span>
              <span className="font-mono text-sm font-medium">{s.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

import { useState, type MouseEvent } from 'react'
import Reveal from './Reveal'

const EMAIL = 'seuemail@exemplo.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return
    e.preventDefault()
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contato" className="py-20 max-w-wrap mx-auto px-8">
      <Reveal className="flex items-baseline justify-between flex-wrap gap-4 mb-11">
        <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight">
          Contato
        </h2>
        <span className="font-mono text-[13px] text-muted">04 / contato</span>
      </Reveal>

      <div className="flex justify-between items-end flex-wrap gap-8">
        <Reveal className="text-[30px] md:text-[46px] font-extrabold tracking-tight max-w-[620px]">
          Vamos conversar sobre a próxima oportunidade.
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-3.5">
          {/* edite o e-mail abaixo */}
          <a
            href={`mailto:${EMAIL}`}
            onClick={handleCopy}
            className={`font-mono text-[14.5px] pb-1.5 border-b flex items-center gap-2 transition-colors ${
              copied
                ? 'text-accent border-accent'
                : 'border-line hover:border-ink hover:text-accent'
            }`}
          >
            {copied ? 'e-mail copiado!' : EMAIL} <span>→</span>
          </a>
          <a
            href="https://github.com/oguguca"
            target="_blank"
            rel="noopener"
            className="font-mono text-[14.5px] pb-1.5 border-b border-line flex items-center gap-2 hover:border-ink hover:text-accent transition-colors"
          >
            github.com/oguguca <span>→</span>
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener"
            className="font-mono text-[14.5px] pb-1.5 border-b border-line flex items-center gap-2 hover:border-ink hover:text-accent transition-colors"
          >
            linkedin.com/in/-- edite -- <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

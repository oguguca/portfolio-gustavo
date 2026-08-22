import { useState, type MouseEvent } from 'react'

import Reveal from './Reveal'

const EMAIL = 'parpinelli.gu@gmail.com'

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
    <section
      id="contato"
      className="
        relative
        min-h-[100svh]
        flex
        flex-col
        justify-center
        py-16
        max-w-wrap
        mx-auto
        px-8
        overflow-hidden
        scroll-mt-16
      "
    >
      {/* Glow decorativo */}
      

      <Reveal className="relative z-10 flex items-baseline justify-between flex-wrap gap-4 mb-11">
        <h2 className="text-[26px] md:text-[34px] font-extrabold tracking-tight text-ink">
          Contato
        </h2>

        <span className="font-mono text-[13px] text-muted">
          04 / contato
        </span>
      </Reveal>

      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-12 items-end">
        <Reveal>
          <div className="max-w-[650px]">
            <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-accent mb-5">
              // disponível para conversar
            </span>

            <h3 className="text-[32px] md:text-[48px] font-extrabold tracking-tight leading-[1.05] text-ink">
              Vamos conversar sobre a próxima oportunidade.
            </h3>

            <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-muted">
              Tem uma oportunidade, projeto ou ideia? Entre em contato comigo
              por e-mail ou pelas minhas redes.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="
            relative
            min-w-[280px]
            rounded-xl
            border
            border-line/80
            bg-bgAlt/55
            backdrop-blur-md
            p-6
            overflow-hidden
            shadow-[0_0_40px_rgba(200,117,255,0.06)]
          "
        >
          {/* Glow interno */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-[55px]" />

          <div className="relative z-10 flex flex-col">
            <a
              href={`mailto:${EMAIL}`}
              onClick={handleCopy}
              className={`
                group
                font-mono
                text-[14px]
                py-4
                border-b
                flex
                items-center
                justify-between
                gap-6
                transition-all
                ${
                  copied
                    ? 'text-accent border-accent'
                    : 'text-muted border-line hover:text-accent hover:border-accent/60'
                }
              `}
            >
              <span>{copied ? 'e-mail copiado!' : EMAIL}</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="https://github.com/oguguca"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                font-mono
                text-[14px]
                text-muted
                py-4
                border-b
                border-line
                flex
                items-center
                justify-between
                gap-6
                transition-all
                hover:text-accent
                hover:border-accent/60
              "
            >
              <span>github.com/oguguca</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                font-mono
                text-[14px]
                text-muted
                py-4
                flex
                items-center
                justify-between
                gap-6
                transition-all
                hover:text-accent
              "
            >
              <span>linkedin.com/in/gustavo-parpinelli/</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
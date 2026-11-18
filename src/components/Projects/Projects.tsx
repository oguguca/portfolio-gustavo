import type { CSSProperties } from 'react'

import Reveal from '../Reveal'
import { GlowCard } from '../ui/spotlight-card'
import './Projects.css'

type Project = {
  title: string
  year: string
  /** Mostra o indicador "No ar" */
  live?: boolean
  role: string
  description: string
  tags: string[]
  /** Imagem de demonstração em public/projects/ (proporção 16:10) */
  cover?: string
  coverAlt?: string
  /** Cor da marca do projeto, usada nos detalhes do card */
  accent?: string
  links: { site?: string; code?: string }
}

/*
 * Troque os projetos de exemplo pelos seus.
 * A ordem da lista é a ordem de exibição.
 */
const projects: Project[] = [
  {
    title: 'Adry Faixas',
    year: '2026',
    live: true,
    role: 'Design & Desenvolvimento',
    description:
      'Site institucional para uma empresa de comunicação visual com mais de 30 anos em São Paulo. Mostra os serviços e o portfólio da Adry e leva o visitante a pedir orçamento pelo WhatsApp em um clique.',
    tags: ['Astro', 'TypeScript', 'CSS', 'Vercel'],
    cover: '/projects/adry-faixas-mockup.webp',
    coverAlt: 'Site da Adry Faixas exibido em um notebook e em um celular',
    accent: '#F7931E',
    links: {
      site: 'https://adry-faixas.vercel.app',
      code: 'https://github.com/oguguca/Adry-Faixas',
    },
  },
  {
    title: 'Projeto 02',
    year: '2025',
    role: 'Desenvolvedor Back-end',
    description: 'Descreva em duas linhas o problema que o projeto resolve e o que você construiu.',
    tags: ['Java', 'Spring', 'API REST'],
    links: { code: 'https://github.com/oguguca' },
  },
  {
    title: 'Projeto 03',
    year: '2025',
    role: 'Desenvolvedor Front-end',
    description: 'Descreva em duas linhas o problema que o projeto resolve e o que você construiu.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    links: { code: 'https://github.com/oguguca' },
  },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const style = { '--pj-accent': project.accent ?? '#C875FF' } as CSSProperties
  const main = project.links.site ?? project.links.code

  return (
    <Reveal delay={Math.min(index, 2) * 0.08}>
      <GlowCard
        customSize
        glowColor="brand"
        radius={24}
        className="!block !p-0 !gap-0"
      >
        <article className="pj-row" style={style}>
          <a
            href={main}
            target="_blank"
            rel="noopener noreferrer"
            className="pj-media"
            aria-label={`Abrir ${project.title}`}
            tabIndex={-1}
          >
            {project.cover ? (
              <img
                src={project.cover}
                alt={project.coverAlt ?? `Projeto ${project.title}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="pj-media-empty">{project.title}</span>
            )}
          </a>

          <div className="pj-body">
            <div className="flex items-center gap-3 text-[0.8rem] text-muted">
              <span>{project.year}</span>
              {project.live && (
                <span className="pj-live">
                  <span className="pj-live-dot" />
                  No ar
                </span>
              )}
              <span className="ml-auto text-right">{project.role}</span>
            </div>

            <h3 className="pj-title">{project.title}</h3>
            <p className="pj-desc">{project.description}</p>

            <ul className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <li key={tag} className="pj-tag">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="pj-links">
              {project.links.site && (
                <a href={project.links.site} target="_blank" rel="noopener noreferrer" className="pj-link pj-link-main">
                  Ver site <span aria-hidden="true" className="pj-arrow">↗</span>
                </a>
              )}
              {project.links.code && (
                <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="pj-link">
                  Código <span aria-hidden="true" className="pj-arrow">↗</span>
                </a>
              )}
            </div>
          </div>
        </article>
      </GlowCard>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section
      id="projetos"
      className="relative border-b border-line py-[clamp(4.5rem,9vw,7.5rem)]"
    >
      <div className="max-w-wrap mx-auto px-8">
        <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 mb-[clamp(2.5rem,5vw,3.5rem)]">
          <Reveal>
            <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-accent mb-4">
              // projetos
            </span>
            <h2 className="text-[38px] md:text-[60px] font-extrabold tracking-tight leading-[1.02] text-ink">
              Seleção de projetos
              <br />& soluções
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-[360px] text-base leading-relaxed text-muted">
              Uma seleção de projetos, experiências e soluções desenvolvidas ao
              longo da minha trajetória.
            </p>
          </Reveal>
        </header>

        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

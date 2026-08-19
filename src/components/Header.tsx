import { useEffect, useState } from 'react'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-sm border-b border-line">
      <nav className="max-w-wrap mx-auto px-8 py-[18px] flex items-center justify-between">
        <div className="font-mono font-bold text-[15px] tracking-tight transition-[letter-spacing] hover:tracking-wide">
          GP<span className="text-accent">.</span>dev
        </div>

        <div className="flex gap-4 md:gap-7 text-[12.5px] md:text-sm text-muted">
          {links.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative pb-[3px] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-px after:h-px after:bg-ink after:transition-[width] after:duration-300 ${
                  isActive
                    ? 'text-ink after:w-full'
                    : 'hover:text-ink after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

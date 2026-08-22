import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const sections = navItems
      .map(item => document.querySelector(item.href))
      .filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      {
        threshold: 0.45,
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-line/80 bg-bg/20 backdrop-blur-md">
      <div className="max-w-wrap mx-auto px-8 h-[56px] flex items-center justify-center">
        <nav className="flex items-center gap-8 md:gap-10">
          {navItems.map(item => {
            const isActive = active === item.href

            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-[14px] transition-colors duration-300 ${
                  isActive
                    ? 'text-ink'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}

                <span
                  className={`absolute left-0 -bottom-[10px] h-px bg-ink transition-all duration-300 ${
                    isActive
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
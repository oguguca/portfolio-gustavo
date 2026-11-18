import { useEffect, useState } from 'react'
import { Code2, FolderGit2, Home, Mail, Menu as MenuIcon, User, X } from 'lucide-react'

import { MenuContainer, MenuItem } from './ui/fluid-menu'

const navItems = [
  { label: 'Início', href: '#inicio', icon: Home },
  { label: 'Sobre', href: '#sobre', icon: User },
  { label: 'Habilidades', href: '#habilidades', icon: Code2 },
  { label: 'Projetos', href: '#projetos', icon: FolderGit2 },
  { label: 'Contato', href: '#contato', icon: Mail },
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

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', href)
  }

  return (
    <nav aria-label="Navegação principal" className="fixed top-5 right-5 md:top-6 md:right-8 z-50">
      <MenuContainer>
        <MenuItem
          label="Abrir menu"
          icon={
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                <MenuIcon size={24} strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                <X size={24} strokeWidth={1.5} />
              </div>
            </div>
          }
        />
        {navItems.map(({ label, href, icon: Icon }) => (
          <MenuItem
            key={href}
            label={label}
            isActive={active === href}
            onClick={() => goTo(href)}
            icon={<Icon size={24} strokeWidth={1.5} />}
          />
        ))}
      </MenuContainer>
    </nav>
  )
}

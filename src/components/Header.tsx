import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  const current = navItems.find(item => item.href === active) ?? navItems[0]
  const CurrentIcon = current.icon

  return (
    <nav
      aria-label="Navegação principal"
      className="group/nav fixed top-5 right-5 md:top-6 md:right-8 z-50 flex items-start gap-3"
    >
      {/* Seção atual: visível com o menu fechado */}
      <div
        aria-live="polite"
        className="mt-3 flex h-10 items-center gap-2 overflow-hidden rounded-full bg-bgAlt/80 pl-2 pr-4 ring-1 ring-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 group-has-[[data-expanded=true]]/nav:pointer-events-none group-has-[[data-expanded=true]]/nav:translate-x-2 group-has-[[data-expanded=true]]/nav:opacity-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.href}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 0.84, 0.44, 1] }}
            className="flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/20 text-accent">
              <CurrentIcon size={15} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="sr-only">Você está em: </span>
            {current.label}
          </motion.span>
        </AnimatePresence>
      </div>

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

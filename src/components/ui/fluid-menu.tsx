import React, { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

/*
 * Fluid menu — menu circular que se expande em "gotas".
 * Adaptado do componente original:
 * - cores do portfólio no lugar dos cinzas do tema claro/escuro;
 * - itens fecham o menu ao serem clicados e Esc também fecha;
 * - itens recolhidos ficam fora da navegação por teclado (visibility: hidden);
 * - prop `label` no MenuItem: rótulo acessível + dica que aparece no hover.
 * A diretiva "use client" foi removida: é do Next.js e o Vite só emitiria aviso.
 */

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-muted" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-bgAlt shadow-lg ring-1 ring-line focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  /** Nome do item: vira aria-label e a dica exibida no hover */
  label?: string
  /** Estado aberto/fechado, para leitores de tela (usado no botão principal) */
  expanded?: boolean
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  icon,
  isActive = false,
  label,
  expanded,
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={`relative block w-full h-16 text-center group transition-colors duration-200 focus-visible:outline-none focus-visible:bg-white/10
        ${disabled ? "text-muted/50 cursor-not-allowed" : isActive ? "text-white" : "text-ink/80 hover:text-ink"}
        ${isActive ? "bg-accent/35" : ""}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={isActive ? "true" : undefined}
      aria-expanded={expanded}
    >
      <span className="flex items-center justify-center h-full mt-[5%]">
        {icon && (
          <span className="h-6 w-6 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  // Esc fecha o menu
  useEffect(() => {
    if (!isExpanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isExpanded])

  const labelOf = (child: React.ReactNode) =>
    React.isValidElement<MenuItemProps>(child) ? child.props.label : undefined
  const isActiveItem = (child: React.ReactNode) =>
    React.isValidElement<MenuItemProps>(child) ? Boolean(child.props.isActive) : false

  return (
    <div className="relative w-[64px]" data-expanded={isExpanded}>
      {/* Container for all items */}
      <div className="relative">
        {/* First item - always visible */}
        <div
          className="relative w-16 h-16 bg-bgAlt/90 backdrop-blur-md cursor-pointer rounded-full group will-change-transform z-50 shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
          onClick={handleToggle}
        >
          {React.isValidElement<MenuItemProps>(childrenArray[0])
            ? React.cloneElement(childrenArray[0], { expanded: isExpanded })
            : childrenArray[0]}
        </div>

        {/* Other items */}
        {childrenArray.slice(1).map((child, index) => {
          const label = labelOf(child)
          const active = isActiveItem(child)

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-16 h-16 group/item will-change-transform"
              onClick={() => setIsExpanded(false)}
              style={{
                transform: `translateY(${isExpanded ? (index + 1) * 48 : 0}px)`,
                opacity: isExpanded ? 1 : 0,
                visibility: isExpanded ? "visible" : "hidden",
                zIndex: 40 - index,
                transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                           opacity ${isExpanded ? "300ms" : "350ms"},
                           visibility 0s linear ${isExpanded ? "0s" : "350ms"}`,
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {/* Fundo recortado em círculo: cria o efeito de gotas encadeadas */}
              <div
                className="w-full h-full bg-bgAlt/90 backdrop-blur-md"
                style={{
                  clipPath:
                    index === childrenArray.length - 2
                      ? "circle(50% at 50% 50%)"
                      : "circle(50% at 50% 55%)",
                }}
              >
                {child}
              </div>

              {/* Dica com o nome do item (fora do recorte para não ser cortada) */}
              {label && (
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs backdrop-blur-md transition-all duration-200 ${
                    active
                      ? "bg-accent/25 text-white ring-1 ring-accent/50 opacity-100 translate-x-0"
                      : "bg-bgAlt/90 text-ink ring-1 ring-white/10 opacity-0 translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-focus-within/item:opacity-100 group-focus-within/item:translate-x-0"
                  }`}
                >
                  {label}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

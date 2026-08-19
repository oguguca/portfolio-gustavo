# Portfólio — Gustavo Parpinelli

Portfólio profissional pessoal, construído com **React, TypeScript, Vite, Tailwind CSS e Framer Motion**.

## Stack

- **[React 18](https://react.dev)** + **[TypeScript](https://www.typescriptlang.org)** — componentes tipados
- **[Vite](https://vitejs.dev)** — build e dev server
- **[Tailwind CSS](https://tailwindcss.com)** — estilização utilitária, com design tokens customizados (`tailwind.config.ts`)
- **[Framer Motion](https://www.framer.com/motion/)** — animações de entrada, scroll-reveal e barra de progresso
- **Canvas API** — fundo de pontos animado no hero, reativo ao mouse
- Cursor customizado, botões magnéticos e efeito de digitação escritos à mão em React + hooks

## Estrutura do projeto

```
portfolio-react/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── hooks/
│   │   └── useReducedMotion.ts
│   └── components/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── HeroCanvas.tsx
│       ├── Marquee.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       ├── CustomCursor.tsx
│       ├── ScrollProgress.tsx
│       └── Reveal.tsx
└── README.md
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

```bash
npm run build     # gera a versão de produção em /dist
npm run preview   # serve o build de produção localmente
```

## Deploy na Vercel

**Opção 1 — CLI:**
```bash
npm i -g vercel
vercel
```

**Opção 2 — GitHub:** suba este projeto para um repositório e importe em [vercel.com/new](https://vercel.com/new). A Vercel detecta Vite automaticamente (o `vercel.json` já está configurado, mas é redundante com a detecção automática).

## Como personalizar

| O que editar | Onde |
|---|---|
| Texto "Sobre mim" | `src/components/About.tsx` |
| Habilidades | `src/components/Skills.tsx` — duplique um objeto do array `skills` |
| Projetos | `src/components/Projects.tsx` — troque a `div` de thumbnail por uma `<img>` |
| E-mail / links | `src/components/Contact.tsx` |
| Cores e fontes | `tailwind.config.ts`, bloco `theme.extend` |
| Textos do terminal (hero) | `src/components/Hero.tsx`, array `TYPED_LINES` |

## Detalhes técnicos

- Toda animação respeita `prefers-reduced-motion`, tanto via `MotionConfig reducedMotion="user"` do Framer Motion quanto via checagens manuais nos efeitos em Canvas e no cursor customizado.
- O cursor customizado e o fundo em Canvas são desativados automaticamente em dispositivos touch (`pointer: coarse`).
- Scroll-reveal usa `whileInView` do Framer Motion com `viewport={{ once: true }}`, então cada elemento anima apenas uma vez.

---

Feito com React, TypeScript, Vite, Tailwind CSS e Framer Motion. ☕

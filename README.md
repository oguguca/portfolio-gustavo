# Portfólio — Gustavo Parpinelli

Portfólio profissional pessoal, construído com **React, TypeScript, Vite, Tailwind CSS e Framer Motion**.

## Stack

- **[React 18](https://react.dev)** + **[TypeScript](https://www.typescriptlang.org)** — componentes tipados
- **[Vite](https://vitejs.dev)** — build e dev server
- **[Tailwind CSS](https://tailwindcss.com)** — estilização utilitária, com design tokens customizados (`tailwind.config.ts`)
- **[Framer Motion](https://www.framer.com/motion/)** — animações de entrada, scroll-reveal e barra de progresso
- **[GSAP](https://gsap.com) (SplitText + ScrollTrigger)** — o `SplitText` do hero usa o plugin oficial, a mesma base do componente [reactbits.dev/text-animations/split-text](https://reactbits.dev/text-animations/split-text)
- **[OGL](https://github.com/oframe/ogl)** — o fundo `Iridescence` do hero usa essa lib de WebGL leve, a mesma base do [reactbits.dev/backgrounds/iridescence](https://reactbits.dev/backgrounds/iridescence)
- **Canvas API / hooks customizados** — cursor decorativo, digitação, botões magnéticos

Site 100% estático — sem backend, sem API, sem coleta de dados. O contato acontece por link direto de e-mail (`mailto:`) e redes sociais.

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
│       ├── Iridescence.tsx      # fundo animado em WebGL
│       ├── SplitText.tsx        # reveal de texto por palavra/caractere
│       ├── Marquee.tsx
│       ├── About.tsx            # bio + espaço para foto
│       ├── Skills.tsx
│       ├── Projects/            # lista de projetos (imagem + descrição, links)
│       ├── Contact.tsx          # links diretos (e-mail, GitHub, LinkedIn)
│       ├── Footer.tsx
│       ├── CustomCursor.tsx     # cursor decorativo (o cursor do sistema continua visível)
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

**Opção 2 — GitHub:** suba este projeto para um repositório e importe em [vercel.com/new](https://vercel.com/new). A Vercel detecta Vite automaticamente.

## Como personalizar

| O que editar | Onde |
|---|---|
| Sua foto | `src/components/About.tsx` — troque a div marcada `PLACEHOLDER` por uma `<img>` |
| Texto "Sobre mim" | `src/components/About.tsx` |
| Habilidades | `src/components/Skills.tsx` — duplique um objeto do array `skills` |
| Projetos | array `projects` em `src/components/Projects/Projects.tsx`; imagens 16:10 em `public/projects/` |
| E-mail / links | `src/components/Contact.tsx` |
| Cores e fontes | `tailwind.config.ts`, bloco `theme.extend` |
| Textos do terminal (hero) | `src/components/Hero.tsx`, array `TYPED_LINES` |
| Intensidade do fundo Iridescence | `src/components/Hero.tsx`, prop `amplitude` do `<Iridescence />` |

## Detalhes técnicos

- Toda animação respeita `prefers-reduced-motion`, via `MotionConfig reducedMotion="user"` do Framer Motion e checagens manuais no WebGL e no cursor customizado.
- O cursor customizado é um anel decorativo que segue o mouse com atraso — o ponteiro nativo do sistema continua sempre visível.
- `Iridescence` e `CustomCursor` são desativados automaticamente em dispositivos touch (`pointer: coarse`) e quando `prefers-reduced-motion` está ativo.
- `SplitText` e `Iridescence` seguem a API pública documentada em reactbits.dev (mesmos nomes de prop) e usam as mesmas bibliotecas por baixo dos panos — GSAP `SplitText`/`ScrollTrigger` e `OGL` — em vez de uma versão só "inspirada".

---

Feito com React, TypeScript, Vite, Tailwind CSS e Framer Motion. ☕

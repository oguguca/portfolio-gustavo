import {
  FaJava,
  FaNodeJs,
  FaReact,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa'

import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
} from 'react-icons/si'

import LogoLoop from './LogoLoop/LogoLoop'

const technologies = [
  {
    node: (
      <div className="flex items-center gap-3 text-[#C9BED8] transition-all duration-300 hover:text-accent">
        <FaJava className="text-[32px]" />
        <span className="font-mono text-sm font-medium">Java</span>
      </div>
    ),
    title: 'Java',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <FaNodeJs className="text-[32px]" />
        <span className="font-mono text-sm font-medium">Node.js</span>
      </div>
    ),
    title: 'Node.js',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <FaReact className="text-[32px]" />
        <span className="font-mono text-sm font-medium">React</span>
      </div>
    ),
    title: 'React',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <SiTypescript className="text-[30px]" />
        <span className="font-mono text-sm font-medium">
          TypeScript
        </span>
      </div>
    ),
    title: 'TypeScript',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <SiJavascript className="text-[30px]" />
        <span className="font-mono text-sm font-medium">
          JavaScript
        </span>
      </div>
    ),
    title: 'JavaScript',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <SiTailwindcss className="text-[32px]" />
        <span className="font-mono text-sm font-medium">
          Tailwind CSS
        </span>
      </div>
    ),
    title: 'Tailwind CSS',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <FaGitAlt className="text-[32px]" />
        <span className="font-mono text-sm font-medium">Git</span>
      </div>
    ),
    title: 'Git',
  },

  {
    node: (
      <div className="flex items-center gap-3 text-muted transition-all duration-300 hover:text-accent">
        <FaGithub className="text-[32px]" />
        <span className="font-mono text-sm font-medium">
          GitHub
        </span>
      </div>
    ),
    title: 'GitHub',
  },
]

export default function Marquee() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-y
        border-line/50
        py-6
      "
    >
      <div
        className="
          w-full
          [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]
          [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]
        "
      >
        <LogoLoop
          logos={technologies}
          width="100%"
          speed={65}
logoHeight={34}
gap={85}
hoverSpeed={18}
scaleOnHover
          ariaLabel="Tecnologias que utilizo"
        />
      </div>
    </section>
  )
}
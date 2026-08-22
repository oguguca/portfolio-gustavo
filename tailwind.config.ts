import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        // Fundo escuro combinando com o Molten Metal
        bg: '#0B0614',

        // Fundo secundário para cards, botões e seções
        bgAlt: '#171020',

        // Texto principal
        ink: '#F7F2FF',

        // Texto secundário
        muted: '#A89DB8',

        // Bordas
        line: '#352847',

        // Cor de destaque
        accent: '#C875FF',
      },

      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      maxWidth: {
  wrap: '1320px',
},

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        blink: {
          '50%': { opacity: '0' },
        },

        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },

        rail: {
          '0%': { top: '-100%' },
          '60%': { top: '100%' },
          '100%': { top: '100%' },
        },
      },

      animation: {
        marquee: 'marquee 22s linear infinite',
        blink: 'blink 1s step-end infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
        rail: 'rail 2.2s ease-in-out infinite',
      },
    },
  },

  plugins: [],
} satisfies Config
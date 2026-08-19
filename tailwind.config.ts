import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAFA',
        bgAlt: '#F1F1EF',
        ink: '#0B0B0B',
        muted: '#6B6B6B',
        line: '#DEDEDA',
        accent: '#2FAE66',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        wrap: '1080px',
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

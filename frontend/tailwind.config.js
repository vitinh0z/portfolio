/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'acid-green': '#ccff00',
        'acid-purple': '#b026ff',
        'error-red': '#ff003c',
        'void-black': '#000000',
        'card-bg': '#0a0a0a',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #000',
        'hard-green': '4px 4px 0px 0px #ccff00',
        'hard-purple': '4px 4px 0px 0px #b026ff',
        'hard-red': '4px 4px 0px 0px #ff003c',
        'hard-white': '4px 4px 0px 0px #ffffff',
        'glow-green': '0 0 20px rgba(204,255,0,0.4)',
      },
      keyframes: {
        glitch: {
          '0%':   { transform: 'translate(0)' },
          '20%':  { transform: 'translate(-2px, 2px)' },
          '40%':  { transform: 'translate(-2px, -2px)' },
          '60%':  { transform: 'translate(2px, 2px)' },
          '80%':  { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        glitch:   'glitch 0.2s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        blink:    'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}

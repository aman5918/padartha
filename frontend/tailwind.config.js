/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fdfcf9',
          100: '#fbf9f5',
          200: '#f5f0ea',
          300: '#ede7dd',
          400: '#d9cfbf',
          500: '#b8a892',
          600: '#8c7a65',
          700: '#6b5c4b',
          800: '#473d32',
          900: '#26201a',
        },
        terracotta: {
          50: '#fbf5f2',
          100: '#f7ebe5',
          200: '#eed6cc',
          300: '#e1b7a4',
          400: '#cf8c6e',
          500: '#b55b32', // Page 21 primary accent
          600: '#a34823',
          700: '#883a1b',
          800: '#6f3019',
          900: '#5b2a18',
        },
        forest: {
          500: '#047857', // The Sill emerald green
          600: '#065f46',
          700: '#064e3b'
        },
        obsidian: {
          900: '#1c1c1e',
          950: '#121212',
          card: '#18181b'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}

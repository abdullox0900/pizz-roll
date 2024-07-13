const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aliceblue: '#f0f6ff',
        cool_grey: '#8e93a8',
        'tg-theme-bg': 'var(--tg-theme-bg-color)',
        'tg-theme-text': 'var(--tg-theme-text-color)',
        'tg-theme-hint': 'var(--tg-theme-hint-color)',
        'tg-theme-link': 'var(--tg-theme-link-color)',
        'tg-theme-button': 'var(--tg-theme-button-color)',
        'tg-theme-button-text': 'var(--tg-theme-button-text-color)',
        'tg-theme-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
        'telegram-blue': '#0088cc',
      },
      height: {
        '90vh': '90vh',
        '95vh': '95vh',
        '80vh': '80vh',
        '70vh': '70vh',
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.tg-theme-text': {
          color: 'var(--tg-theme-text-color)',
        },
        '.tg-theme-hint': {
          color: 'var(--tg-theme-hint-color)',
        },
        '.tg-theme-link': {
          color: 'var(--tg-theme-link-color)',
        },
        '.tg-theme-button': {
          backgroundColor: 'var(--tg-theme-button-color)',
          color: 'var(--tg-theme-button-text-color)',
        },
        '.tg-theme-secondary-bg': {
          backgroundColor: 'var(--tg-theme-secondary-bg-color)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}
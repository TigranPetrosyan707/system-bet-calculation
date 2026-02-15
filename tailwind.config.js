/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          surfaceLight: '#334155',
          border: '#334155',
          text: '#f1f5f9',
          textSecondary: '#cbd5e1',
          textMuted: '#94a3b8',
        },
      },
    },
  },
  plugins: [],
}


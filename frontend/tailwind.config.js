/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155'
        },
        brand: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          red: '#ef4444',
          green: '#22c55e',
          yellow: '#eab308'
        }
      }
    },
  },
  plugins: [],
}

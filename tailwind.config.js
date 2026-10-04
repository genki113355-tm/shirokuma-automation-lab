/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#f8fafc', // Main background (Arctic White)
          800: '#ffffff', // Sidebar / Header (Pure White)
          700: '#f0f9ff', // Card backgrounds (Ice Blue)
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4', // Primary accent (Cyan)
          600: '#0891b2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

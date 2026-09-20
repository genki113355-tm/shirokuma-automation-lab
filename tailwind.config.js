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
          900: '#050a11', // Main background
          800: '#090d16', // Sidebar / Component background
          700: '#0f1626', // Card backgrounds
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

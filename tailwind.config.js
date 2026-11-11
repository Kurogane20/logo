/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        blue: '#2A7FFF',
        paper: '#F4F7FA',
        grid: '#D5E3F5',
        anno: '#7FA8EC',
        dark: '#0C1626',
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

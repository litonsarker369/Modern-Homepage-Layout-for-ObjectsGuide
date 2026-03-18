
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        foreground: '#1A1A1A',
        muted: '#6B6560',
        primary: '#C4553A',
        secondary: '#7A8B6F',
        card: '#FFFFFF',
        border: '#E8E6E1',
        nav: '#F3F1ED',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

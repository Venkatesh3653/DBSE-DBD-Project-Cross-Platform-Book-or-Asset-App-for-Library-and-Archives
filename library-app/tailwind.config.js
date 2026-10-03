/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#1C2321',
          soft: '#4A5551',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          off: '#F6F5F2',
        },
        line: '#E4E2DC',
        brand: {
          50: '#EEF1F8',
          100: '#D9E0EF',
          200: '#B3C1DF',
          300: '#8CA2CF',
          400: '#5A79B3',
          500: '#2B4570',
          600: '#22375A',
          700: '#1A2A45',
          800: '#131F33',
          900: '#0C1421',
        },
        gold: {
          400: '#C99A46',
          500: '#A9843A',
          600: '#8A6A2C',
        },
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(28, 35, 33, 0.04), 0 1px 8px rgba(28, 35, 33, 0.04)',
      },
    },
  },
  plugins: [],
}

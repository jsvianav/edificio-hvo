/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turquesa: {
          50:  '#EAFBFC',
          100: '#C9F3F6',
          200: '#9AE7EC',
          300: '#5FD3DB',
          400: '#2DBDC7',
          500: '#16B3BC',
          600: '#0E929A',
          700: '#0C757C',
          800: '#0D5C61',
          900: '#0F4B4F',
        },
        piedra: {
          50:  '#F7F4EF',
          100: '#EDE7DE',
          200: '#DAD0C2',
          300: '#C2B4A0',
          400: '#A8987F',
          500: '#8E7E66',
          600: '#6E6151',
          700: '#544A3E',
          800: '#3B342C',
          900: '#26211C',
        },
        carbon:   '#1A2024',
        bruma:    '#F7F9F9',
        whatsapp: '#25D366',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

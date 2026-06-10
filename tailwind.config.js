/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tokens semánticos — los valores reales viven en src/index.css
      // y cambian automáticamente en modo oscuro (.dark)
      colors: {
        fondo:      'rgb(var(--c-fondo) / <alpha-value>)',
        superficie: 'rgb(var(--c-superficie) / <alpha-value>)',
        elevada:    'rgb(var(--c-elevada) / <alpha-value>)',
        tinta:      'rgb(var(--c-tinta) / <alpha-value>)',
        suave:      'rgb(var(--c-suave) / <alpha-value>)',
        linea:      'rgb(var(--c-linea) / <alpha-value>)',
        acento:     'rgb(var(--c-acento) / <alpha-value>)',
        'acento-fuerte':    'rgb(var(--c-acento-fuerte) / <alpha-value>)',
        'acento-contraste': 'rgb(var(--c-acento-contraste) / <alpha-value>)',
        // Valores fijos (no cambian con el tema) — sección de contacto y botones sobre petróleo
        petroleo: {
          DEFAULT: '#1C4742',
          oscuro:  '#12332F',
          claro:   '#9DBFB6',
        },
        marfil: '#F5F2EA',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Archivo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

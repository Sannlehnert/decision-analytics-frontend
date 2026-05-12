/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        principal: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        secundaria: ['Crimson Text', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': '0.75rem',
        'xs': '0.875rem',
        'sm': '0.9375rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
      },
      colors: {
        fondo: {
          principal: '#f9f7f4',
          superficie: '#ffffff',
          elevado: '#f5f2ed',
        },
        texto: {
          primario: '#1a1917',
          secundario: '#5c5954',
          terciario: '#8c8982',
          inverso: '#f9f7f4',
        },
        borde: {
          DEFAULT: '#e3ded6',
          foco: '#8c7853',
        },
        acento: {
          DEFAULT: '#8c7853',
          hover: '#6b5c3f',
          claro: '#f0ebe0',
          texto: '#5c4a2e',
        },
        exito: {
          DEFAULT: '#4a7c59',
          claro: '#edf7f0',
        },
        error: {
          DEFAULT: '#b84c4c',
          claro: '#fdf0f0',
        },
        advertencia: {
          DEFAULT: '#b8863c',
          claro: '#fdf6ed',
        },
        informacion: {
          DEFAULT: '#4c6b8c',
          claro: '#edf2f7',
        },
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(26, 25, 23, 0.04)',
        'sm': '0 1px 3px rgba(26, 25, 23, 0.06), 0 1px 2px rgba(26, 25, 23, 0.04)',
        'md': '0 4px 12px rgba(26, 25, 23, 0.06), 0 1px 3px rgba(26, 25, 23, 0.04)',
        'lg': '0 12px 32px rgba(26, 25, 23, 0.08), 0 4px 8px rgba(26, 25, 23, 0.04)',
      },
      transitionTimingFunction: {
        'base': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'rapida': '150ms',
        'base': '250ms',
        'lenta': '400ms',
      },
    },
  },
  plugins: [],
}
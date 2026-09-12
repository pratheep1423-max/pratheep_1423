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
        ivory: {
          50: '#FAF9F6',
          100: '#F4F1EA',
          200: '#EFECE4',
          300: '#E2DDD1',
          400: '#CFC7B5',
          DEFAULT: '#FAF9F6',
        },
        obsidian: {
          50: '#F5F5F6',
          100: '#E1E2E5',
          800: '#1A1D24',
          900: '#0D0E12',
          950: '#07080A',
          DEFAULT: '#0D0E12',
        },
        champagne: {
          50: '#FAF7EE',
          100: '#F2E8D3',
          300: '#DFCA9D',
          400: '#D4B87E',
          500: '#C5A059',
          600: '#A8823F',
          DEFAULT: '#C5A059',
        },
        studio: {
          bg: '#FAF9F6',
          card: '#FFFFFF',
          darkBg: '#0F1115',
          darkCard: '#181B20',
          border: '#E8E5DC',
          darkBorder: '#272B34',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(13, 14, 18, 0.05)',
        'editorial-hover': '0 30px 60px -15px rgba(13, 14, 18, 0.12)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.25)',
      },
      animation: {
        'slow-zoom': 'zoom 20s infinite alternate linear',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}

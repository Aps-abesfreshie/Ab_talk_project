/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo
          light: '#818CF8',
          dark: '#4F46E5',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan
          light: '#22D3EE',
          dark: '#0891B2',
        },
        success: {
          DEFAULT: '#22C55E', // Green
          light: '#4ADE80',
          dark: '#16A34A',
        },
        slate: {
          850: '#1E293B',
          900: '#0F172A',
          950: '#0B0F19', // Deep Slate background
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(99, 102, 241, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium': '0 20px 40px -15px rgba(0,0,0,0.1)',
        'premium-hover': '0 30px 60px -15px rgba(0,0,0,0.15)',
        'glow-primary': '0 0 15px rgba(99, 102, 241, 0.4)',
        'glow-accent': '0 0 15px rgba(6, 182, 212, 0.4)',
      }
    },
  },
  plugins: [],
}

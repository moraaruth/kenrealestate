/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4FD8',
          dark: '#1340B0',
          light: '#3B6EF0',
          50: '#EFF4FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#1B4FD8',
          600: '#1340B0',
          700: '#0F2F80',
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FCD34D',
        },
        background: {
          DEFAULT: '#F8FAFF',
          alt: '#EFF4FF',
        },
        foreground: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#94A3B8',
        },
        card: '#FFFFFF',
        border: {
          DEFAULT: '#DBEAFE',
          subtle: '#E2E8F0',
        },
        success: '#10B981',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(27, 79, 216, 0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 4px 16px rgba(27, 79, 216, 0.12), 0 2px 6px rgba(0,0,0,0.06)',
        'lg': '0 12px 40px rgba(27, 79, 216, 0.16), 0 4px 12px rgba(0,0,0,0.08)',
        'xl': '0 24px 64px rgba(27, 79, 216, 0.2), 0 8px 24px rgba(0,0,0,0.1)',
        'blue': '0 8px 32px rgba(27, 79, 216, 0.3)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'blob-morph': 'blob-morph 12s ease-in-out infinite',
        'sparkle-fade': 'sparkle-fade 1.5s ease-in-out forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(27,79,216,0.4)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 12px rgba(27,79,216,0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(27,79,216,0)' },
        },
        'blob-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 70% 70% 30%' },
          '75%': { borderRadius: '40% 70% 60% 30% / 70% 30% 50% 60%' },
        },
        'sparkle-fade': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(75deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(120deg)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(135deg, #1B4FD8 0%, #3B6EF0 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.75) 100%)',
      },
    },
  },
  plugins: [],
};
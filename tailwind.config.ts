import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f5f7fb',
          foreground: '#6b7280',
        },
        border: '#e5e7eb',
        background: '#ffffff',
        foreground: '#0b1220',
        ring: '#dbeafe',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(17,24,39,0.08)',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
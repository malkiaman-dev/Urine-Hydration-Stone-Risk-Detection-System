/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003B73',
          light: '#005696',
          dark: '#00264D',
        },
        secondary: {
          DEFAULT: '#00A8E8',
          light: '#33BCED',
          dark: '#0086BA',
        },
        accent: {
          DEFAULT: '#00D1B2',
          light: '#33DBC1',
          dark: '#00A78E',
        },
        medical: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#1E293B',
          subtext: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

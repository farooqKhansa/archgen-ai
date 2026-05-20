/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f1117',
        'dark-card': '#1a1d27',
        'accent-blue': '#4f8ef7',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slideInUp': 'slideInUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

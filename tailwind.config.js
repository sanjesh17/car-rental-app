/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-horizontal': {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: 'translateX(75%)' }
        }
      },
      animation: {
        'bounce-horizontal': 'bounce-horizontal 2s infinite'
      }
    }
  },
  plugins: [],
}
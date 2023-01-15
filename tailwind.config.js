/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "to-right": {
          "0%": { width: '0' },
          "100%": { width: '100%' }
        },
      }, 
      animation: {
        "to-right": "to-right 0.6s ease-in-out"
      }
    },
  },
  plugins: [],
}
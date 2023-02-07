/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      dropShadow: {
        'custom': '0 0 5px rgba(0, 0, 0, 1)'
      }
    },
  },
  plugins: [],
}

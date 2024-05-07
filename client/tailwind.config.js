/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'background-primary': '#EDF7FE',
        'background-secondary': '#FFFFFF',
        'text-primary': '#15426B',
        'text-secondary': '#90AD84',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
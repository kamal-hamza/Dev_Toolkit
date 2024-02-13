/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [],
  darkMode: false,
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    colors: {
      bg: '#33333d',
      txt: '#F5F5DC',
    },
    fontFamily: {
      'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      '128': '32rem',
      '144': '36rem',
    },
  },
  plugins: [],
}


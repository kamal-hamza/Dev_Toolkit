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
      ebg: '#373740',
      txtc: 'whitesmoke',
    },
    extend: {},
  },
  plugins: [],
}


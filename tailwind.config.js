/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/views/**/*.ejs",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif']
      },
    },
  },
  plugins: [],
}

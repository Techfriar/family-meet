module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-import'), // Ensure to use postcss-import to import your custom CSS
  ],
}
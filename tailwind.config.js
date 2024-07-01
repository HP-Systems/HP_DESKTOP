/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'cian': '#76ABAE',
      'cian-hover': '#5C8D8F'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

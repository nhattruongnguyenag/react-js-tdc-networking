/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  variants: {
    extend: {
      visibility: ['group-hover'],
    }
  }
}
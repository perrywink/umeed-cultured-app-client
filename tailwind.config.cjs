/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'umeed-dogwood':'#F6D2C2',
      'umeed-tangerine':{
        500: '#ECA484',
        700: '#DE612B'
      },
      'umeed-beige': '#EC9C83',
      'umeed-brown':'#B3867A',
      'umeed-dimgray':'#797071',
      'umeed-payneblue':'#3F586A',
      'umeed-blue':'#05445E',
      'umeed-moonstone':'#6D9BA9',
      'umeed-cyan':'#D4F1F4'
    },
    fontFamily:{
      'umeed-serif': ['Cormorant Garamond', 'serif'],
      'umeed-sans-serif': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

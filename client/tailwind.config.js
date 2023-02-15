/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-beige': '#f3e2b3',
        'theme-light-green': '#9db79c',
        'theme-black': '#131d28',
        'theme-light-brown': '#945b57',
        'theme-dark-brown': '#553c42',
        'theme-dark-green': '#52726a',
        'theme-red': '#cc5552',
        'theme-light-blue': '#6e8f94',
        'theme-dark-blue': '#2d5668'
      },
      backgroundImage: {
        'volley': "url('./src/assets/img/grid_2.png')",
        'hockey': "url('./src/assets/img/grid_0.png')",
        'chess' : "url('./src/assets/img/grid_4.png')",
        'soccer' : "url('./src/assets/img/grid_3.png')",
        'gaming' : "url('./src/assets/img/grid_1.png')"
      }
    },
  },
  plugins: [],
}

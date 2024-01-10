/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'five-star-gold-light': '#734440',
        'five-star-gold-dark': '#CBA368',
        'four-star-purple-light': '#373658',
        'four-star-purple-dark': '#7650B1'
      }
    },
  },
  plugins: [],
}


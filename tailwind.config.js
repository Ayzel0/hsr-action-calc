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
        'four-star-purple': '#7A4E92',
        'five-star-gold': '#BA9F36'
      }
    },
  },
  plugins: [],
}


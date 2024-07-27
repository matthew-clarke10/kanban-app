/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#FFF',
        'light-bg-faded': '#F9F9F9',
        'light-bg-inactive': '#7F7F7F',
        'dark-bg': '#171717',
        'dark-bg-faded': '#212121',
        'dark-bg-inactive': '#050505',
        'light-text': '#OOO',
        'dark-text': '#B4B4B4',
      },
    },
  },
  plugins: [],
}
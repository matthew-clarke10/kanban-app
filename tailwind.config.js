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
        'light-bg-primary': '#FFFFFF',
        'light-bg-secondary': '#E0E0E0',
        'light-bg-tertiary': '#C0C0C0',
        'light-bg-inactive': '#7F7F7F',
        'dark-bg-primary': '#171717',
        'dark-bg-secondary': '#2C2C2C',
        'dark-bg-tertiary': '#383838',
        'dark-bg-inactive': '#050505',
        'light-text': '#000',
        'dark-text': '#FFF',
        'light-board': '#3B82F6',
        'dark-board': '#4338CA',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#d5d6d7',
          200: '#ababae',
          300: '#818286',
          400: '#57585d',
          500: '#2d2e35',
          600: '#24252a',
          700: '#1b1c20',
          800: '#121215',
          900: '#09090b',
        },
      },
    },
  },
  plugins: [],
}

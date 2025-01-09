/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', ['data-mod="dark"']],
  content: [`./apps/**/*.{html,ts}`, `./libs/**/*.{html,ts}`],
  theme: {
    extend: {
      colors: {
        'sjl-gray': {
          50: '#f3f6f8',
          100: '#e1e8ec',
          200: '#c5d2dc',
          300: '#9eb3c2',
          400: '#6e8ba2',
          500: '#536f87',
          600: '#475c73',
          700: '#3f4e5f',
          800: '#394351',
          900: '#333b46',
          950: '#0a0c0f',
        },
      },
      maxWidth: {
        '8xl': '96rem', // Adjust size as needed (96rem = 1536px)
      },
    },
  },
  plugins: [],
};

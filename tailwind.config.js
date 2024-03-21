/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karrot: ['KarrotSans Bold'],
      },
      screens: {
        sm: '375px',
        mo: '480px',
        ta: '768px',
        sde: '992px',
        de: '1280px',
      },
    },
  },
  plugins: [],
}

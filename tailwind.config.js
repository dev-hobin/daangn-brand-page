/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karrot: ['KarrotSans Bold'],
      },
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
}

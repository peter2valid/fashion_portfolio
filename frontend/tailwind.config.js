/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fashion: ["'Bodoni Moda'", 'serif'],
        signature: ["'Great Vibes'", 'cursive'],
        body: ["'Inter'", 'system-ui', 'sans-serif'],
      },
      colors: {
        fashionRed: '#a32117',
        creamBg: '#efefef',
        textBlack: '#000000',
        borderBlack: '#0a0a0a',
      },
    },
  },
  plugins: [],
};


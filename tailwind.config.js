/** @type {import('tailwindcss').Config} */

import konstaConfig from 'konsta/config';

module.exports = konstaConfig({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: []
});

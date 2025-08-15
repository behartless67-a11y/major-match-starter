/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system','system-ui','Segoe UI','Roboto','Helvetica','Arial','sans-serif']
      }
    }
  },
  plugins: []
};

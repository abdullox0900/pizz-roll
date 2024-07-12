/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aliceblue: '#f0f6ff',
        cool_grey: '#8e93a8',
      },
      height: {
        '90vh': '90vh',
        '95vh': '95vh',
        '80vh': '80vh',
        '70vh': '70vh',
      }
    },
  },
  plugins: [],
}
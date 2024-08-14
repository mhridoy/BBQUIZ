/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#312e81',
          // Add other shades if needed
        },
        purple: {
          900: '#4c1d95',
          // Add other shades if needed
        },
        // You can add more custom colors here
      },
    },
  },
  plugins: [],
}
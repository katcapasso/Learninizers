/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}" // Include custom components
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#ffe4e6",
          100: "#fecdd3",
          400: "#f43f5e",
        },
      },
    },
  },
  plugins: [],
};

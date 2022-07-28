/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sunrise: "#ECB325",
        sunset: "#f54806",
        midnight: '#1F1D32',
        dawn: '#187ECA'
      },
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

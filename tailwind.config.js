/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sunrise: "#ECB325",
        sunset: "#ED7301",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

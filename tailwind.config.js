/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sunrise: "#EFD594",
        sunset: "#EB7A13",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

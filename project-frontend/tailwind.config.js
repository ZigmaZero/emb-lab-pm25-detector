/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Yellow: "#FCF2D9", // Adding custom color
        Green: "#66A76D",
        Black: "#232323",
      },
      fontFamily: {
        sukhumvit: ["Sukhumvit", "sans-serif"],
        "sukhumvit-Bold": ["Sukhumvit-Bold", "sans-serif"],
        "sukhumvit-SemiBold": ["Sukhumvit-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

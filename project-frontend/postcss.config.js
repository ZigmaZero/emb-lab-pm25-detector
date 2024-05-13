/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sukhumvit: ["Sukhumvit", "sans-serif"],
        "sukhumvit-Bold": ["Sukhumvit-Bold", "sans-serif"],
        "sukhumvit-SemiBold": ["Sukhumvit-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

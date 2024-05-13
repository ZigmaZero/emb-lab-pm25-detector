/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
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

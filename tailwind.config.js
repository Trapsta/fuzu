/** @type {import('tailwindcss').Config} */
const { darkTheme, lightTheme } = require("./src/styles/themes");
const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|card|image|switch|spinner).js",
  ],
  theme: {
    extend: {
      colors: {
        lightTheme: lightTheme,
        darkTheme: darkTheme,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

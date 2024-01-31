/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  "./node_modules/tw-elements/dist/js/**/*.js",
  "./node_modules/tw-elements-react/dist/js/**/*.js"],
  
  
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio"),("tw-elements/dist/plugin.cjs"), ("tw-elements-react/dist/plugin.cjs")],
  darkMode: "false"
};


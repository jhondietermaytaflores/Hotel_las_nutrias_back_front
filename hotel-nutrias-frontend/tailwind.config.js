// tailwind.config.js
//module.exports = {
//  content: [
//    "./index.html", // Esto asegura que tailwind analice el HTML de Vite
//    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos tus archivos JS/JSX/TS/TSX
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//};
//


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


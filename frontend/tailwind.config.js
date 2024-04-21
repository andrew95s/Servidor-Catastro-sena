/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/components/Notificaciones/**/*.{js,jsx}",
      "./src/pages/Notificaciones/**/*.{js,ts,jsx,tsx}",
      "./src/components/BackButton.jsx",
      "./src/components/Spinner.jsx",
      "./src/input.css",
    ],
    // ... resto de la configuración
  
  theme: {
    extend: {},
  },
  plugins: [],
}
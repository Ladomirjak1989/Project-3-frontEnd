/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./assets/signuploginbackground.jpg')",
        'navbar': "url('./assets/navbarbg.png')",
      }
    },
    
  },
  plugins: [],
}



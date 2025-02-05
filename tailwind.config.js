/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: ['hover'], // Додайте hover для кольору фону
      backgroundImage: {
        'hero-pattern': "url('./assets/signuploginbackground.jpg')",
        'navbar': "url('./assets/navbarbg.png')",
      },
      important: true, // Пріоритет Tailwind стилів
      
    },
    
  },
  plugins: [],
}



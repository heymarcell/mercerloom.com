/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'worksans': ['Work Sans', 'sans-serif'],
      },
      colors: {
        accent: '#9146FF', // Avid purple
        gray: {
          850: '#1e293b', // Custom gray between 800 (#1f2937) and 900 (#111827)
        },
      },
    },
  },
  plugins: [],
}

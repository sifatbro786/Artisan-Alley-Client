/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      'lora': ['Lora', 'serif'],
    },
    
    container: {
      center: true,
    },
    screens: {
      'sm': '380px',
      'md': '700px',
      'lg': '1240px',
    },

    extend: {},
  },


  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "synthwave"],
  },

}
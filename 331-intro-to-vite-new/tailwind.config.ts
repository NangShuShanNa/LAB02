import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite-vue/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      boxShadow:{
        'sp':'0 3px 12px 0 rgba(0, 0, 0, 0.2)'
      },
      fontFamily:{
        sans: ['Avenir','Helvetica','Arail','sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config


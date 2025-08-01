import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite-vue/**/*.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config


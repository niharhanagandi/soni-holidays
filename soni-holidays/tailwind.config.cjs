/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0EA5E9',
          dark: '#111827',
          gold: '#C8A24A',
        },
        base: {
          white: '#FFFFFF',
          black: '#0A0A0A',
          ink: '#1E1E1E',
          gray: '#F5F5F5',
        },
        accent: {
          sky: '#0EA5E9',
          rich: '#111827',
        },
        action: {
          hover: '#2563EB',
        },
      },
    },
  },
  plugins: [],
};
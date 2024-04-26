/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#076ae0',
        secondary: '#e3ebf7',
        success: '#14A44D',
        danger: '#DC4C64',
        warning: '#E4A11B',
        info: '#54B4D3',
        light: '#FBFBFB',
        dark: '#332D2D',
        muted: '#4b5563'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')]
};

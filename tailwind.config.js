/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        abel: ['Abel'],
        cabin: ['Cabin'],
        lexend: ['Lexend'],
        mulish: ['Mulish'],
        nunito: ['Nunito'],
        playfair: ['Playfair'],
        p: ['Cabin'],
        h: ['Playfair'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '40px', fontWeight: '400' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'p': ['16px', { lineHeight: '24px' }],
        'small': ['14px', { lineHeight: '20px' }],
      },
      colors: {
        primary: {
          mid: '#ebad7f',
          lighter: '#ffecd4',
          darker: '#734e32'
        },
        secondary: {
          mid: '#6d65ba',
          lighter: '#c2bdff',
          darker: '#312c63'
        },
        // white: "#f0f0f0",
        light: "#f5f2e9",
        dark: "#333333", //1b1b1b
        blackRgb: 'rgb(51, 51, 51)',
        gray: {
          mid: '#919191',
          lighter: '#dedede',
          darker: '#545454'
        },
        grayRgb: 'rgb(145, 145, 145)',
        gradientPrimary: ['#dbb68c', '#ffe1bf'],
        gradientSecondary: ['#6d65ba', '#9b93e6']
      },
    },
  },
  plugins: [],
};

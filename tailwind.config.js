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
        abel: ['Abel'], // Font par défaut
        cabin: ['Cabin'], // Font pour les titres
        lexend: ['Lexend'], // Font pour le code
        mulish: ['Mulish'], // Font pour le code
        nunito: ['Nunito'], // Font pour le code
      },
      // fontSize: {
      //   'heading-1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
      //   'heading-2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
      //   'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
      //   'body': ['16px', { lineHeight: '24px' }],
      //   'small': ['14px', { lineHeight: '20px' }],
      // },
      colors: {
        primary: {
          mid: '',
          lighter: '',
          darker: ''
        },
        secondary: {
          mid: '',
          lighter: '',
          darker: ''
        },
        white: "#fff",
        black: "#191919",
        blackRgb: 'rgb(252, 229, 187)',
        gray: {
          mid: '',
          lighter: '',
          darker: ''
        },
        grayRgb: 'rgb(252, 229, 187)'
      },
    },
  },
  plugins: [],
};

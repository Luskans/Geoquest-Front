/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./app/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         'primary': {
//           DEFAULT: '#f7e76e',
//           light: '#f7efb2',
//           dark: '#e8cf13',
//         },
//         'custom': {
//           black: '#292929',
//           white: '#f5f5f5',
//           gray: {
//             DEFAULT: '#f5f5f5',
//             light: '#cccccc',
//             dark: '#707070',
//           },
//         },
//       },
//       fontSize: {
//         'paragraph': '16px',
//         'h1': '24px',
//         'h2': '20px',
//       },
//       fontFamily: {
//         'roboto': ['Roboto'],
//         'comic': ['Comic'],
//       },
//     },
//   },
//   plugins: [],
// }


module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Create a custom color that uses a CSS custom value
        primary: "#f7e76e",
        secondary: "#db4437",
        // white: "#f2f2f2",
        white: "#fff",
        black: "#141414",
      },
    },
  },
  plugins: [],
};


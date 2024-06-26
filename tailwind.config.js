/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{ts,tsx}",
    "./src/components/*.{ts,tsx}",
    "./src/components/ui/*.{ts,tsx}",
    "./src/pages/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      h1: ["18px", { fontWeight: "bold" }],
      h2: ["16px", { fontWeight: "bold" }],
      h3: ["14px", { fontWeight: "bold" }],
      p: ["14px", { fontWeight: "500" }],
      sm: ["12px", { fontWeight: "normal" }],
    },
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeOut: "fadeOut 4s ease-in-out",
      },
      boxShadow: {
        shadowRecordCard: "0px 4px 12px 0px rgba(0,0,0,0.12)",
        shadowFloatingButton: "0px 4px 4px 0px rgba(0,0,0,0.25);",
        shadowTabButton: "0px 3px 8px 0px rgba(0,0,0,0.12);",
        shadowSearchBar: "0px 10.44px 10.44px 0px rgba(0, 0, 0, 0.08);",
        shadowPhone: "-12.87px 25.75px 42.91px 0px rgba(1, 0, 35, 0.1);",
        shadowExcelBox: "0px 8px 30px 0px rgba(0, 0, 0, 0.25);",
      },
      backgroundImage: {
        phone: "url('./assets/image/phone.png')",
        background: "url('./assets/image/background.png')",
      },
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
      },
      colors: {
        gray0: "#E6E6E6",
        gray1: "#B3B3B3",
        gray2: "#808080",
        gray3: "#4C4C4C",
        gray4: "#191919",
        gray5: "#A6A6A6",
        gray6: "#FAFAFA",
        textGray1: "#191919",
        textGray2: "#B3B3B3",
        textGray3: "#FFFFFF",
        main: "#37A041",
        green0: "#DFE7DD",
        green1: "#B2D0AB",
        darkRed: "#EA000E",
        orange: "#EF9509",
        yellow: "#F8FFF0",
        kakao: "#FEE500",
        backgroundColor: "#F6F6F6",
      },
    },
  },
  plugins: [],
};

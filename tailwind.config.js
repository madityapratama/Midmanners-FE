import { mauve, violet, red, blackA, gray } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx,mdx}", "./App.jsx"],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
        ...gray,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
	  fontFamily: { // <--- Ini yang penting
        poppins: ['Poppins', 'sans-serif'], // Nama font yang diimpor dari Google Fonts
        calsans: ['"Cal Sans"', 'sans-serif'], // Nama font yang Anda definisikan di @font-face
      },
    },
  },
  plugins: [],
};

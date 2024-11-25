/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(25%)" },
          "50%": { transform: "translateX(75%)" },
        },
        dropdownEnter: {
          "0%": { opacity: "0", transform: "translateY(2px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "bounce-horizontal": "bounce-horizontal 2s infinite",
      },
    },
  },
  plugins: [],
};

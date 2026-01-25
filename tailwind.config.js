module.exports = {
  theme: {
    extend: {
      keyframes: {
        loadingMove: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(200%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "loading-move": "loadingMove 1.2s ease-in-out infinite",
      },
    },
  },
};

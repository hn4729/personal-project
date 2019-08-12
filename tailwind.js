module.exports = {
  theme: {
    extend: {},
    colors: {
      grey: "#36393F",
      darkgrey: "#2F3136",
      white: "#F8F8F8"
    },
    screens: {
      sm: { min: "0px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px" }
    }
  },
  variants: {
    outline: ["focus", "responsive", "hover"]
  },
  plugins: []
};

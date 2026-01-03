import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This covers everything in src
  ],
  theme: {
    extend: {
      colors: {
        axiom: {
          bg: "#0a0b0d",
          card: "#0E1114",
          border: "#1f2229",
          hover: "#15171b",
          primary: "#3b82f6",
          success: "#22c55e",
          danger: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
export default config;
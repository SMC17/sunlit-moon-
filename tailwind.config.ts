import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#F4EEE4",
          100: "#EBE3D4",
          200: "#DDD0B8",
          300: "#C9B48E",
          400: "#B08A5C",
        },
        ink: {
          DEFAULT: "#161412",
          muted: "#5C564D",
          faint: "#8A8276",
        },
        sea: {
          DEFAULT: "#1C4A54",
          deep: "#14363E",
          mist: "#D5E3E4",
          foam: "#EEF4F4",
        },
        copper: {
          DEFAULT: "#8F5338",
          pale: "#E6D0C2",
        },
        olive: {
          DEFAULT: "#4A5638",
          pale: "#DCE2D1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.2em",
      },
      maxWidth: {
        measure: "38rem",
        page: "74rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

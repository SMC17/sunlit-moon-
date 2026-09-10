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
          50: "#F3EFE4",
          100: "#E8E0D0",
          200: "#D9C49A",
          300: "#C4B089",
          400: "#A8946E",
        },
        ink: {
          DEFAULT: "#162238",
          muted: "#4A5A72",
          faint: "#7A8BA0",
        },
        cobalt: {
          DEFAULT: "#1F5FA8",
          deep: "#16345C",
        },
        pool: {
          DEFAULT: "#2EC4D4",
          deep: "#1A9EAD",
          glass: "#B9E8EE",
        },
        coral: {
          DEFAULT: "#F0A094",
        },
        indigo: {
          DEFAULT: "#162238",
          night: "#0E1828",
        },
        lacquer: {
          DEFAULT: "#1F5FA8",
        },
        sea: {
          DEFAULT: "#1F5FA8",
          deep: "#16345C",
          mist: "#C8DFF2",
          foam: "#F3EFE4",
        },
        copper: {
          DEFAULT: "#4A5A72",
          pale: "#E8E0D0",
        },
        olive: {
          DEFAULT: "#4A5A72",
          pale: "#E8E0D0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Futura", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        measure: "36.5rem",
        page: "76rem",
      },
      transitionDuration: {
        nagai: "320ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

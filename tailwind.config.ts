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
          50: "#F7F3EA",
          100: "#EFE9DD",
          200: "#E4DCCB",
          300: "#D1C6B0",
          400: "#B7A88C",
        },
        ink: {
          DEFAULT: "#1C1A17",
          muted: "#5A554C",
          faint: "#8A8478",
        },
        lacquer: {
          DEFAULT: "#6E1D1D",
        },
        sea: {
          DEFAULT: "#1C1A17",
          deep: "#1C1A17",
          mist: "#EFE9DD",
          foam: "#F7F3EA",
        },
        copper: {
          DEFAULT: "#5A554C",
          pale: "#E4DCCB",
        },
        olive: {
          DEFAULT: "#5A554C",
          pale: "#EFE9DD",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Times New Roman", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        sans: ["var(--font-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        measure: "36.5rem",
        page: "72rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

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
          50: "#F7F1E8",
          100: "#F1E8D8",
          200: "#E4D5BC",
          300: "#D2BB96",
          400: "#B8956A",
        },
        ink: {
          DEFAULT: "#1C1916",
          muted: "#5E574E",
          faint: "#8A8276",
        },
        sea: {
          DEFAULT: "#1F4E5A",
          deep: "#163842",
          mist: "#D7E6E8",
          foam: "#EEF5F5",
        },
        copper: {
          DEFAULT: "#9A5B3C",
          pale: "#E8D2C4",
        },
        olive: {
          DEFAULT: "#4F5D3A",
          pale: "#DDE3D0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
        wordmark: "0.02em",
      },
      maxWidth: {
        measure: "38rem",
        page: "72rem",
      },
      boxShadow: {
        hairline: "inset 0 0 0 1px rgba(28, 25, 22, 0.12)",
      },
      backgroundImage: {
        paper:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;

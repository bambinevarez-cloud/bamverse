import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#040408",
          900: "#080912",
          850: "#0E0E1B",
          800: "#151324",
        },
        wine: {
          950: "#1A0610",
          900: "#2B0B1B",
          800: "#44122C",
          700: "#631A40",
          600: "#862657",
        },
        rose: {
          dusty: "#C47C92",
          blush: "#E8B5C3",
          warm: "#F5D8E0",
          glow: "#FFB0C8",
        },
        candle: {
          light: "#FDF6ED",
          gold: "#EACCA4",
          amber: "#D5A86B",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"],
        mono: ["monospace"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { opacity: "0.6", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "100%": { opacity: "0.6", transform: "scale(0.98)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;

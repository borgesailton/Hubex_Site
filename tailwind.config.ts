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
        primary: {
          DEFAULT: "#245F98",
          dark: "#1D4E7D",
          light: "#2E7BC4",
        },
        accent: {
          DEFAULT: "#D9953C",
          light: "#E2A652",
          dark: "#BF7D2B",
        },
        hubex: {
          bg: "#F5F3EE",
          text: "#1F2937",
          muted: "#6B7280",
          border: "#E5E7EB",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1D4E7D 0%, #245F98 50%, #2E7BC4 100%)",
        "accent-gradient": "linear-gradient(135deg, #D9953C 0%, #E2A652 100%)",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
        "glow-primary": "0 0 20px rgba(36, 95, 152, 0.3)",
        "glow-accent": "0 0 20px rgba(217, 149, 60, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

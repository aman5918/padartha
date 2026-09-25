/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary accent — deep indigo
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8", // Dark mode luminous accent
          500: "#6366F1",
          600: "#4F46E5", // Light mode CTA
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        // Vedic Gold — sparse, Sanskrit/decorative use only
        gold: {
          300: "#FDE68A",
          400: "#F5C842",
          500: "#D4A843",
          600: "#B8912E",
        },
        // Dark surface elevation system
        surface: {
          canvas: "#000000",
          1: "#0C0C0E",
          2: "#111113",
          3: "#18181B",
        },
      },
      fontFamily: {
        // Prestigious editorial serif — headings & display
        serif: ["Playfair Display", "Georgia", "serif"],
        // Clean modern geometric sans — all body & UI copy
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        // Precision monospace — code, IDs, metrics
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "card-dark":
          "0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.6)",
        "card-light": "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        "primary-glow": "0 0 20px rgba(99,102,241,0.3)",
        "indigo-sm": "0 2px 8px rgba(79,70,229,0.25)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f4f2ec",
        muted: "#6f6b64",
        secondary: "#a8a49b",
        card: "#101010",
        "accent-brown": "#753b2d",
        "accent-blue": "#4050a7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
        dm: ["var(--font-dm-mono)", "Courier New", "monospace"],
        dmsans: [
          "var(--font-dm-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      transitionDuration: {
        400: "400ms",
      },
      minHeight: {
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};


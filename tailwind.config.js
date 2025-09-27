/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      theme: {
        colors: {
          primary: "#4338ca",
          "primary-hover": "#3730a3",
          accent: "#84cc16",
          secondary: "#334155",
          background: "#f8fafc",
          surface: "#ffffff",
          "text-primary": "#0f172a",
          "text-secondary": "#64748b",
          success: "#10b981",
          error: "#f43f5e",
          warning: "#fbbf24",
        },
        fontFamily: {
          heading: ["Inter", "Segoe UI", "sans-serif"],
          body: ["Roboto", "system-ui", "sans-serif"],
        },
        borderRadius: {
          DEFAULT: "0.75rem",
          full: "9999px",
        },
        boxShadow: {
          card: "0 4px 14px rgba(36, 54, 101, 0.08)",
        },
      },
    },
  },
  plugins: [],
};

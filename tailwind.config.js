/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        body: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.08)",
      },
      colors: {
        gold: {
          100: "#f6e9c9",
          200: "#e7c97b",
          300: "#c89a2a",
        },
      },
    },
  },
  plugins: [],
}

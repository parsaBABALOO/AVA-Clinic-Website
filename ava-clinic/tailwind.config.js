/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // اسکن دقیق تمام فایل‌های داخل پوشه app
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // اسکن دقیق تمام فایل‌های داخل پوشه components
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // اسکن فایل‌های کمکی در صورت استفاده از کلاس‌های پویا
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        dark: "#0F172A",      // Slate 900
        primary: "#0D9488",   // Teal 600
        accent: "#D97706",    // Amber 600
      },
    },
  },
  plugins: [],
};
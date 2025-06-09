import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'smooth-up-down': 'smoothUpDown 5s ease-in-out infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
      },
      keyframes: {
        smoothUpDown: {
          '0%, 100%': {
            transform: 'scaleX(-1) translateY(0)', // Horizontal flip and position at the start and end
          },
          '50%': {
            transform: 'scaleX(-1) translateY(-10px)', // Keep the flip and move it up at the midpoint
          },
        },
        breathing: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
          },
          '50%': {
            transform: 'scale(1.05) rotate(0deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

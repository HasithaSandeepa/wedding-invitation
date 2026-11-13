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
        parchment: {
          50: "#FDFAF3",
          100: "#F9F4E8",
          200: "#F5EEDF",
          300: "#EFE3CD",
          400: "#E5D4B8",
          DEFAULT: "#F5EEDF",
        },
        gold: {
          light: "#F7E7B4",
          champagne: "#E8D39E",
          primary: "#D8B45F",
          antique: "#B98A2F",
          deep: "#8C6420",
          bronze: "#6E4D16",
        },
        ink: {
          charcoal: "#302619",
          dark: "#453826",
          primary: "#5A4A33",
          muted: "#8A7A60",
          light: "#A8987E",
        },
        royal: {
          maroon: "#781B27",
          maroonDark: "#5C121D",
        },
      },
      fontFamily: {
        sinhala: ["var(--font-sinhala)", "Abhaya Libre", "serif"],
        sinhalaDisplay: ["var(--font-sinhala-heading)", "Yaldevi", "var(--font-sinhala)", "serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8D39E 0%, #D8B45F 35%, #B98A2F 70%, #8C6420 100%)",
        "gold-shimmer": "linear-gradient(90deg, #B98A2F 0%, #F5E5B8 50%, #B98A2F 100%)",
        "deep-gold": "linear-gradient(180deg, #8C6420 0%, #6E4D16 100%)",
        "card-ivory": "linear-gradient(180deg, rgba(255, 253, 248, 0.95) 0%, rgba(248, 242, 229, 0.95) 100%)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(216, 180, 95, 0.4)',
        'gold-sm': '0 4px 15px -3px rgba(140, 100, 32, 0.25)',
        'gold-md': '0 12px 30px -10px rgba(140, 100, 32, 0.35)',
        'gold-lg': '0 20px 45px -15px rgba(120, 86, 30, 0.45)',
        'card-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 0 15px rgba(185, 138, 47, 0.08)',
      },
      keyframes: {
        dustFall: {
          '0%': { transform: 'translateY(-10vh)' },
          '100%': { transform: 'translateY(115vh)' },
        },
        dustSway: {
          '0%': { transform: 'translateX(-12px) rotate(-15deg)' },
          '100%': { transform: 'translateX(12px) rotate(15deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
      animation: {
        'dust-fall': 'dustFall 20s linear infinite',
        'dust-sway': 'dustSway 6s ease-in-out infinite alternate',
        'shimmer': 'shimmer 8s infinite linear',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

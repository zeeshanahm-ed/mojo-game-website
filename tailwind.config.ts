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
        red: 'var(--color-red)',
        yellow: 'var(--color-yellow)',
        'light-blue': 'var(--color-light-blue)',
        blue: 'var(--color-blue)',
        'light-green': 'var(--color-light-green)',
        orange: 'var(--color-orange)',
        green: 'var(--color-green)',
        purple: 'var(--color-purple)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        'dark-gray': 'var(--color-dark-gray)',
        'light-gray': 'var(--color-light-gray)',
        'border-gray': 'var(--color-border-gray)',
      },
      fontFamily: {
        primary: ['var(--family-primary)', 'sans-serif'],
        inter: ['var(--family-inter)', 'sans-serif'],
        mont: ['var(--family--mont)', 'sans-serif'],
        bulletproof: ['var(--font-bulletproof)', 'sans-serif'],
        popfun: ['var(--font-popfun)', 'sans-serif'],
      },
      borderRadius: {
        base: 'var(--base-radius)',
      },
      screens: {
        xsm: '375px',
        sm: '480px',
        md: '768px',
        lg: '1092px',
        xl: '1280px',
        '2xl': '1440px',
        xl1520: '1520px', // 👈 Custom screen at 1520px: '1520px', // 👈 Custom screen at 1520px
        '3xl': '1700px',
        '4xl': '1920px',
      },
      spacing: {
        base: 'var(--base-spacing)',
      },
      fontSize: {
        base: 'var(--base-font-size)',
      },
      lineHeight: {
        base: 'var(--base-line-height)',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;

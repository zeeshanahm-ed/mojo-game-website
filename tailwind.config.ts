import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
        'dark-blue': 'var(--color-dark-blue)',
        blue: 'var(--color-blue)',
        'light-green': 'var(--color-light-green)',
        orange: 'var(--color-orange)',
        green: 'var(--color-green)',
        purple: 'var(--color-purple)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        'dark-gray': 'var(--color-dark-gray)',
        'fanta': 'var(--color-fanta)',
        'dark-orange': 'var(--color-dark-orange)',
        'dark-green': 'var(--color-dark-green)',
        'light-gray': 'var(--color-light-gray)',
        'border-gray': 'var(--color-border-gray)',
      },
      fontFamily: {
        primary: ['var(--font-popfun)', 'sans-serif'],
        secondary: ['var(--font-product_sans)', 'sans-serif'],
        bulletproof: ['var(--font-bulletproof)', 'sans-serif'],
      },
      borderRadius: {
        base: 'var(--base-radius)',
      },
      screens: {
        xsm: '410px',
        sm: '510px',
        "580px": '580px',// 👈 Custom screen at 580px: '580px', // 👈 Custom screen at 580px
        md: '900px',
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
  plugins: [
    require('daisyui'),
    plugin(({ addVariant, addUtilities }) => {
      // Custom Variants
      addVariant('path-stroke', ['&>g>g>line', '&>g>g>path', '&>g>g>rect', '&>g>path', '&>g>line']);
      addVariant('path-fill', ['&>g>g>line', '&>g>g>path', '&>g>g>rect', '&>g>path', '&>g>line']);
      addVariant('select-svg', ['&>div>span>svg>g>path']);

      // Custom Utilities
      addUtilities({
        '.flex-centered': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.centered-xy': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      });
    }),
  ],
};
export default config;

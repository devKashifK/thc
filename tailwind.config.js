/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'electric-blue': '#4fc3f7',
        'neon-green': '#39ff14',
        'deep-purple': '#6200ea',
        'deep-navy': '#0c1023',
        'charcoal': '#1a1a2e',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        // Force dark mode styles when .dark class is present on html element
        'html.dark': { 
          'color-scheme': 'dark',
        },
        'html.dark body': {
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }
      })
    }
  ],
}; 
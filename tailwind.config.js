const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: [
      'bg-green-400',
      'bg-yellow-400',
      'bg-red-400',
      'bg-brand-400',
      'text-green-500',
      'text-yellow-500',
      'text-red-500',
      'text-brand-500',
      'text-green-600',
      'text-yellow-600',
      'text-red-600',
      'text-brand-600',
      'text-green-700',
      'text-yellow-700',
      'text-red-700',
      'text-brand-700',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        panel: '#111827',
        accent: '#7C3AED',
        soft: '#E5E7EB',
      },
    },
  },
  plugins: [],
};

export default config;

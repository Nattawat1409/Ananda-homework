/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ananda: {
          blue: '#1E40AF',
          dark: '#0A0A0A',
          yellow: '#FDE047',
          muted: '#6B7280',
          border: '#E5E7EB',
          ink: '#111827',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

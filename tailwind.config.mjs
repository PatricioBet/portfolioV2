/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'background': '#f8fafc',
        'foreground': '#1e293b',
        'primary': '#3b82f6',
        'primary-hover': '#2563eb',
        'accent': '#8b5cf6',
        'card': '#ffffff',
        'card-foreground': '#1e293b',
        'muted': '#94a3b8',
        'border': '#e2e8f0',
        // Dark mode
        'dark-background': '#0f172a',
        'dark-foreground': '#e2e8f0',
        'dark-primary': '#60a5fa',
        'dark-primary-hover': '#93bbfd',
        'dark-accent': '#a78bfa',
        'dark-card': '#1e293b',
        'dark-card-foreground': '#e2e8f0',
        'dark-muted': '#64748b',
        'dark-border': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

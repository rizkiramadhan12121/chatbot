/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#0F0F23',
          secondary: '#1A1A2E',
          tertiary: '#16213E',
          accent: '#0F3460',
          neon: '#00D4FF',
          purple: '#8B5CF6',
          pink: '#EC4899',
          green: '#10B981',
          orange: '#F59E0B',
          red: '#EF4444',
          'dark-bg': '#0A0A0A',
          'dark-surface': '#111111',
          'dark-border': '#1F1F1F',
          'dark-text': '#E5E5E5',
          'dark-muted': '#9CA3AF',
        },
        gradient: {
          'cyber-primary': 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
          'cyber-accent': 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #EC4899 100%)',
          'cyber-dark': 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #1A1A2E 100%)',
          'neon-purple': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          'neon-blue': 'linear-gradient(135deg, #00D4FF 0%, #0F3460 100%)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'cyber-flow': 'cyberFlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF' },
          '100%': { boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        neonPulse: {
          '0%': { textShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF' },
          '100%': { textShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF' },
        },
        cyberFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'cyber': '0 4px 20px rgba(0, 212, 255, 0.1)',
        'cyber-lg': '0 8px 40px rgba(0, 212, 255, 0.15)',
        'neon': '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
        'cyber-radial': 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
      },
      backgroundSize: {
        'cyber-grid': '20px 20px',
      }
    },
  },
  plugins: [],
}

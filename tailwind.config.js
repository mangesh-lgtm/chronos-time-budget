/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#bf00ff',
          pink: '#ff0090',
          green: '#00ff41',
          blue: '#0080ff',
          yellow: '#ffff00',
        },
        cyber: {
          dark: '#020010',
          darker: '#010008',
          card: 'rgba(0,20,40,0.6)',
          border: 'rgba(0,245,255,0.2)',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'border-run': 'borderRun 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
          '50%': { boxShadow: '0 0 10px #bf00ff, 0 0 30px #bf00ff, 0 0 60px #bf00ff' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 1 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.4 },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        borderRun: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '400% 0%' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f5ff, 0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.3)',
        'neon-purple': '0 0 5px #bf00ff, 0 0 20px #bf00ff, 0 0 40px rgba(191,0,255,0.3)',
        'neon-pink': '0 0 5px #ff0090, 0 0 20px #ff0090, 0 0 40px rgba(255,0,144,0.3)',
        'neon-green': '0 0 5px #00ff41, 0 0 20px #00ff41, 0 0 40px rgba(0,255,65,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      }
    },
  },
  plugins: [],
}

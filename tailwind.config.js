/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#12151A',
        'bg-elevated': '#181D24',
        'bg-panel': '#1F252D',
        'bg-panel-2': '#242B34',
        border: {
          DEFAULT: '#2B323C',
          strong: '#3A4250',
        },
        ink: {
          primary: '#F4F1EA',
          secondary: '#8D95A3',
          tertiary: '#5B6472',
        },
        amber: {
          DEFAULT: '#FFB020',
          dim: '#8A611D',
          bright: '#FFC65C',
        },
        signal: '#5EEAD4',
        coral: '#FF6B5E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'needle-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'check-pop': {
          '0%': { transform: 'scale(0.7)' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'needle-in': 'needle-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'ticker': 'ticker 22s linear infinite',
        'float-soft': 'float-soft 6s ease-in-out infinite',
        'check-pop': 'check-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'dot-bounce': 'dot-bounce 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

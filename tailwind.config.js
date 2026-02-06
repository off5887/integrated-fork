/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // ← 이 줄이 핵심! src 안 모든 파일 스캔
  ],
  theme: {
    extend: {
      // 여기서 커스텀 애니메이션 등록
      animation: {
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
        },
      },
    },
  },
  plugins: [],
}

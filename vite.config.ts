import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // /api/* → http://localhost:8080/api/*
      // 같은 오리진으로 프록시하면 CORS·쿠키 문제가 동시에 해결됩니다.
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    css: false,
    server: {
      deps: {
        // Windows 파일 핸들 제한 방지: MUI icons를 번들링해서 로드
        inline: ['@mui/icons-material'],
      },
    },
  },
})

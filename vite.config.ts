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

// vite.config.ts (기본으로 돌아가게)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // root: './src'  ← 이런 거 있으면 주석 or 삭제
  // base: '/something'  ← 이것도 삭제
})

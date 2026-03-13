import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'], // React 17+ — import React 불필요
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig, // Prettier와 충돌하는 ESLint 포맷 규칙 비활성화
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // TypeScript가 prop 타입을 보장하므로 불필요
      'react/prop-types': 'off',
      // 배열 인덱스를 key로 쓰면 재정렬 시 버그 유발
      'react/no-array-index-key': 'warn',
      // any 사용 시 경고 (CLAUDE.md: "any 사용 금지" 컨벤션과 일치)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Context 파일은 Provider + hook을 같이 export하는 패턴 허용 (HMR 영향 없음)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])

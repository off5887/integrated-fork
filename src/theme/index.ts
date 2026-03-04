// src/theme/index.ts
import { createTheme, Theme } from '@mui/material/styles'

// ─────────────────────────────────────────────────────────────
// Light Palette (로그인 페이지와 거의 동일한 sky-blue 모던/차분 느낌 유지)
// ─────────────────────────────────────────────────────────────
export const lightPalette = {
  bgBase: '#f8fafc',
  bgGradientFrom: '#f8fafc',
  bgGradientTo: '#e2e8f0', // 부드러운 하늘~구름 톤 (로그인과 동일 방향)

  cardBg: 'rgba(255, 255, 255, 0.92)', // 살짝 투명도 높여 glassmorphism 느낌 강화
  cardBorder: 'rgba(203, 213, 225, 0.55)',
  cardItemBg: 'rgba(241, 245, 249, 0.90)',
  cardItemHoverBg: 'rgba(226, 232, 240, 0.98)',

  textPrimary: '#0f172a',
  textSecondary: '#8793a3', // 로그인 페이지 secondary와 비슷하게 조정

  primary: {
    main: '#0ea5e9', // 로그인 페이지와 완전히 동일
    light: '#38bdf8',
    dark: '#0284c7',
  },

  gom: {
    imageBorder: '#0ea5e9',
    imageShadow: 'rgba(14, 165, 233, 0.25)', // glow 강도 살짝 줄여 차분함 유지
    glowStart: 'rgba(14, 165, 233, 0.28)',
    levelTextStart: '#2563eb', // gradient 시작을 조금 더 진하게 → 품질 ↑
    levelTextEnd: '#0ea5e9',
    progressBg: 'rgba(14, 165, 233, 0.12)',
    progressStart: '#0ea5e9',
    progressEnd: '#0284c7',
  },

  shadow: {
    soft: 'rgba(0, 0, 0, 0.09)',
    primary: 'rgba(2, 132, 199, 0.28)',
    color: 'rgba(0, 0, 0, 0.12)',
  },

  toggle: {
    bg: 'rgba(255, 255, 255, 0.85)', // 로그인 페이지와 동일하게
    hoverBg: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(203, 213, 225, 0.65)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    hoverShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },

  // holographic glow (light에서는 거의 안 쓰지만 일관성 위해 준비)
  holographicGlow:
    '0 0 16px rgba(14,165,233,0.08), 0 0 32px rgba(59,130,246,0.05)',
} as const

// ─────────────────────────────────────────────────────────────
// Dark Palette (Holographic HUD 느낌 강화 + 네온 과하지 않게)
// 로그인 페이지의 cyan 계열(#38bdf8 ~ #60a5fa ~ #93c5fd)과 톤 맞춤
// ─────────────────────────────────────────────────────────────
export const darkPalette = {
  bgBase: '#0b121f', // 조금 더 깊은 midnight blue → HUD 느낌 ↑
  bgGradientFrom: '#0f172a',
  bgGradientTo: '#1e293b', // 로그인 페이지와 동일 그라데이션

  cardBg: 'rgba(30, 41, 59, 0.68)', // 투명도 크게 높여 glassmorphism 핵심 강화
  cardBorder: 'rgba(96, 165, 250, 0.20)', // 은은한 cyan border glow
  cardItemBg: 'rgba(51, 65, 85, 0.58)',
  cardItemHoverBg: 'rgba(71, 85, 105, 0.78)',

  textPrimary: '#f1f5f9',
  textSecondary: '#a8b2c0', // 로그인 페이지와 동일

  primary: {
    main: '#60a5fa', // ← 핵심 변경: #38bdf8보다 덜 네온, 더 HUD/은은한 cyan
    light: '#93c5fd', // 하이라이트·hover용 밝은 cyan
    dark: '#3b82f6', // pressed·강조용
  },

  gom: {
    imageBorder: '#60a5fa',
    imageShadow: 'rgba(96, 165, 250, 0.32)', // glow 살짝 강하게 → holographic 느낌
    glowStart: 'rgba(96, 165, 250, 0.24)',
    levelTextStart: '#93c5fd', // holographic gradient 시작 (밝게)
    levelTextEnd: '#60a5fa',
    progressBg: 'rgba(96, 165, 250, 0.14)',
    progressStart: '#60a5fa',
    progressEnd: '#3b82f6',
  },

  shadow: {
    soft: 'rgba(0, 0, 0, 0.65)',
    primary: 'rgba(96, 165, 250, 0.28)', // cyan 계열 shadow로 통일
    color: 'rgba(0, 0, 0, 0.55)',
  },

  toggle: {
    bg: 'rgba(30, 41, 59, 0.78)', // 로그인과 동일
    hoverBg: 'rgba(51, 65, 85, 0.92)',
    border: 'rgba(96, 165, 250, 0.22)',
    shadow: '0 4px 24px rgba(0,0,0,0.45)',
    hoverShadow: '0 8px 40px rgba(96,165,250,0.18)', // 은은 cyan glow 추가
  },

  // dark 모드에서 자주 쓸 holographic glow (box-shadow 등에 활용 추천)
  holographicGlow:
    '0 0 20px rgba(96,165,250,0.14), 0 0 40px rgba(59,130,246,0.10)',
} as const

// 타입 정의 (기존 그대로)
export type AppPalette = typeof lightPalette

// ─────────────────────────────────────────────────────────────
// MUI 테마 생성 (커스텀 팔레트 확장 유지)
// ─────────────────────────────────────────────────────────────
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: lightPalette.primary,
    background: {
      default: lightPalette.bgBase,
      paper: lightPalette.cardBg,
    },
    text: {
      primary: lightPalette.textPrimary,
      secondary: lightPalette.textSecondary,
    },
    // 커스텀 확장
    gom: lightPalette.gom,
    toggle: lightPalette.toggle,
    card: {
      bg: lightPalette.cardBg,
      border: lightPalette.cardBorder,
      itemBg: lightPalette.cardItemBg,
      itemHoverBg: lightPalette.cardItemHoverBg,
    },
    shadow: lightPalette.shadow,
    holographicGlow: lightPalette.holographicGlow,
  },
})

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: darkPalette.primary,
    background: {
      default: darkPalette.bgBase,
      paper: darkPalette.cardBg,
    },
    text: {
      primary: darkPalette.textPrimary,
      secondary: darkPalette.textSecondary,
    },
    gom: darkPalette.gom,
    toggle: darkPalette.toggle,
    card: {
      bg: darkPalette.cardBg,
      border: darkPalette.cardBorder,
      itemBg: darkPalette.cardItemBg,
      itemHoverBg: darkPalette.cardItemHoverBg,
    },
    shadow: darkPalette.shadow,
    holographicGlow: darkPalette.holographicGlow,
  },
})

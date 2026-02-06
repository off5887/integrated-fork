// src/theme/index.ts
import { createTheme, Theme } from '@mui/material/styles'

// lightPalette & darkPalette 정의 (colors.ts 내용 그대로 옮김)
export const lightPalette = {
  bgBase: '#f8fafc',
  bgGradientFrom: '#f8fafc',
  bgGradientTo: '#e2e8f0',
  cardBg: 'rgba(255, 255, 255, 0.94)',
  cardBorder: 'rgba(203, 213, 225, 0.65)',
  cardItemBg: 'rgba(241, 245, 249, 0.88)',
  cardItemHoverBg: 'rgba(226, 232, 240, 0.98)',
  textPrimary: '#0f172a',
  textSecondary: '#334155',
  primary: {
    main: '#0ea5e9',
    dark: '#0284c7',
    light: '#3b82f6',
  },
  gom: {
    imageBorder: '#0ea5e9',
    imageShadow: 'rgba(14, 165, 233, 0.28)',
    glowStart: 'rgba(14, 165, 233, 0.3)',
    levelTextStart: '#0ea5e9',
    levelTextEnd: '#0284c7',
    progressBg: 'rgba(14, 165, 233, 0.15)',
    progressStart: '#0ea5e9',
    progressEnd: '#0284c7',
  },
  shadow: {
    soft: 'rgba(0, 0, 0, 0.09)',
    primary: 'rgba(2, 132, 199, 0.28)',
    color: 'rgba(0, 0, 0, 0.12)',
  },
  toggle: {
    bg: 'rgba(255, 255, 255, 0.9)',
    hoverBg: 'rgba(255, 255, 255, 1)',
    border: 'rgba(203, 213, 225, 0.65)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
    hoverShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  },
} as const

export const darkPalette = {
  bgBase: '#0f172a',
  bgGradientFrom: '#0f172a',
  bgGradientTo: '#1e293b',
  cardBg: 'rgba(30, 41, 59, 0.94)',
  cardBorder: 'rgba(59, 74, 104, 0.45)',
  cardItemBg: 'rgba(51, 65, 85, 0.65)',
  cardItemHoverBg: 'rgba(71, 85, 105, 0.90)',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  primary: {
    main: '#7dd3fc',
    dark: '#38bdf8',
    light: '#60a5fa',
  },
  gom: {
    imageBorder: '#7dd3fc',
    imageShadow: 'rgba(125, 211, 252, 0.35)',
    glowStart: 'rgba(125, 211, 252, 0.35)',
    levelTextStart: '#7dd3fc',
    levelTextEnd: '#38bdf8',
    progressBg: 'rgba(125, 211, 252, 0.18)',
    progressStart: '#7dd3fc',
    progressEnd: '#38bdf8',
  },
  shadow: {
    soft: 'rgba(0, 0, 0, 0.65)',
    primary: 'rgba(125, 211, 252, 0.35)',
    color: 'rgba(0, 0, 0, 0.55)',
  },
  toggle: {
    bg: 'rgba(30, 41, 59, 0.75)',
    hoverBg: 'rgba(51, 65, 85, 0.95)',
    border: 'rgba(148, 163, 184, 0.28)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
    hoverShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  },
} as const

export type AppPalette = typeof lightPalette

// MUI 테마 생성
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
  },
})

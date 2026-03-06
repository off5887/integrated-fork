// src/theme/gomTheme.ts
import { createTheme, Theme } from '@mui/material/styles'

// ─────────────────────────────────────────────────────────────
// Light Palette (sky-blue 모던 + 차분한 느낌 유지)
// ─────────────────────────────────────────────────────────────
export const lightPalette = {
  bgBase: '#f8fafc',
  bgGradientFrom: '#f8fafc',
  bgGradientTo: '#e2e8f0',

  cardBg: 'rgba(255, 255, 255, 0.92)',
  cardBorder: 'rgba(203, 213, 225, 0.55)',
  cardItemBg: 'rgba(241, 245, 249, 0.90)',
  cardItemHoverBg: 'rgba(226, 232, 240, 0.98)',

  textPrimary: '#0f172a',
  textSecondary: '#64748b', // NewIdea와 동일

  primary: {
    main: '#6366f1', // indigo-500 (레벨1 기본)
    light: '#818cf8',
    dark: '#4f46e5',
  },

  // 레벨별 accent 색상 (SelectedReviewersPanel과 동일하게 유지)
  level: {
    1: {
      accent: '#6366f1',
      bg: 'rgba(99,102,241,0.04)',
      border: 'rgba(99,102,241,0.2)',
      avatarBg: 'rgba(99,102,241,0.12)',
      avatarColor: '#4338ca',
      badgeBg: 'rgba(99,102,241,0.08)',
      badgeColor: '#4338ca',
    },
    2: {
      accent: '#8b5cf6',
      bg: 'rgba(139,92,246,0.04)',
      border: 'rgba(139,92,246,0.2)',
      avatarBg: 'rgba(139,92,246,0.12)',
      avatarColor: '#6d28d9',
      badgeBg: 'rgba(139,92,246,0.08)',
      badgeColor: '#6d28d9',
    },
    3: {
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.04)',
      border: 'rgba(245,158,11,0.2)',
      avatarBg: 'rgba(245,158,11,0.1)',
      avatarColor: '#92400e',
      badgeBg: 'rgba(245,158,11,0.07)',
      badgeColor: '#92400e',
    },
  },

  gom: {
    imageBorder: '#6366f1',
    imageShadow: 'rgba(99,102,241,0.25)',
    glowStart: 'rgba(99,102,241,0.28)',
    levelTextStart: '#4f46e5',
    levelTextEnd: '#a78bfa',
    progressBg: 'rgba(99,102,241,0.12)',
    progressStart: '#6366f1',
    progressEnd: '#4f46e5',
  },

  shadow: {
    soft: 'rgba(0, 0, 0, 0.09)',
    primary: 'rgba(99,102,241,0.28)',
    color: 'rgba(0, 0, 0, 0.12)',
  },

  toggle: {
    bg: 'rgba(255, 255, 255, 0.85)',
    hoverBg: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(203, 213, 225, 0.65)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    hoverShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },

  holographicGlow:
    '0 0 16px rgba(99,102,241,0.08), 0 0 32px rgba(139,92,246,0.05)',
} as const

// ─────────────────────────────────────────────────────────────
// Dark Palette (Holographic HUD 느낌, cyan/neon 과하지 않게)
// ─────────────────────────────────────────────────────────────
export const darkPalette = {
  bgBase: '#0b121f',
  bgGradientFrom: '#0f172a',
  bgGradientTo: '#1e293b',

  cardBg: 'rgba(30, 41, 59, 0.68)',
  cardBorder: 'rgba(99,102,241,0.20)',
  cardItemBg: 'rgba(51, 65, 85, 0.58)',
  cardItemHoverBg: 'rgba(71, 85, 105, 0.78)',

  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',

  primary: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
  },

  // 레벨별 accent 색상 (SelectedReviewersPanel과 동일)
  level: {
    1: {
      accent: '#6366f1',
      bg: 'rgba(99,102,241,0.08)',
      border: 'rgba(99,102,241,0.3)',
      avatarBg: 'rgba(99,102,241,0.2)',
      avatarColor: '#c7d2fe',
      badgeBg: 'rgba(99,102,241,0.15)',
      badgeColor: '#a5b4fc',
    },
    2: {
      accent: '#8b5cf6',
      bg: 'rgba(139,92,246,0.08)',
      border: 'rgba(139,92,246,0.3)',
      avatarBg: 'rgba(139,92,246,0.2)',
      avatarColor: '#ddd6fe',
      badgeBg: 'rgba(139,92,246,0.15)',
      badgeColor: '#c4b5fd',
    },
    3: {
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.3)',
      avatarBg: 'rgba(245,158,11,0.15)',
      avatarColor: '#fde68a',
      badgeBg: 'rgba(245,158,11,0.12)',
      badgeColor: '#fbbf24',
    },
  },

  gom: {
    imageBorder: '#6366f1',
    imageShadow: 'rgba(99,102,241,0.32)',
    glowStart: 'rgba(99,102,241,0.24)',
    levelTextStart: '#a78bfa',
    levelTextEnd: '#6366f1',
    progressBg: 'rgba(99,102,241,0.14)',
    progressStart: '#6366f1',
    progressEnd: '#4f46e5',
  },

  shadow: {
    soft: 'rgba(0, 0, 0, 0.65)',
    primary: 'rgba(99,102,241,0.28)',
    color: 'rgba(0, 0, 0, 0.55)',
  },

  toggle: {
    bg: 'rgba(30, 41, 59, 0.78)',
    hoverBg: 'rgba(51, 65, 85, 0.92)',
    border: 'rgba(99,102,241,0.22)',
    shadow: '0 4px 24px rgba(0,0,0,0.45)',
    hoverShadow: '0 8px 40px rgba(99,102,241,0.18)',
  },

  holographicGlow:
    '0 0 20px rgba(99,102,241,0.14), 0 0 40px rgba(139,92,246,0.10)',
} as const

// ─────────────────────────────────────────────────────────────
// MUI 테마 생성 함수
// ─────────────────────────────────────────────────────────────
export const createGomTheme = (mode: 'light' | 'dark'): Theme => {
  const palette = mode === 'light' ? lightPalette : darkPalette

  return createTheme({
    palette: {
      mode,
      primary: palette.primary,
      background: {
        default: palette.bgBase,
        paper: palette.cardBg,
      },
      text: {
        primary: palette.textPrimary,
        secondary: palette.textSecondary,
      },
      // 커스텀 네임스페이스
      gom: palette.gom,
      toggle: palette.toggle,
      card: {
        bg: palette.cardBg,
        border: palette.cardBorder,
        itemBg: palette.cardItemBg,
        itemHoverBg: palette.cardItemHoverBg,
      },
      shadow: palette.shadow,
      holographicGlow: palette.holographicGlow,
      // 레벨별 색상도 테마에 포함
      level: palette.level,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: `linear-gradient(135deg, ${palette.bgGradientFrom}, ${palette.bgGradientTo})`,
          },
        },
      },
    },
  })
}

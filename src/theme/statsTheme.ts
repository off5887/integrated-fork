// src/theme/statsTheme.ts
// Stats 페이지 전용 라이트/다크 팔레트

const statsLight = {
  // ── 배경 ──
  bgBase: '#f8fafc',
  bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  cardBg: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(241,245,249,0.92))',

  // ── 텍스트 ──
  textPrimary: '#0f172a',
  textSecondary: '#475569',

  // ── 강조 (스카이블루) ──
  primaryColor: '#0ea5e9',

  // ── 카드 ──
  cardBorder: 'rgba(0,0,0,0.08)',
  cardShadow: '0 6px 20px rgba(0,0,0,0.1)',
  cardHoverShadow: '0 16px 36px rgba(0,0,0,0.14)',

} as const

const statsDark = {
  // ── 배경 ──
  bgBase: '#0b121f',
  bgGradient: 'linear-gradient(135deg, #0b121f 0%, #1a2336 100%)',
  cardBg: 'linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.82))',

  // ── 텍스트 ──
  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',

  // ── 강조 (스카이블루) ──
  primaryColor: '#38bdf8',

  // ── 카드 ──
  cardBorder: 'rgba(255,255,255,0.12)',
  cardShadow: '0 6px 20px rgba(0,0,0,0.4)',
  cardHoverShadow: '0 16px 36px rgba(0,0,0,0.5)',
} as const

export type StatsTheme = typeof statsLight

export const getStatsTheme = (isDarkMode: boolean): StatsTheme =>
  isDarkMode ? (statsDark as unknown as StatsTheme) : statsLight

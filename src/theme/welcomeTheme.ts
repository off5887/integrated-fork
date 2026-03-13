// src/theme/welcomeTheme.ts
// Welcome 페이지 전용 라이트/다크 팔레트

const welcomeLight = {
  // ── 배경 ──
  bgBase: '#f1f5f9',
  cardBg: '#ffffff',
  featureCardBg: '#f8fafc',

  // ── 텍스트 ──
  textPrimary: '#0f172a',
  textSecondary: '#64748b',

  // ── 테두리 ──
  borderColor: 'rgba(203,213,225,0.5)',

  // ── 그림자 ──
  cardShadow: '0 4px 32px rgba(0,0,0,0.08)',
  cardShadowLarge: '0 8px 40px rgba(0,0,0,0.08)',

  // ── 강조 (인디고) ──
  accentColor: '#4338ca',
  accentBg: 'rgba(99,102,241,0.08)',
  accentBgLight: 'rgba(99,102,241,0.06)',
  accentBgSubtle: 'rgba(99,102,241,0.03)',
  accentBgVerySubtle: 'rgba(99,102,241,0.07)',
  accentBorder: 'rgba(99,102,241,0.2)',
  accentBorderSubtle: 'rgba(99,102,241,0.15)',
  accentBadgeText: '#4338ca',

  // ── 다크 모드 토글 버튼 ──
  toggleBg: 'rgba(255,255,255,0.9)',
  toggleBorder: 'rgba(203,213,225,0.6)',
  toggleShadow: '0 2px 12px rgba(0,0,0,0.1)',
  toggleHoverBg: 'rgba(255,255,255,0.98)',

  // ── 로그아웃 버튼 ──
  outlineButtonBorder: 'rgba(99,102,241,0.3)',
  outlineButtonColor: '#4338ca',

  // ── 배경 장식 ──
  orb1: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
  orb2: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
  orb3: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
  orb4: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
  orb5: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
  orb6: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',

  // ── 로고 테두리 ──
  logoBorder: 'rgba(99,102,241,0.35)',

  // ── 진행바 배경 ──
  progressBg: 'rgba(99,102,241,0.08)',

  // ── 남은 마일리지 강조색 ──
  remainColor: '#6366f1',

  // ── 피처카드 호버 테두리 ──
  featureHoverBorder: 'rgba(99,102,241,0.25)',
  featureHoverShadow: '0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.1)',

  // ── 번호 워터마크 ──
  numberWatermark: 'rgba(99,102,241,0.07)',

  // ── 아이콘 bg ──
  iconBg: 'rgba(99,102,241,0.08)',

  // ── 다이얼로그 ──
  dialogBg: '#f8fafc',
  dialogHeaderBg: '#ffffff',
  dialogShadow: '0 12px 48px rgba(0,0,0,0.14)',

  // ── 카드 이미지 섹션 배경 ──
  cardCurrentBg: 'rgba(99,102,241,0.06)',
  cardDefaultBg: 'rgba(99,102,241,0.03)',
  specialCardBg: 'rgba(99,102,241,0.04)',

  // ── 달성 여부 색 ──
  achievedColor: '#4338ca',

  // ── 현재 레벨 이름 색 ──
  currentLevelColor: '#4338ca',

  // ── 특별카드 이름 색 ──
  specialCardNameColor: '#4338ca',
} as const

const welcomeDark = {
  // ── 배경 ──
  bgBase: '#0a0f1e',
  cardBg: 'rgba(22,30,46,0.95)',
  featureCardBg: 'rgba(15,23,42,0.6)',

  // ── 텍스트 ──
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',

  // ── 테두리 ──
  borderColor: 'rgba(148,163,184,0.1)',

  // ── 그림자 ──
  cardShadow: '0 4px 32px rgba(0,0,0,0.5)',
  cardShadowLarge: '0 8px 40px rgba(0,0,0,0.5)',

  // ── 강조 (인디고) ──
  accentColor: '#a5b4fc',
  accentBg: 'rgba(99,102,241,0.15)',
  accentBgLight: 'rgba(99,102,241,0.12)',
  accentBgSubtle: 'rgba(99,102,241,0.05)',
  accentBgVerySubtle: 'rgba(99,102,241,0.12)',
  accentBorder: 'rgba(99,102,241,0.3)',
  accentBorderSubtle: 'rgba(99,102,241,0.25)',
  accentBadgeText: '#a5b4fc',

  // ── 다크 모드 토글 버튼 ──
  toggleBg: 'rgba(22,30,46,0.85)',
  toggleBorder: 'rgba(148,163,184,0.15)',
  toggleShadow: '0 4px 16px rgba(0,0,0,0.3)',
  toggleHoverBg: 'rgba(22,30,46,0.95)',

  // ── 로그아웃 버튼 ──
  outlineButtonBorder: 'rgba(99,102,241,0.4)',
  outlineButtonColor: '#a5b4fc',

  // ── 배경 장식 ──
  orb1: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
  orb2: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
  orb3: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)',
  orb4: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)',
  orb5: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
  orb6: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',

  // ── 로고 테두리 ──
  logoBorder: 'rgba(99,102,241,0.45)',

  // ── 진행바 배경 ──
  progressBg: 'rgba(99,102,241,0.12)',

  // ── 남은 마일리지 강조색 ──
  remainColor: '#c4b5fd',

  // ── 피처카드 호버 테두리 ──
  featureHoverBorder: 'rgba(99,102,241,0.35)',
  featureHoverShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15)',

  // ── 번호 워터마크 ──
  numberWatermark: 'rgba(99,102,241,0.1)',

  // ── 아이콘 bg ──
  iconBg: 'rgba(99,102,241,0.15)',

  // ── 다이얼로그 ──
  dialogBg: '#0d1526',
  dialogHeaderBg: 'rgba(22,30,46,0.95)',
  dialogShadow: '0 16px 60px rgba(0,0,0,0.7)',

  // ── 카드 이미지 섹션 배경 ──
  cardCurrentBg: 'rgba(99,102,241,0.12)',
  cardDefaultBg: 'rgba(99,102,241,0.05)',
  specialCardBg: 'rgba(99,102,241,0.08)',

  // ── 달성 여부 색 ──
  achievedColor: '#a5b4fc',

  // ── 현재 레벨 이름 색 ──
  currentLevelColor: '#a5b4fc',

  // ── 특별카드 이름 색 ──
  specialCardNameColor: '#a5b4fc',
} as const

export type WelcomeTheme = typeof welcomeLight

export const getWelcomeTheme = (isDarkMode: boolean): WelcomeTheme =>
  isDarkMode ? (welcomeDark as unknown as WelcomeTheme) : welcomeLight

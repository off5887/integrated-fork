// src/theme/errorTheme.ts
// 404 에러 페이지 전용 라이트/다크 팔레트

const errorLight = {
  // ── 배경 블롭 ──
  blobIndigo: '#4338ca',
  blobPurple: '#7c3aed',
  blobOpacity: 0.12,

  // ── 테마 토글 버튼 ──
  toggleBg: 'rgba(0,0,0,0.04)',
  toggleBorder: 'rgba(0,0,0,0.08)',
  toggleHoverBg: 'rgba(0,0,0,0.08)',

  // ── 배경 그리드 도트 ──
  gridDot: 'rgba(100,116,139,0.1)',

  // ── 이모지 그림자 ──
  emojiFilter: 'drop-shadow(0 4px 8px rgba(67,56,202,0.2))',

  // ── 404 숫자 그라디언트 ──
  gradient404: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 60%, #a21caf 100%)',

  // ── 구분선 그라디언트 ──
  dividerGradient: 'linear-gradient(90deg, #4338ca, #7c3aed)',

  // ── 이전 페이지 버튼 (outlined) ──
  outlinedBorder: 'rgba(67,56,202,0.3)',
  outlinedColor: '#4338ca',
  outlinedHoverBorder: '#4338ca',
  outlinedHoverBg: 'rgba(67,56,202,0.06)',

  // ── 대시보드 버튼 (contained) ──
  btnGradient: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
  btnColor: '#ffffff',
  btnShadow: '0 4px 14px rgba(67,56,202,0.3)',
  btnHoverGradient: 'linear-gradient(135deg, #3730a3 0%, #5b21b6 100%)',
  btnHoverShadow: '0 6px 20px rgba(67,56,202,0.4)',
} as const

const errorDark = {
  // ── 배경 블롭 ──
  blobIndigo: '#6366f1',
  blobPurple: '#a78bfa',
  blobOpacity: 0.18,

  // ── 테마 토글 버튼 ──
  toggleBg: 'rgba(255,255,255,0.06)',
  toggleBorder: 'rgba(255,255,255,0.1)',
  toggleHoverBg: 'rgba(255,255,255,0.12)',

  // ── 배경 그리드 도트 ──
  gridDot: 'rgba(148,163,184,0.07)',

  // ── 이모지 그림자 ──
  emojiFilter: 'drop-shadow(0 0 10px rgba(99,102,241,0.4))',

  // ── 404 숫자 그라디언트 ──
  gradient404: 'linear-gradient(135deg, #a5b4fc 0%, #c084fc 60%, #f0abfc 100%)',

  // ── 구분선 그라디언트 ──
  dividerGradient: 'linear-gradient(90deg, #6366f1, #a78bfa)',

  // ── 이전 페이지 버튼 (outlined) ──
  outlinedBorder: 'rgba(99,102,241,0.35)',
  outlinedColor: '#a5b4fc',
  outlinedHoverBorder: '#6366f1',
  outlinedHoverBg: 'rgba(99,102,241,0.1)',

  // ── 대시보드 버튼 (contained) ──
  btnGradient: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
  btnColor: '#ffffff',
  btnShadow: '0 4px 14px rgba(99,102,241,0.4)',
  btnHoverGradient: 'linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%)',
  btnHoverShadow: '0 6px 20px rgba(99,102,241,0.55)',
} as const

export type ErrorTheme = typeof errorLight

export const getErrorTheme = (isDarkMode: boolean): ErrorTheme =>
  isDarkMode ? errorDark : errorLight

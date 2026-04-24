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
}

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
}

export type ErrorTheme = typeof errorLight

export const getErrorTheme = (isDarkMode: boolean): ErrorTheme =>
  isDarkMode ? errorDark : errorLight

// ─── ErrorFallback (런타임 오류 바운더리) 전용 토큰 ──────────────────────────

export const getErrorFallbackTheme = (isDarkMode: boolean) => ({
  red:           isDarkMode ? '#ef4444' : '#dc2626',
  amber:         isDarkMode ? '#f97316' : '#ea580c',
  blobOpacity:   isDarkMode ? 0.16 : 0.1,
  gridDot:       isDarkMode ? 'rgba(148,163,184,0.07)' : 'rgba(100,116,139,0.1)',
  toggleBg:      isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  toggleBorder:  isDarkMode ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.08)',
  toggleHoverBg: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
  emojiFilter:   isDarkMode
    ? 'drop-shadow(0 0 10px rgba(239,68,68,0.4))'
    : 'drop-shadow(0 4px 8px rgba(220,38,38,0.2))',
  dividerGradient: isDarkMode
    ? 'linear-gradient(90deg, #ef4444, #f97316)'
    : 'linear-gradient(90deg, #dc2626, #ea580c)',
  errorBoxBorder:    isDarkMode ? 'rgba(239,68,68,0.2)'  : 'rgba(239,68,68,0.15)',
  errorHeaderBg:     isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)',
  errorHeaderBorder: isDarkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)',
  errorBodyBg:       isDarkMode ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.03)',
  errorTextColor:    isDarkMode ? '#fca5a5' : '#dc2626',
  errorMonoColor:    isDarkMode ? '#fca5a5' : '#b91c1c',
  outlinedBorder:    isDarkMode ? 'rgba(239,68,68,0.35)' : 'rgba(220,38,38,0.3)',
  outlinedColor:     isDarkMode ? '#fca5a5' : '#dc2626',
  outlinedHoverBorder: isDarkMode ? '#ef4444' : '#dc2626',
  outlinedHoverBg:   isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(220,38,38,0.06)',
  btnGradient:       isDarkMode
    ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
    : 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
  btnShadow:         isDarkMode
    ? '0 4px 14px rgba(239,68,68,0.4)'
    : '0 4px 14px rgba(220,38,38,0.3)',
  btnHoverGradient:  isDarkMode
    ? 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #c2410c 100%)',
  btnHoverShadow:    isDarkMode
    ? '0 6px 20px rgba(239,68,68,0.55)'
    : '0 6px 20px rgba(220,38,38,0.4)',
})

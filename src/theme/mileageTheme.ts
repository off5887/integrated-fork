// src/theme/mileageTheme.ts
// Mileage 페이지 전용 라이트/다크 팔레트

const mileageLight = {
  // ── 배경 ──
  cardBg: '#ffffff',
  cardBgMobile: '#ffffff',
  inputBg: '#f8fafc',
  filterBg: 'rgba(248,250,252,0.9)',
  headBg: 'rgba(248,250,252,0.9)',

  // ── 텍스트 ──
  textPrimary: '#0f172a',
  textSecondary: '#64748b',

  // ── 테두리 ──
  borderColor: 'rgba(203,213,225,0.5)',
  borderColorStrict: 'rgba(203,213,225,0.5)',
  inputBorderColor: 'rgba(203,213,225,0.7)',
  inputHoverBorder: 'rgba(148,163,184,0.5)',

  // ── 그림자 ──
  cardShadow: '0 2px 12px rgba(0,0,0,0.05)',
  cardShadowLarge: '0 2px 16px rgba(0,0,0,0.05)',
  mobileShadow: '0 2px 8px rgba(0,0,0,0.04)',
  mobileShadowHover: '0 8px 24px rgba(0,0,0,0.08)',

  // ── 강조 (보라) ──
  cashAmountColor: '#7c3aed',

  // ── 호버 행 ──
  rowHoverBg: 'rgba(248,250,252,0.8)',

  // ── 통계카드 ──
  statCardBg: 'rgba(255,255,255,0.97)',
  statCardBorder: 'rgba(226,232,240,0.8)',
  statCardShadow: '0 2px 12px rgba(0,0,0,0.05)',
  statCardHoverShadow: '0 8px 24px rgba(0,0,0,0.08)',

  // ── 환전 dialog ──
  dialogBg: '#ffffff',
  dialogShadow: '0 24px 48px rgba(0,0,0,0.12)',
  backdropBg: 'rgba(0,0,0,0.3)',

  // ── 보유 마일리지 박스 ──
  mileageBoxBg: 'rgba(99,102,241,0.05)',
  mileageBoxBorder: 'rgba(99,102,241,0.14)',

  // ── 경고 박스 ──
  warningBoxBg: 'rgba(239,68,68,0.04)',
  warningBoxBorder: 'rgba(239,68,68,0.1)',
  warningTextColor: '#dc2626',

  // ── 비활성 버튼 ──
  disabledBtnBg: 'rgba(99,102,241,0.1)',
  disabledBtnColor: 'rgba(99,102,241,0.35)',

  // ── Primary 버튼 & 브랜드 색상 (light/dark 동일) ─────────────────────────
  primaryColor:           '#6366f1',
  primaryHoverBg:         '#4f46e5',
  primaryBtnColor:        '#fff',
  primaryBtnHoverShadow:  '0 4px 16px rgba(99,102,241,0.3)',
  accentGradient:         'linear-gradient(90deg, #6366f1, #8b5cf6)',
  modalIconBg:            '#6366f1',
  modalIconColor:         '#fff',
  inputFocusColor:        '#6366f1',
  inputFocusHoverBorder:  'rgba(99,102,241,0.35)',
  helperTextSuccessColor: '#10b981',

  // ── 상태 배지 색상 (light/dark 동일) ────────────────────────────────────
  statusSuccessColor:  '#10b981',
  statusSuccessBg:     '#10b98112',
  statusSuccessBorder: '#10b98128',
  statusWarningColor:  '#f59e0b',
  statusWarningBg:     '#f59e0b12',
  statusWarningBorder: '#f59e0b28',
  statusErrorColor:    '#ef4444',
  statusErrorBg:       '#ef444412',
  statusErrorBorder:   '#ef444428',
} as const

const mileageDark = {
  // ── 배경 ──
  cardBg: 'rgba(22,30,46,0.92)',
  cardBgMobile: 'rgba(22,30,46,0.92)',
  inputBg: 'rgba(15,23,42,0.5)',
  filterBg: 'rgba(148,163,184,0.04)',
  headBg: 'rgba(148,163,184,0.06)',

  // ── 텍스트 ──
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',

  // ── 테두리 ──
  borderColor: 'rgba(148,163,184,0.1)',
  borderColorStrict: 'rgba(148,163,184,0.12)',
  inputBorderColor: 'rgba(148,163,184,0.18)',
  inputHoverBorder: 'rgba(148,163,184,0.35)',

  // ── 그림자 ──
  cardShadow: '0 2px 16px rgba(0,0,0,0.3)',
  cardShadowLarge: '0 2px 16px rgba(0,0,0,0.3)',
  mobileShadow: '0 2px 12px rgba(0,0,0,0.25)',
  mobileShadowHover: '0 8px 24px rgba(0,0,0,0.4)',

  // ── 강조 (보라) ──
  cashAmountColor: '#c4b5fd',

  // ── 호버 행 ──
  rowHoverBg: 'rgba(99,102,241,0.04)',

  // ── 통계카드 ──
  statCardBg: 'rgba(22,30,46,0.92)',
  statCardBorder: 'rgba(148,163,184,0.1)',
  statCardShadow: '0 2px 16px rgba(0,0,0,0.3)',
  statCardHoverShadow: '0 8px 24px rgba(0,0,0,0.4)',

  // ── 환전 dialog ──
  dialogBg: 'rgba(22,30,46,0.98)',
  dialogShadow: '0 24px 48px rgba(0,0,0,0.5)',
  backdropBg: 'rgba(0,0,0,0.55)',

  // ── 보유 마일리지 박스 ──
  mileageBoxBg: 'rgba(99,102,241,0.08)',
  mileageBoxBorder: 'rgba(99,102,241,0.18)',

  // ── 경고 박스 ──
  warningBoxBg: 'rgba(239,68,68,0.07)',
  warningBoxBorder: 'rgba(239,68,68,0.15)',
  warningTextColor: '#fca5a5',

  // ── 비활성 버튼 ──
  disabledBtnBg: 'rgba(99,102,241,0.15)',
  disabledBtnColor: 'rgba(255,255,255,0.25)',

  // ── Primary 버튼 & 브랜드 색상 (light/dark 동일) ─────────────────────────
  primaryColor:           '#6366f1',
  primaryHoverBg:         '#4f46e5',
  primaryBtnColor:        '#fff',
  primaryBtnHoverShadow:  '0 4px 16px rgba(99,102,241,0.3)',
  accentGradient:         'linear-gradient(90deg, #6366f1, #8b5cf6)',
  modalIconBg:            '#6366f1',
  modalIconColor:         '#fff',
  inputFocusColor:        '#6366f1',
  inputFocusHoverBorder:  'rgba(99,102,241,0.35)',
  helperTextSuccessColor: '#10b981',

  // ── 상태 배지 색상 (light/dark 동일) ────────────────────────────────────
  statusSuccessColor:  '#10b981',
  statusSuccessBg:     '#10b98112',
  statusSuccessBorder: '#10b98128',
  statusWarningColor:  '#f59e0b',
  statusWarningBg:     '#f59e0b12',
  statusWarningBorder: '#f59e0b28',
  statusErrorColor:    '#ef4444',
  statusErrorBg:       '#ef444412',
  statusErrorBorder:   '#ef444428',
} as const

export type MileageTheme = typeof mileageLight

export const getMileageTheme = (isDarkMode: boolean): MileageTheme =>
  isDarkMode ? (mileageDark as unknown as MileageTheme) : mileageLight

// src/theme/settingsTheme.ts

const settingsLight = {
  // ── 패널 배경 ───────────────────────────────────────────────────────────────
  panelBg:              '#fafbff',
  panelAccordionBg:     'rgba(99,102,241,0.02)',

  // ── 인풋 ────────────────────────────────────────────────────────────────────
  inputBg:              '#f8fafc',
  inputHoverBorder:     'rgba(99,102,241,0.3)',

  // ── 아코디언 ────────────────────────────────────────────────────────────────
  accordionDivisionBg:  'rgba(99,102,241,0.05)',
  accordionTeamBg:      'rgba(241,245,249,0.8)',

  // ── 아바타 / 칩 (인디고 계열) ────────────────────────────────────────────────
  avatarBg:             'rgba(99,102,241,0.1)',
  avatarBgLight:        'rgba(99,102,241,0.08)',
  avatarBorder:         'rgba(99,102,241,0.15)',
  chipBg:               'rgba(99,102,241,0.07)',
  adminChipBg:          'rgba(99,102,241,0.1)',
  adminChipBorder:      'rgba(99,102,241,0.25)',

  // ── 멤버 행 ──────────────────────────────────────────────────────────────────
  memberRowBg:          '#ffffff',
  memberRowHoverBg:     'rgba(99,102,241,0.04)',
  memberRowHoverBorder: 'rgba(99,102,241,0.2)',
  memberSelectedBorder: 'rgba(99,102,241,0.25)',

  // ── 스크롤바 ─────────────────────────────────────────────────────────────────
  scrollbarThumb:       'rgba(99,102,241,0.2)',
  scrollbarThumbHover:  'rgba(99,102,241,0.4)',

  // ── 버튼 ────────────────────────────────────────────────────────────────────
  deleteHoverBg:        'rgba(239,68,68,0.06)',
  accentIconHoverBg:    'rgba(99,102,241,0.06)',
  outlinedBtnBorder:    'rgba(99,102,241,0.35)',
  cancelBtnHoverBg:     'rgba(100,116,139,0.06)',

  // ── 활성/비활성 칩 ───────────────────────────────────────────────────────────
  activeChipColor:      '#059669',
  activeChipBg:         'rgba(16,185,129,0.07)',
  activeChipBgHover:    'rgba(16,185,129,0.14)',
  activeChipBorder:     'rgba(16,185,129,0.2)',
  inactiveChipColor:    '#dc2626',
  inactiveChipBg:       'rgba(239,68,68,0.07)',
  inactiveChipBgHover:  'rgba(239,68,68,0.14)',
  inactiveChipBorder:   'rgba(239,68,68,0.2)',

  // ── 다이얼로그 ───────────────────────────────────────────────────────────────
  dialogBg:             '#ffffff',
  dialogFooterBg:       'rgba(248,250,252,0.8)',

  // ── 콘텐츠 섹션 ──────────────────────────────────────────────────────────────
  contentBg:            '#ffffff',
  dropZoneBg:           '#fafafa',
  reviewerItemBg:       '#ffffff',
  reviewerAvatarDefaultBg: 'rgba(241,245,249,0.9)',

  // ── 상수 (dark / light 동일) ─────────────────────────────────────────────────
  primaryColor:           '#6366f1',
  primaryHoverBg:         '#4f46e5',
  primaryBtnColor:        '#fff',
  primaryBtnHoverShadow:  '0 6px 20px rgba(99,102,241,0.4)',
  inputFocusBorder:       '#6366f1',
  deleteHoverColor:       '#ef4444',
  headerGradient:         'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  iconGradient:           'linear-gradient(135deg, #6366f1, #8b5cf6)',
} as const

const settingsDark = {
  // ── 패널 배경 ───────────────────────────────────────────────────────────────
  panelBg:              'rgba(22,30,46,0.6)',
  panelAccordionBg:     'rgba(15,23,42,0.4)',

  // ── 인풋 ────────────────────────────────────────────────────────────────────
  inputBg:              'rgba(15,23,42,0.5)',
  inputHoverBorder:     'rgba(99,102,241,0.35)',

  // ── 아코디언 ────────────────────────────────────────────────────────────────
  accordionDivisionBg:  'rgba(99,102,241,0.08)',
  accordionTeamBg:      'rgba(30,41,59,0.5)',

  // ── 아바타 / 칩 (인디고 계열) ────────────────────────────────────────────────
  avatarBg:             'rgba(99,102,241,0.2)',
  avatarBgLight:        'rgba(99,102,241,0.15)',
  avatarBorder:         'rgba(99,102,241,0.25)',
  chipBg:               'rgba(99,102,241,0.12)',
  adminChipBg:          'rgba(99,102,241,0.1)',
  adminChipBorder:      'rgba(99,102,241,0.25)',

  // ── 멤버 행 ──────────────────────────────────────────────────────────────────
  memberRowBg:          'rgba(30,41,59,0.6)',
  memberRowHoverBg:     'rgba(99,102,241,0.08)',
  memberRowHoverBorder: 'rgba(99,102,241,0.25)',
  memberSelectedBorder: 'rgba(99,102,241,0.35)',

  // ── 스크롤바 ─────────────────────────────────────────────────────────────────
  scrollbarThumb:       'rgba(99,102,241,0.25)',
  scrollbarThumbHover:  'rgba(99,102,241,0.5)',

  // ── 버튼 ────────────────────────────────────────────────────────────────────
  deleteHoverBg:        'rgba(239,68,68,0.1)',
  accentIconHoverBg:    'rgba(99,102,241,0.1)',
  outlinedBtnBorder:    'rgba(99,102,241,0.4)',
  cancelBtnHoverBg:     'rgba(148,163,184,0.08)',

  // ── 활성/비활성 칩 ───────────────────────────────────────────────────────────
  activeChipColor:      '#34d399',
  activeChipBg:         'rgba(16,185,129,0.12)',
  activeChipBgHover:    'rgba(16,185,129,0.22)',
  activeChipBorder:     'rgba(16,185,129,0.3)',
  inactiveChipColor:    '#f87171',
  inactiveChipBg:       'rgba(239,68,68,0.12)',
  inactiveChipBgHover:  'rgba(239,68,68,0.22)',
  inactiveChipBorder:   'rgba(239,68,68,0.3)',

  // ── 다이얼로그 ───────────────────────────────────────────────────────────────
  dialogBg:             'rgba(15,23,42,0.98)',
  dialogFooterBg:       'rgba(15,23,42,0.5)',

  // ── 콘텐츠 섹션 ──────────────────────────────────────────────────────────────
  contentBg:            'rgba(15,23,42,0.3)',
  dropZoneBg:           'rgba(15,23,42,0.3)',
  reviewerItemBg:       'rgba(30,41,59,0.5)',
  reviewerAvatarDefaultBg: 'rgba(30,41,59,0.8)',

  // ── 상수 (dark / light 동일) ─────────────────────────────────────────────────
  primaryColor:           '#6366f1',
  primaryHoverBg:         '#4f46e5',
  primaryBtnColor:        '#fff',
  primaryBtnHoverShadow:  '0 6px 20px rgba(99,102,241,0.4)',
  inputFocusBorder:       '#6366f1',
  deleteHoverColor:       '#ef4444',
  headerGradient:         'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  iconGradient:           'linear-gradient(135deg, #6366f1, #8b5cf6)',
} as const

export type SettingsTheme = typeof settingsLight

export const getSettingsTheme = (isDarkMode: boolean): SettingsTheme =>
  isDarkMode ? (settingsDark as unknown as SettingsTheme) : settingsLight

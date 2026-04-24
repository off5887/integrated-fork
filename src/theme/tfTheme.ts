// src/theme/tfTheme.ts
// TF(용병) 피처 전용 라이트/다크 팔레트

const tfLight = {
  // ── 카드 호버 그림자 ──
  cardHoverShadow: '0 20px 40px rgba(0,0,0,0.09), 0 8px 16px rgba(99,102,241,0.12)',

  // ── 보상 텍스트 그라디언트 ──
  rewardGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',

  // ── 마감임박(amber) 칩 ──
  urgentBg:           'rgba(245,158,11,0.07)',
  urgentColor:        '#92400e',
  urgentBorder:       'rgba(245,158,11,0.18)',
  urgentBgStrong:     'rgba(245,158,11,0.08)',
  urgentBorderStrong: 'rgba(245,158,11,0.2)',

  // ── 빈 상태 ──
  emptyStateBorder: 'rgba(99,102,241,0.15)',
  emptyStateBg:     'rgba(99,102,241,0.02)',

  // ── 인터랙션 강조 테두리 ──
  hoverAccentBorder: 'rgba(99,102,241,0.2)',

  // ── 검색 입력 배경 ──
  searchInputBg: '#f8fafc',

  // ── 검색 입력 호버 테두리 ──
  searchHoverBorder: 'rgba(99,102,241,0.3)',

  // ── 드롭 존 ──
  dropZoneBorder:      'rgba(99,102,241,0.25)',
  dropZoneBg:          'rgba(99,102,241,0.03)',
  dropZoneHoverBorder: 'rgba(99,102,241,0.4)',
  dropZoneHoverBg:     'rgba(99,102,241,0.06)',

  // ── 카운트 뱃지 ──
  countBadgeBg: 'rgba(100,116,139,0.06)',

  // ── 용병 칩 아바타 ──
  chipAvatarBg:    'rgba(99,102,241,0.15)',
  chipAvatarColor: '#4338ca',
  chipColor:       '#4338ca',

  // ── 삭제 아이콘 ──
  deleteIconColor:      'rgba(220,38,38,0.6)',
  deleteIconHoverColor: '#dc2626',

  // ── 수락 버튼 ──
  acceptBorder:      'rgba(16,185,129,0.35)',
  acceptColor:       '#059669',
  acceptHoverBg:     'rgba(16,185,129,0.07)',
  acceptHoverBorder: '#10b981',

  // ── 거절 버튼 ──
  rejectBorder:      'rgba(239,68,68,0.3)',
  rejectColor:       '#dc2626',
  rejectHoverBg:     'rgba(239,68,68,0.07)',
  rejectHoverBorder: '#ef4444',

  // ── 헤더 ──
  headerBg:     '#ffffff',
  headerBorder: '1px solid rgba(15,23,42,0.06)',
  headerColor:  '#0f172a',

  // ── Primary 버튼 (지원하기 등, light/dark 동일) ──
  primaryBtnBg:          '#6366f1',
  primaryBtnHoverBg:     '#4f46e5',
  primaryBtnColor:       '#fff',
  primaryBtnHoverShadow: '0 6px 20px rgba(99,102,241,0.4)',

  // ── 카드 상단 그라디언트 스트립 ──
  headerGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
} as const

const tfDark = {
  // ── 카드 호버 그림자 ──
  cardHoverShadow: '0 20px 40px rgba(0,0,0,0.5), 0 8px 16px rgba(99,102,241,0.3)',

  // ── 보상 텍스트 그라디언트 ──
  rewardGradient: 'linear-gradient(90deg, #c4b5fd, #a78bfa)',

  // ── 마감임박(amber) 칩 ──
  urgentBg:           'rgba(245,158,11,0.1)',
  urgentColor:        '#fbbf24',
  urgentBorder:       'rgba(245,158,11,0.25)',
  urgentBgStrong:     'rgba(245,158,11,0.12)',
  urgentBorderStrong: 'rgba(245,158,11,0.3)',

  // ── 빈 상태 ──
  emptyStateBorder: 'rgba(99,102,241,0.2)',
  emptyStateBg:     'rgba(99,102,241,0.03)',

  // ── 인터랙션 강조 테두리 ──
  hoverAccentBorder: 'rgba(99,102,241,0.25)',

  // ── 검색 입력 배경 ──
  searchInputBg: 'rgba(15,23,42,0.5)',

  // ── 검색 입력 호버 테두리 ──
  searchHoverBorder: 'rgba(99,102,241,0.35)',

  // ── 드롭 존 ──
  dropZoneBorder:      'rgba(99,102,241,0.3)',
  dropZoneBg:          'rgba(99,102,241,0.04)',
  dropZoneHoverBorder: 'rgba(99,102,241,0.5)',
  dropZoneHoverBg:     'rgba(99,102,241,0.08)',

  // ── 카운트 뱃지 ──
  countBadgeBg: 'rgba(148,163,184,0.08)',

  // ── 용병 칩 아바타 ──
  chipAvatarBg:    'rgba(99,102,241,0.3)',
  chipAvatarColor: '#c7d2fe',
  chipColor:       '#c7d2fe',

  // ── 삭제 아이콘 ──
  deleteIconColor:      'rgba(248,113,113,0.7)',
  deleteIconHoverColor: '#f87171',

  // ── 수락 버튼 ──
  acceptBorder:      'rgba(16,185,129,0.4)',
  acceptColor:       '#34d399',
  acceptHoverBg:     'rgba(16,185,129,0.12)',
  acceptHoverBorder: '#34d399',

  // ── 거절 버튼 ──
  rejectBorder:      'rgba(239,68,68,0.4)',
  rejectColor:       '#f87171',
  rejectHoverBg:     'rgba(239,68,68,0.12)',
  rejectHoverBorder: '#f87171',

  // ── 헤더 ──
  headerBg:     '#0f172a',
  headerBorder: '1px solid rgba(226,232,240,0.08)',
  headerColor:  '#e2e8f0',

  // ── Primary 버튼 (지원하기 등, light/dark 동일) ──
  primaryBtnBg:          '#6366f1',
  primaryBtnHoverBg:     '#4f46e5',
  primaryBtnColor:       '#fff',
  primaryBtnHoverShadow: '0 6px 20px rgba(99,102,241,0.4)',

  // ── 카드 상단 그라디언트 스트립 ──
  headerGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
} as const

export type TFTheme = typeof tfLight

export const getTFTheme = (isDarkMode: boolean): TFTheme =>
  isDarkMode ? (tfDark as unknown as TFTheme) : tfLight

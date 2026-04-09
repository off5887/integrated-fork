// src/theme/ideaTheme.ts
// 상상하기(NewIdea) / 아이디어 브라우징 전용 라이트/다크 팔레트

import type { IdeaStatus } from '@/api/types/ideaBrowse'

// ── 이미지 오버레이 (테마 무관, 항상 동일한 어두운 값) ──────────────────
const overlay = {
  imageBg:              'rgba(0,0,0,0.45)',
  deleteButtonBg:       'rgba(0,0,0,0.6)',
  deleteButtonHoverBg:  'rgba(239,68,68,0.9)',
  closeBg:              'rgba(0,0,0,0.5)',
  closeHoverBg:         'rgba(239,68,68,0.85)',
  previewDialogBg:      'rgba(0,0,0,0.94)',
  previewDialogShadow:  '0 0 80px rgba(0,0,0,0.9)',
  textColor:            '#94a3b8',
  iconColor:            '#ffffff',
} as const

const ideaLight = {
  // ── 텍스트 ──
  textPrimary:   '#0f172a',
  textSecondary: '#64748b',

  // ── 선/구분선 ──
  borderColor:  'rgba(203,213,225,0.5)',
  dividerColor: 'rgba(203,213,225,0.4)',

  // ── 페이지/카드 ──
  pageBg:    '#f1f5f9',
  cardBg:    '#ffffff',
  cardShadow: '0 4px 24px rgba(0,0,0,0.06)',

  // ── 입력 필드 ──
  inputBg:              'rgba(248,250,252,0.8)',
  inputBorder:          'rgba(203,213,225,0.7)',
  inputHoverBorder:     'rgba(148,163,184,0.5)',
  cancelBtnHoverBorder: 'rgba(148,163,184,0.6)',

  // ── 모달 ──
  modalBg:      '#ffffff',
  modalFooterBg: 'rgba(248,250,252,0.8)',
  listItemBg:   '#ffffff',

  // ── 패널 (일정/공개 범위 등) ──
  panelBg: '#fafbfc',

  // ── 배경 변형 ──
  searchInputBg:  '#f8fafc',
  itemBg:         '#ffffff',
  avatarBg:       'rgba(241,245,249,0.9)',
  subtleBg:       'rgba(248,250,252,0.8)',
  emptyStateBg:   'rgba(248,250,252,0.6)',
  fileItemBg:     '#f8fafc',
  dividerBg:      'rgba(203,213,225,0.4)',
  categoryCardBg: 'rgba(248,250,252,0.8)',

  // ── 백드롭 ──
  backdropBg: 'rgba(0,0,0,0.35)',

  // ── 스낵바 ──
  snackbarBg:     '#ffffff',
  snackbarColor:  '#0f172a',
  snackbarShadow: '0 8px 32px rgba(0,0,0,0.1)',

  // ── 다이얼로그/모달 ──
  dialogShadow:        '0 24px 64px rgba(0,0,0,0.12)',
  fileItemShadow:      '0 2px 8px rgba(0,0,0,0.06)',
  fileItemHoverShadow: '0 8px 24px rgba(0,0,0,0.12)',
  categoryGrayscale:   'grayscale(10%)',

  // ── 그라디언트 ──
  headerGradient:      'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  modalHeaderGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',

  // ── 이미지 오버레이 (테마 무관) ──
  overlay,

  // ── 인디고(primary) 액센트 ──
  accent: {
    color:              '#6366f1',
    hover:              '#4f46e5',
    text:               '#4338ca',
    textMuted:          '#6366f1',
    bg:                 'rgba(99,102,241,0.05)',
    bgHover:            'rgba(99,102,241,0.04)',
    bgStrong:           'rgba(99,102,241,0.1)',
    bgSelected:         'rgba(99,102,241,0.05)',
    bgAvatarSelected:   'rgba(99,102,241,0.12)',
    bgVerySubtle:       'rgba(99,102,241,0.03)',
    border:             'rgba(99,102,241,0.2)',
    borderHover:        'rgba(99,102,241,0.35)',
    btnOutlineBorder:   'rgba(99,102,241,0.25)',
    btnDisabledBg:      'rgba(99,102,241,0.3)',
    btnHoverShadow:     '0 4px 16px rgba(99,102,241,0.35)',
    btnModalHoverShadow:'0 4px 14px rgba(99,102,241,0.4)',
    btnColor:           '#ffffff',
    dismissBtnBorder:   'rgba(203,213,225,0.7)',
  },

  // ── 퍼플(공동제안자/비공개) 액센트 ──
  purple: {
    color:       '#8b5cf6',
    text:        '#6d28d9',
    bg:          'rgba(139,92,246,0.05)',
    bgStrong:    'rgba(139,92,246,0.1)',
    border:      'rgba(139,92,246,0.14)',
    borderHover: 'rgba(139,92,246,0.35)',
  },

  // ── 에러/위험 (red) ──
  danger: {
    color:        '#ef4444',
    bg:           'rgba(239,68,68,0.07)',
    bgSubtle:     'rgba(239,68,68,0.08)',
    border:       'rgba(239,68,68,0.2)',
    borderStrong: 'rgba(239,68,68,0.3)',
  },

  // ── 성공 (green) ──
  success: {
    color:  '#10b981',
    bg:     'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },

  // ── 경고/유사도 (amber) ──
  amber: {
    color:        '#f59e0b',
    bg:           'rgba(245,158,11,0.1)',
    bgSubtle:     'rgba(245,158,11,0.03)',
    bgHover:      'rgba(245,158,11,0.06)',
    border:       'rgba(245,158,11,0.25)',
    borderHover:  'rgba(245,158,11,0.5)',
  },
} as const

const ideaDark = {
  // ── 텍스트 ──
  textPrimary:   '#f1f5f9',
  textSecondary: '#94a3b8',

  // ── 선/구분선 ──
  borderColor:  'rgba(148,163,184,0.1)',
  dividerColor: 'rgba(148,163,184,0.08)',

  // ── 페이지/카드 ──
  pageBg:    '#0a0f1e',
  cardBg:    'rgba(22,30,46,0.95)',
  cardShadow: '0 8px 32px rgba(0,0,0,0.4)',

  // ── 입력 필드 ──
  inputBg:              'rgba(15,23,42,0.4)',
  inputBorder:          'rgba(148,163,184,0.18)',
  inputHoverBorder:     'rgba(148,163,184,0.35)',
  cancelBtnHoverBorder: 'rgba(148,163,184,0.3)',

  // ── 모달 ──
  modalBg:      'rgba(22,30,46,0.98)',
  modalFooterBg: 'rgba(15,23,42,0.3)',
  listItemBg:   'rgba(30,41,59,0.5)',

  // ── 패널 (일정/공개 범위 등) ──
  panelBg: 'rgba(22,30,46,0.6)',

  // ── 배경 변형 ──
  searchInputBg:  'rgba(15,23,42,0.5)',
  itemBg:         'rgba(30,41,59,0.4)',
  avatarBg:       'rgba(30,41,59,0.8)',
  subtleBg:       'rgba(15,23,42,0.4)',
  emptyStateBg:   'rgba(15,23,42,0.2)',
  fileItemBg:     'rgba(22,30,46,0.8)',
  dividerBg:      'rgba(148,163,184,0.08)',
  categoryCardBg: 'rgba(30,41,59,0.5)',

  // ── 백드롭 ──
  backdropBg: 'rgba(0,0,0,0.6)',

  // ── 스낵바 ──
  snackbarBg:     'rgba(22,30,46,0.98)',
  snackbarColor:  '#f1f5f9',
  snackbarShadow: '0 8px 32px rgba(0,0,0,0.5)',

  // ── 다이얼로그/모달 ──
  dialogShadow:        '0 24px 64px rgba(0,0,0,0.6)',
  fileItemShadow:      '0 2px 12px rgba(0,0,0,0.3)',
  fileItemHoverShadow: '0 8px 24px rgba(0,0,0,0.4)',
  categoryGrayscale:   'grayscale(20%)',

  // ── 그라디언트 ──
  headerGradient:      'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
  modalHeaderGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',

  // ── 이미지 오버레이 (테마 무관) ──
  overlay,

  // ── 인디고(primary) 액센트 ──
  accent: {
    color:              '#6366f1',
    hover:              '#4f46e5',
    text:               '#a5b4fc',
    textMuted:          '#a5b4fc',
    bg:                 'rgba(99,102,241,0.08)',
    bgHover:            'rgba(99,102,241,0.08)',
    bgStrong:           'rgba(99,102,241,0.15)',
    bgSelected:         'rgba(99,102,241,0.1)',
    bgAvatarSelected:   'rgba(99,102,241,0.25)',
    bgVerySubtle:       'rgba(99,102,241,0.05)',
    border:             'rgba(99,102,241,0.25)',
    borderHover:        'rgba(99,102,241,0.4)',
    btnOutlineBorder:   'rgba(99,102,241,0.3)',
    btnDisabledBg:      'rgba(99,102,241,0.4)',
    btnHoverShadow:     '0 4px 16px rgba(99,102,241,0.35)',
    btnModalHoverShadow:'0 4px 14px rgba(99,102,241,0.4)',
    btnColor:           '#ffffff',
    dismissBtnBorder:   'rgba(148,163,184,0.25)',
  },

  // ── 퍼플(공동제안자/비공개) 액센트 ──
  purple: {
    color:       '#8b5cf6',
    text:        '#c4b5fd',
    bg:          'rgba(139,92,246,0.05)',
    bgStrong:    'rgba(139,92,246,0.12)',
    border:      'rgba(139,92,246,0.14)',
    borderHover: 'rgba(139,92,246,0.4)',
  },

  // ── 에러/위험 (red) ──
  danger: {
    color:        '#ef4444',
    bg:           'rgba(239,68,68,0.08)',
    bgSubtle:     'rgba(239,68,68,0.1)',
    border:       'rgba(239,68,68,0.25)',
    borderStrong: 'rgba(239,68,68,0.35)',
  },

  // ── 성공 (green) ──
  success: {
    color:  '#10b981',
    bg:     'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
  },

  // ── 경고/유사도 (amber) ──
  amber: {
    color:        '#f59e0b',
    bg:           'rgba(245,158,11,0.1)',
    bgSubtle:     'rgba(245,158,11,0.05)',
    bgHover:      'rgba(245,158,11,0.08)',
    border:       'rgba(245,158,11,0.3)',
    borderHover:  'rgba(245,158,11,0.5)',
  },
} as const

// ── 아이디어 상태 색상 (라이트/다크 동일) ──
export const IDEA_STATUS_CONFIG: Record<IdeaStatus, { color: string; bg: string; border: string }> = {
  심사대기: { color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
  심사중:   { color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)'   },
  승인:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)'   },
  반려:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)'    },
  실행중:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)'   },
  완료:     { color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.3)'   },
}

export type IdeaTheme = typeof ideaLight

/** isDarkMode 값을 넘기면 해당 팔레트를 반환합니다. */
export const getIdeaTheme = (isDarkMode: boolean): IdeaTheme =>
  isDarkMode ? (ideaDark as unknown as IdeaTheme) : ideaLight

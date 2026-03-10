// src/theme/ideaTheme.ts
// 상상하기(NewIdea) / 아이디어 브라우징 전용 라이트/다크 팔레트

import type { IdeaStatus } from '../api/types/ideaBrowse'

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
  inputBg:          'rgba(248,250,252,0.8)',
  inputBorder:      'rgba(203,213,225,0.7)',
  inputHoverBorder: 'rgba(148,163,184,0.5)',

  // ── 모달 ──
  modalBg:   '#ffffff',
  listItemBg: '#ffffff',

  // ── 패널 (일정/공개 범위 등) ──
  panelBg: '#fafbfc',

  // ── 인디고(primary) 액센트 ──
  accent: {
    color:       '#6366f1',
    hover:       '#4f46e5',
    text:        '#4338ca',
    textMuted:   '#6366f1',
    bg:          'rgba(99,102,241,0.05)',
    bgHover:     'rgba(99,102,241,0.04)',
    bgStrong:    'rgba(99,102,241,0.1)',
    border:      'rgba(99,102,241,0.2)',
    borderHover: 'rgba(99,102,241,0.35)',
  },

  // ── 퍼플(공동제안자) 액센트 ──
  purple: {
    color:  '#8b5cf6',
    text:   '#6d28d9',
    bg:     'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.14)',
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
  inputBg:          'rgba(15,23,42,0.4)',
  inputBorder:      'rgba(148,163,184,0.18)',
  inputHoverBorder: 'rgba(148,163,184,0.35)',

  // ── 모달 ──
  modalBg:   'rgba(22,30,46,0.98)',
  listItemBg: 'rgba(30,41,59,0.5)',

  // ── 패널 (일정/공개 범위 등) ──
  panelBg: 'rgba(22,30,46,0.6)',

  // ── 인디고(primary) 액센트 ──
  accent: {
    color:       '#6366f1',
    hover:       '#4f46e5',
    text:        '#a5b4fc',
    textMuted:   '#a5b4fc',
    bg:          'rgba(99,102,241,0.08)',
    bgHover:     'rgba(99,102,241,0.08)',
    bgStrong:    'rgba(99,102,241,0.15)',
    border:      'rgba(99,102,241,0.25)',
    borderHover: 'rgba(99,102,241,0.4)',
  },

  // ── 퍼플(공동제안자) 액센트 ──
  purple: {
    color:  '#8b5cf6',
    text:   '#c4b5fd',
    bg:     'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.14)',
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
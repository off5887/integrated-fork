// src/theme/ideaBrowseTheme.ts
// 아이디어 브라우즈 페이지 전용 라이트/다크 팔레트
import type { IdeaStatus } from '@/api/types/ideaBrowse'

const ideaLight = {
  // ── 배경 ──
  bgBase: '#f8fafc',
  filterBg: 'rgba(255,255,255,0.95)',
  pageBg: 'rgba(248,250,252,0.9)',
  cardBg: '#ffffff',

  // ── 텍스트 ──
  textPrimary: '#0f172a',
  textSecondary: '#64748b',

  // ── 선/구분선 ──
  borderColor: 'rgba(203,213,225,0.6)',
  dividerColor: 'rgba(203,213,225,0.5)',

  // ── 카드 (IdeaCard) ──
  cardBorder: 'rgba(203,213,225,0.4)',
  cardShadow: '0 2px 12px rgba(0,0,0,0.05)',
  cardHoverShadow:
    '0 16px 36px rgba(0,0,0,0.1), 0 6px 12px rgba(99,102,241,0.1)',

  // ── 필터/칩 영역 ──
  filterChipBg: 'rgba(248,250,252,0.8)',
  filterActiveBg: 'rgba(99,102,241,0.08)',
  filterActiveBorder: '#6366f1',

  // ── 유사 아이디어 표시 (similar) ──
  similar: {
    border: 'rgba(245,158,11,0.5)',
    badgeBg: 'rgba(245,158,11,0.1)',
    badgeBorder: 'rgba(245,158,11,0.4)',
    textColor: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#fbbf24',
  },

  // ── 인터랙션 ──
  hoverBg: 'rgba(241,245,249,0.8)',
  focusOutline: '#6366f1',

  // ── 상태 뱃지 (승인/반려 등) ──
  statusBadgeOpacity: 0.08,
  statusBorderOpacity: 0.3,

  // ── 아바타 ──
  avatarBg: '#6366f1',

  // ── 유사 카드 그림자 ──
  similarCardShadow: '0 0 0 1px rgba(245,158,11,0.2), 0 2px 12px rgba(0,0,0,0.05)',

  // ── 상세 다이얼로그 ──
  dialogShadow: '0 24px 64px rgba(0,0,0,0.12)',
  backdropBg: 'rgba(0,0,0,0.35)',
  similarListColor: '#92400e',

  // ── 입력/셀렉트 배경 ──
  inputBg: '#f8fafc',

  // ── 내 상상만 토글 ──
  myOnlyActiveBg: 'rgba(16,185,129,0.1)',
  myOnlyCountBg: 'rgba(16,185,129,0.12)',

  // ── 통계 박스 ──
  statsBg: 'rgba(99,102,241,0.05)',
  statsBorder: 'rgba(99,102,241,0.15)',
} as const

const ideaDark = {
  // ── 배경 ──
  bgBase: '#0f172a',
  filterBg: 'rgba(22,30,46,0.9)',
  pageBg: 'rgba(15,23,42,0.5)',
  cardBg: 'rgba(22,30,46,0.95)',

  // ── 텍스트 ──
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',

  // ── 선/구분선 ──
  borderColor: 'rgba(148,163,184,0.18)',
  dividerColor: 'rgba(148,163,184,0.15)',

  // ── 카드 (IdeaCard) ──
  cardBorder: 'rgba(148,163,184,0.12)',
  cardShadow: '0 4px 20px rgba(0,0,0,0.3)',
  cardHoverShadow:
    '0 20px 40px rgba(0,0,0,0.5), 0 8px 16px rgba(99,102,241,0.25)',

  // ── 필터/칩 영역 ──
  filterChipBg: 'rgba(30,41,59,0.5)',
  filterActiveBg: 'rgba(99,102,241,0.15)',
  filterActiveBorder: '#6366f1',

  // ── 유사 아이디어 표시 (similar) ──
  similar: {
    border: 'rgba(245,158,11,0.5)',
    badgeBg: 'rgba(245,158,11,0.15)',
    badgeBorder: 'rgba(245,158,11,0.4)',
    textColor: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#fbbf24',
  },

  // ── 인터랙션 ──
  hoverBg: 'rgba(148,163,184,0.06)',
  focusOutline: '#6366f1',

  // ── 상태 뱃지 (승인/반려 등) ──
  statusBadgeOpacity: 0.08,
  statusBorderOpacity: 0.3,

  // ── 아바타 ──
  avatarBg: '#4f46e5',

  // ── 유사 카드 그림자 ──
  similarCardShadow: '0 0 0 1px rgba(245,158,11,0.25), 0 4px 20px rgba(0,0,0,0.3)',

  // ── 상세 다이얼로그 ──
  dialogShadow: '0 24px 64px rgba(0,0,0,0.6)',
  backdropBg: 'rgba(0,0,0,0.6)',
  similarListColor: '#fbbf24',

  // ── 입력/셀렉트 배경 ──
  inputBg: 'rgba(15,23,42,0.5)',

  // ── 내 상상만 토글 ──
  myOnlyActiveBg: 'rgba(16,185,129,0.15)',
  myOnlyCountBg: 'rgba(16,185,129,0.2)',

  // ── 통계 박스 ──
  statsBg: 'rgba(99,102,241,0.08)',
  statsBorder: 'rgba(99,102,241,0.2)',
} as const

// ── 공통 액센트 컬러 (라이트/다크 동일하게 사용) ──
export const ideaAccent = {
  primary: '#6366f1', // indigo-500
  similar: '#f59e0b', // amber-500
  success: '#10b981', // emerald-500
  warning: '#f59e0b',
  danger: '#ef4444',
  violet: '#8b5cf6',
  purple: '#a78bfa',
  headerIconGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  headerIconShadow: '0 4px 16px rgba(99,102,241,0.35)',
  headerIconColor: '#fff',
} as const

export type IdeaBrowseTheme = typeof ideaLight

/** isDarkMode 값을 넘기면 해당 테마 객체 전체를 반환합니다. */
export const getIdeaTheme = (isDarkMode: boolean): IdeaBrowseTheme =>
  isDarkMode ? (ideaDark as unknown as IdeaBrowseTheme) : ideaLight

// ──────────────────────────────────────────────────────────────
// 상태별 색상 설정 (기존 IDEA_STATUS_CONFIG 유지)
// ──────────────────────────────────────────────────────────────

export const IDEA_STATUS_CONFIG: Record<IdeaStatus, { color: string; bg: string; border: string }> = {
  심사대기: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.3)',
  },
  심사중: {
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.3)',
  },
  승인: {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.3)',
  },
  반려: {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.3)',
  },
  실행중: {
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.3)',
  },
  완료: {
    color: '#6b7280',
    bg: 'rgba(107,114,128,0.08)',
    border: 'rgba(107,114,128,0.3)',
  },
} as const

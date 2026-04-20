// src/theme/dashboardTheme.ts
// 대시보드 전용 라이트/다크 팔레트

const dashboardLight = {
  // ── 배경 ──
  bgBase: '#f8fafc',
  headerBg: 'rgba(255,255,255,0.9)',

  // ── 텍스트 ──
  textPrimary: '#0f172a',
  textSecondary: '#64748b',

  // ── 선/구분선 ──
  borderColor: 'rgba(203,213,225,0.4)',
  dividerColor: 'rgba(203,213,225,0.5)',
  gridColor: 'rgba(203,213,225,0.3)',

  // ── 카드 (DashboardCard) ──
  cardBg: 'rgba(255,255,255,0.97)',
  cardBorder: 'rgba(226,232,240,0.8)',
  cardShadow:
    '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',

  // ── 서브 영역 (범례, 통계 그리드 등) ──
  subtleBg: 'rgba(241,245,249,0.8)',
  subtleBorder: 'rgba(203,213,225,0.5)',

  // ── 인터랙션 ──
  hoverBg: 'rgba(241,245,249,0.8)',
  focusBg: 'rgba(99,102,241,0.05)',

  // ── 뱃지 ──
  timeBadgeBg: 'rgba(203,213,225,0.3)',

  // ── 인사이트 박스 (indigo tint) ──
  insightBg: 'rgba(99,102,241,0.05)',
  insightBorder: 'rgba(99,102,241,0.1)',

  // ── 페이지 헤더 아이콘 박스 ──
  headerIconGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  headerIconShadow: '0 4px 16px rgba(99,102,241,0.3)',
  headerIconColor: '#fff',

  // ── 실시간 뱃지 ──
  realtimeBadgeBg: 'rgba(59,130,246,0.08)',
  realtimeBadgeBorder: 'rgba(59,130,246,0.2)',
  iconBgAlpha: 0.1,
  chartShade: 'light' as const,
  chartTheme: 'light' as const,

  // ── 나의 곰곰이 전용 ──
  gom: {
    profileBg: 'rgba(99,102,241,0.05)',
    profileBorder: 'rgba(99,102,241,0.1)',
    levelBadgeBg: 'rgba(99,102,241,0.12)',
    levelBadgeBorder: 'rgba(99,102,241,0.25)',
    levelBadgeColor: '#6366f1',
    rankBadgeBg: 'rgba(203,213,225,0.4)',
    miniStatBg: 'rgba(139,92,246,0.04)',
    miniStatBorder: 'rgba(139,92,246,0.12)',
    progressText: 'rgba(99,102,241,1)',
    progressTrack: 'rgba(203,213,225,0.5)',
  },
} as const

const dashboardDark = {
  // ── 배경 ──
  bgBase: '#0d1117',
  headerBg: 'rgba(13,17,23,0.95)',

  // ── 텍스트 ──
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',

  // ── 선/구분선 ──
  borderColor: 'rgba(148,163,184,0.12)',
  dividerColor: 'rgba(148,163,184,0.15)',
  gridColor: 'rgba(148,163,184,0.1)',

  // ── 카드 (DashboardCard) ──
  cardBg: 'rgba(22,30,46,0.92)',
  cardBorder: 'rgba(148,163,184,0.1)',
  cardShadow:
    '0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)',

  // ── 서브 영역 (범례, 통계 그리드 등) ──
  subtleBg: 'rgba(148,163,184,0.06)',
  subtleBorder: 'rgba(148,163,184,0.1)',

  // ── 인터랙션 ──
  hoverBg: 'rgba(148,163,184,0.06)',
  focusBg: 'rgba(99,102,241,0.08)',

  // ── 뱃지 ──
  timeBadgeBg: 'rgba(148,163,184,0.08)',

  // ── 인사이트 박스 (indigo tint) ──
  insightBg: 'rgba(99,102,241,0.08)',
  insightBorder: 'rgba(99,102,241,0.15)',

  // ── 페이지 헤더 아이콘 박스 ──
  headerIconGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  headerIconShadow: '0 4px 16px rgba(99,102,241,0.45)',
  headerIconColor: '#fff',

  // ── 실시간 뱃지 ──
  realtimeBadgeBg: 'rgba(59,130,246,0.12)',
  realtimeBadgeBorder: 'rgba(59,130,246,0.25)',
  iconBgAlpha: 0.15,
  chartShade: 'dark' as const,
  chartTheme: 'dark' as const,

  // ── 나의 곰곰이 전용 ──
  gom: {
    profileBg: 'rgba(99,102,241,0.08)',
    profileBorder: 'rgba(99,102,241,0.15)',
    levelBadgeBg: 'rgba(139,92,246,0.25)',
    levelBadgeBorder: 'rgba(139,92,246,0.4)',
    levelBadgeColor: '#c4b5fd',
    rankBadgeBg: 'rgba(148,163,184,0.08)',
    miniStatBg: 'rgba(139,92,246,0.06)',
    miniStatBorder: 'rgba(139,92,246,0.18)',
    progressText: '#a78bfa',
    progressTrack: 'rgba(148,163,184,0.12)',
  },
} as const

// ── 전체 실행 완료율 상태 설정 (threshold 내림차순) ──
export const COMPLETION_RATE_STATUS = [
  { threshold: 80, label: '우수',     color: '#10b981', gradTo: '#34d399', bg: '#10b98118', border: '#10b98130' },
  { threshold: 60, label: '보통',     color: '#f59e0b', gradTo: '#fcd34d', bg: '#f59e0b18', border: '#f59e0b30' },
  { threshold: 0,  label: '개선 필요', color: '#ef4444', gradTo: '#f87171', bg: '#ef444418', border: '#ef444430' },
] as const

// ── 차트/랭킹용 액센트 컬러 (라이트/다크 동일) ──
export const dashboardAccent = {
  indigo: '#6366f1',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  green: '#10b981',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  red: '#ef4444',
  violet: '#a78bfa',
  /** 랭킹 순서대로 (1위~5위) */
  rank: ['#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'],
} as const

export type DashboardTheme = typeof dashboardLight

/** isDarkMode 값을 넘기면 해당 팔레트를 반환합니다. */
export const getDashboardTheme = (isDarkMode: boolean): DashboardTheme =>
  isDarkMode ? (dashboardDark as unknown as DashboardTheme) : dashboardLight

import { useThemeMode } from '@/context/ThemeContext'
export function useDashboardTheme(): DashboardTheme {
  const { isDarkMode } = useThemeMode()
  return getDashboardTheme(isDarkMode)
}
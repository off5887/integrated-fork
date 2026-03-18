import { useThemeMode } from '@/context/ThemeContext'

/**
 * 페이지 레벨 공통 테마 색상 토큰.
 * isDarkMode를 받아 색상 토큰 객체를 반환합니다.
 *
 * - 새 색상이 필요하면 여기에 추가하면 모든 페이지에 즉시 반영됩니다.
 * - 훅 버전: usePageColors() — 컴포넌트 내부에서 사용
 * - 함수 버전: getPageColors(isDarkMode) — 훅을 사용할 수 없는 컨텍스트에서 사용
 */
export function getPageColors(isDarkMode: boolean) {
  return {
    // ── 텍스트 ──────────────────────────────────────────────────────────────
    textPrimary:   isDarkMode ? '#f1f5f9' : '#0f172a',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',

    // ── 배경 ────────────────────────────────────────────────────────────────
    bgBase:   isDarkMode ? '#0a0f1e' : '#f1f5f9',
    cardBg:   isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',

    // ── 테두리 ──────────────────────────────────────────────────────────────
    borderColor: isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)',

    // ── 그림자 ──────────────────────────────────────────────────────────────
    cardShadow:  isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)'  : '0 4px 24px rgba(0,0,0,0.06)',
    shadowSmall: isDarkMode ? '0 4px 24px rgba(0,0,0,0.3)'  : '0 4px 24px rgba(0,0,0,0.05)',

    // ── 강조 (인디고) ───────────────────────────────────────────────────────
    accentColor:  isDarkMode ? '#a5b4fc'              : '#4338ca',
    accentBg:     isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
    accentBorder: isDarkMode ? 'rgba(99,102,241,0.3)'  : 'rgba(99,102,241,0.2)',
    rowHoverBg:   isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)',

    // ── 테이블/목록 행 ──────────────────────────────────────────────────────
    headerBg: isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)',
    rowBg:    isDarkMode ? 'rgba(30,41,59,0.4)'    : '#ffffff',
  }
}

export type PageColors = ReturnType<typeof getPageColors>

/** 컴포넌트 내부에서 사용하는 훅 버전 */
export function usePageColors(): PageColors {
  const { isDarkMode } = useThemeMode()
  return getPageColors(isDarkMode)
}

import { useThemeMode } from '@/context/ThemeContext'

/**
 * 헤더 네비게이션에서 공통으로 사용되는 테마 색상 토큰을 반환합니다.
 * textColor      — 압축된 상단 바용 (회색 계열)
 * drawerTextColor — 전체 모바일 드로어용 (밝은 계열)
 */
export function useNavColors() {
  const { isDarkMode, toggleTheme } = useThemeMode()

  return {
    isDarkMode,
    toggleTheme,
    activeColor: isDarkMode ? '#a5b4fc' : '#6366f1',
    textColor: isDarkMode ? '#94a3b8' : '#64748b',
    drawerTextColor: isDarkMode ? '#e2e8f0' : '#0f172a',
    hoverBg: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)',
    dropdownBg: isDarkMode ? 'rgba(13,17,30,0.97)' : '#ffffff',
    dropdownBorder: isDarkMode
      ? '1px solid rgba(148,163,184,0.15)'
      : '1px solid rgba(203,213,225,0.6)',
  }
}

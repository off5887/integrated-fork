import { useThemeMode } from '@/context/ThemeContext'
import { getNavTheme } from '@/theme/navTheme'

/**
 * 헤더 네비게이션에서 공통으로 사용되는 테마 색상 토큰을 반환합니다.
 * textColor        — 압축된 상단 바용 (회색 계열)
 * drawerTextColor  — 전체 모바일 드로어용 (밝은 계열)
 */
export function useNavColors() {
  const { isDarkMode, toggleTheme } = useThemeMode()
  const nt = getNavTheme(isDarkMode)

  return {
    isDarkMode,
    toggleTheme,
    nt,
  }
}

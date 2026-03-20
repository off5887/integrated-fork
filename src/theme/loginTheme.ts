// src/theme/loginTheme.ts
// 로그인 페이지 전용 라이트/다크 색상 토큰
import type { UserRole } from '@/api/types/auth'

export const ROLE_COLORS: Record<UserRole, string> = {
  user: '#3b82f6',
  reviewer: '#8b5cf6',
  admin: '#10b981',
}

export function getLoginColors(isDarkMode: boolean) {
  return {
    bg: isDarkMode
      ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
    cardBg: isDarkMode ? 'rgba(30,41,59,0.78)' : 'rgba(255,255,255,0.94)',
    cardBorder: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
    cardShadow: isDarkMode ? '0 20px 60px rgba(0,0,0,0.55)' : '0 20px 60px rgba(0,0,0,0.1)',
    toggleBg: isDarkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.85)',
    toggleBorder: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    toggleHover: isDarkMode ? 'rgba(51,65,85,0.9)' : 'rgba(255,255,255,0.98)',
    logoGradient: isDarkMode
      ? 'linear-gradient(135deg, #818cf8, #6366f1)'
      : 'linear-gradient(135deg, #6366f1, #4f46e5)',
    titleGradient: isDarkMode
      ? 'linear-gradient(90deg, #a5b4fc, #818cf8)'
      : 'linear-gradient(90deg, #6366f1, #4338ca)',
    muted: isDarkMode ? '#94a3b8' : '#64748b',
    demoBg: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
    demoBorder: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
    demoAccent: isDarkMode ? '#a5b4fc' : '#4338ca',
    demoValue: isDarkMode ? '#e2e8f0' : '#1e293b',
    errorBg: isDarkMode ? 'rgba(127,29,29,0.45)' : '#fee2e2',
    errorText: isDarkMode ? '#fca5a5' : '#991b1b',
    errorBorder: isDarkMode ? 'rgba(248,113,113,0.35)' : '#fca5a5',
    inputBg: isDarkMode ? 'rgba(51,65,85,0.55)' : '#ffffff',
    inputText: isDarkMode ? '#f1f5f9' : '#0f172a',
    inputBorder: isDarkMode ? 'rgba(148,163,184,0.4)' : 'rgba(203,213,225,0.8)',
    inputAccent: isDarkMode ? '#818cf8' : '#6366f1',
    btnBg: isDarkMode ? 'linear-gradient(135deg, #818cf8, #6366f1)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
    btnHover: isDarkMode ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'linear-gradient(135deg, #4f46e5, #4338ca)',
    btnColor: '#ffffff',
    btnShadow: '0 8px 24px rgba(99,102,241,0.35)',
    link: isDarkMode ? '#a5b4fc' : '#6366f1',
    linkHover: isDarkMode ? '#c7d2fe' : '#4338ca',
    toggleIconColor: isDarkMode ? '#fbbf24' : '#64748b',
  }
}

export type LoginColors = ReturnType<typeof getLoginColors>

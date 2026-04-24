// src/theme/messageTheme.ts
// 메시지(쪽지) 페이지 전용 라이트/다크 팔레트

const msgLight = {
  pageBg:        '#f8fafc',
  sidebarBg:     '#ffffff',
  contentBg:     '#ffffff',
  cardBg:        '#ffffff',
  cardHoverBg:   '#f1f5f9',
  cardActiveBg:  'rgba(99,102,241,0.06)',
  textPrimary:   '#0f172a',
  textSecondary: '#64748b',
  borderColor:   'rgba(203,213,225,0.6)',
  dividerColor:  'rgba(203,213,225,0.5)',
  unreadDot:     '#6366f1',
  unreadBg:      'rgba(99,102,241,0.06)',
  unreadBorder:  'rgba(99,102,241,0.15)',
  tabActiveBg:   'rgba(99,102,241,0.08)',
  tabActiveColor:'#6366f1',
  tabColor:      '#64748b',
  avatarBg:      '#6366f1',
  inputBg:       '#f8fafc',
  cardShadow:    '0 1px 4px rgba(0,0,0,0.05)',
  // ── 쪽지 쓰기 다이얼로그 ──
  dialogShadow:       '0 12px 40px rgba(0,0,0,0.12)',
  textFieldBg:        '#fff',
  recipientListBg:    'rgba(248,250,252,0.8)',
  adminChipBg:        'rgba(99,102,241,0.08)',
  adminChipColor:     '#6366f1',
  adminChipBorder:    'rgba(99,102,241,0.2)',
  adminChipDelColor:  'rgba(99,102,241,0.5)',
  cancelBtnHoverBg:   'rgba(0,0,0,0.04)',
  sendDisabledBg:     'rgba(99,102,241,0.4)',
  sendBtnShadow:      '0 2px 8px rgba(99,102,241,0.25)',
  sendBtnHoverShadow: '0 4px 12px rgba(99,102,241,0.35)',
  // ── 관리자에게 보내기 버튼 ──
  adminBtnBorder:     'rgba(99,102,241,0.35)',
  adminBtnColor:      '#6366f1',
  adminBtnBg:         'rgba(99,102,241,0.04)',
  adminBtnHoverBg:    'rgba(99,102,241,0.1)',
}

const msgDark = {
  pageBg:        '#0f172a',
  sidebarBg:     '#1e293b',
  contentBg:     '#1e293b',
  cardBg:        '#1e293b',
  cardHoverBg:   '#334155',
  cardActiveBg:  'rgba(99,102,241,0.12)',
  textPrimary:   '#f1f5f9',
  textSecondary: '#94a3b8',
  borderColor:   'rgba(51,65,85,0.8)',
  dividerColor:  'rgba(51,65,85,0.6)',
  unreadDot:     '#818cf8',
  unreadBg:      'rgba(129,140,248,0.1)',
  unreadBorder:  'rgba(129,140,248,0.2)',
  tabActiveBg:   'rgba(129,140,248,0.12)',
  tabActiveColor:'#818cf8',
  tabColor:      '#94a3b8',
  avatarBg:      '#4f46e5',
  inputBg:       '#0f172a',
  cardShadow:    '0 1px 4px rgba(0,0,0,0.3)',
  // ── 쪽지 쓰기 다이얼로그 ──
  dialogShadow:       '0 24px 64px rgba(0,0,0,0.6)',
  textFieldBg:        'rgba(15,23,42,0.4)',
  recipientListBg:    'rgba(15,23,42,0.4)',
  adminChipBg:        'rgba(99,102,241,0.15)',
  adminChipColor:     '#818cf8',
  adminChipBorder:    'rgba(99,102,241,0.3)',
  adminChipDelColor:  'rgba(129,140,248,0.6)',
  cancelBtnHoverBg:   'rgba(148,163,184,0.08)',
  sendDisabledBg:     'rgba(99,102,241,0.3)',
  sendBtnShadow:      '0 2px 12px rgba(99,102,241,0.4)',
  sendBtnHoverShadow: '0 4px 16px rgba(99,102,241,0.55)',
  // ── 관리자에게 보내기 버튼 ──
  adminBtnBorder:     'rgba(129,140,248,0.45)',
  adminBtnColor:      '#818cf8',
  adminBtnBg:         'rgba(99,102,241,0.08)',
  adminBtnHoverBg:    'rgba(99,102,241,0.16)',
}

export type MsgTheme = typeof msgLight

export const getMsgTheme = (isDarkMode: boolean): MsgTheme =>
  isDarkMode ? (msgDark as unknown as MsgTheme) : msgLight

import { useThemeMode } from '@/context/ThemeContext'
export function useMsgTheme(): MsgTheme {
  const { isDarkMode } = useThemeMode()
  return getMsgTheme(isDarkMode)
}

export const msgAccent = {
  primary: '#6366f1',
  danger:  '#ef4444',
  success: '#10b981',
}

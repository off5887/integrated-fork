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
}

export const getMsgTheme = (isDarkMode: boolean) =>
  isDarkMode ? msgDark : msgLight

export const msgAccent = {
  primary: '#6366f1',
  danger:  '#ef4444',
  success: '#10b981',
}

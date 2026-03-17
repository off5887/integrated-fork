// src/theme/navTheme.ts
// 헤더/네비게이션 전용 라이트/다크 팔레트

const navLight = {
  // ── 텍스트 ──
  textColor:       '#64748b',
  drawerTextColor: '#0f172a',
  nameColor:       '#1e293b',
  profileNameColor: '#0f172a',
  employeeIdColor: '#94a3b8',
  menuItemColor:   '#374151',

  // ── 액티브/액센트 ──
  activeColor: '#6366f1',

  // ── 배경: 활성 아이템 ──
  activeBg:        'rgba(99,102,241,0.1)',
  activeStrongBg:  'rgba(99,102,241,0.08)',
  activeHoverBg:   'rgba(99,102,241,0.12)',

  // ── 배경: 호버 ──
  hoverBg:         'rgba(99,102,241,0.07)',
  hoverStrongBg:   'rgba(99,102,241,0.04)',

  // ── 드롭다운 ──
  dropdownBg:      '#ffffff',
  dropdownBorder:  '1px solid rgba(203,213,225,0.6)',
  dropdownChildActiveBg: 'rgba(99,102,241,0.08)',
  dropdownChildHoverBg:  'rgba(99,102,241,0.07)',

  // ── 드로어 (모바일) ──
  drawerBg:        '#ffffff',
  drawerBorderLeft: '1px solid rgba(203,213,225,0.4)',

  // ── 아바타 ──
  avatarBg:        'rgba(99,102,241,0.13)',
  avatarBorder:    'rgba(99,102,241,0.28)',
  avatarBorderStrong: 'rgba(99,102,241,0.25)',

  // ── 유저 프로필 박스 (드로어) ──
  profileBoxBg:    'rgba(99,102,241,0.05)',
  profileBoxBorder: 'rgba(99,102,241,0.12)',

  // ── 구분선 ──
  dividerColor:    'rgba(203,213,225,0.6)',
  dividerColorWeak: 'rgba(203,213,225,0.4)',
  headerBorderLeft: 'rgba(203,213,225,0.5)',

  // ── 설정 메뉴 ──
  settingsActiveBg: 'rgba(99,102,241,0.06)',

  // ── 그룹 메뉴 ──
  groupActiveBg:   'rgba(99,102,241,0.06)',
  groupHoverBg:    'rgba(99,102,241,0.06)',
  groupBorderLeft: 'rgba(99,102,241,0.25)',
  subItemBg:       'rgba(99,102,241,0.04)',

  // ── 테마 전환 버튼 ──
  themeIconColor:  '#f59e0b',
  themeHoverBg:    'rgba(245,158,11,0.08)',
  themeHoverColor: '#d97706',

  // ── 로그아웃 ──
  logoutColor:     '#ef4444',
  logoutHoverBg:   'rgba(239,68,68,0.07)',

  // ── 앱바 (NavShell) ──
  appBarBg:            'rgba(255, 255, 255, 0.85)',
  appBarBorderBottom:  'rgba(203,213,225,0.4)',
  logoFilter:          'none',
  logoHoverFilter:     'drop-shadow(0 2px 8px rgba(99,102,241,0.3))',
} as const

const navDark = {
  // ── 텍스트 ──
  textColor:       '#94a3b8',
  drawerTextColor: '#e2e8f0',
  nameColor:       '#e2e8f0',
  profileNameColor: '#f1f5f9',
  employeeIdColor: '#475569',
  menuItemColor:   '#cbd5e1',

  // ── 액티브/액센트 ──
  activeColor: '#a5b4fc',

  // ── 배경: 활성 아이템 ──
  activeBg:        'rgba(99,102,241,0.15)',
  activeStrongBg:  'rgba(99,102,241,0.15)',
  activeHoverBg:   'rgba(99,102,241,0.2)',

  // ── 배경: 호버 ──
  hoverBg:         'rgba(99,102,241,0.1)',
  hoverStrongBg:   'rgba(99,102,241,0.08)',

  // ── 드롭다운 ──
  dropdownBg:      'rgba(13,17,30,0.97)',
  dropdownBorder:  '1px solid rgba(148,163,184,0.15)',
  dropdownChildActiveBg: 'rgba(99,102,241,0.15)',
  dropdownChildHoverBg:  'rgba(99,102,241,0.12)',

  // ── 드로어 (모바일) ──
  drawerBg:        'rgba(13,17,30,0.97)',
  drawerBorderLeft: '1px solid rgba(148,163,184,0.1)',

  // ── 아바타 ──
  avatarBg:        'rgba(99,102,241,0.22)',
  avatarBorder:    'rgba(99,102,241,0.4)',
  avatarBorderStrong: 'rgba(99,102,241,0.35)',

  // ── 유저 프로필 박스 (드로어) ──
  profileBoxBg:    'rgba(99,102,241,0.07)',
  profileBoxBorder: 'rgba(99,102,241,0.18)',

  // ── 구분선 ──
  dividerColor:    'rgba(148,163,184,0.1)',
  dividerColorWeak: 'rgba(148,163,184,0.1)',
  headerBorderLeft: 'rgba(148,163,184,0.12)',

  // ── 설정 메뉴 ──
  settingsActiveBg: 'rgba(99,102,241,0.1)',

  // ── 그룹 메뉴 ──
  groupActiveBg:   'rgba(99,102,241,0.1)',
  groupHoverBg:    'rgba(99,102,241,0.1)',
  groupBorderLeft: 'rgba(99,102,241,0.3)',
  subItemBg:       'rgba(99,102,241,0.06)',

  // ── 테마 전환 버튼 ──
  themeIconColor:  '#fbbf24',
  themeHoverBg:    'rgba(251,191,36,0.1)',
  themeHoverColor: '#fbbf24',

  // ── 로그아웃 ──
  logoutColor:     '#fca5a5',
  logoutHoverBg:   'rgba(239,68,68,0.12)',

  // ── 앱바 (NavShell) ──
  appBarBg:            'rgba(13, 17, 30, 0.85)',
  appBarBorderBottom:  'rgba(148,163,184,0.08)',
  logoFilter:          'drop-shadow(0 0 8px rgba(99,102,241,0.4))',
  logoHoverFilter:     'drop-shadow(0 0 12px rgba(99,102,241,0.6))',
} as const

export type NavTheme = typeof navLight

/** isDarkMode 값을 넘기면 해당 팔레트를 반환합니다. */
export const getNavTheme = (isDarkMode: boolean): NavTheme =>
  isDarkMode ? (navDark as unknown as NavTheme) : navLight

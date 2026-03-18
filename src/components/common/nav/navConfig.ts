import type { IconName, MenuItem, SubMenuItem } from '@/api/types/nav'

export type { IconName, MenuItem, SubMenuItem }

export const menuItems: MenuItem[] = [
  { iconName: 'Dashboard',    text: '대시보드', path: '/dashboard' },
  { iconName: 'Lightbulb',    text: '상상하기', path: '/newIdea' },
  { iconName: 'AutoStories',  text: '상상보기', path: '/ideaBrowse' },
  { iconName: 'AttachMoney',  text: '마일리지', path: '/rqMileage' },
  { iconName: 'RateReview',   text: '심사하기', path: '/judge',   roles: ['reviewer', 'admin'] },
  { iconName: 'BarChart',     text: '통계',     path: '/stats' },
  {
    iconName: 'Groups',
    text: 'TF',
    children: [
      { iconName: 'Security', text: '용병 지원', path: '/mercenary-support' },
      { iconName: 'GroupAdd', text: '용병 관리', path: '/mercenary-management' },
    ],
  },
]

export const settingsItem: SubMenuItem = {
  iconName: 'Settings',
  text: '설정',
  path: '/settings',
  roles: ['admin'],
}

export const introItem: SubMenuItem = {
  iconName: 'InfoOutlined',
  text: '시스템소개',
  path: '/welcome',
}

import * as MuiIcons from '@mui/icons-material'

export type IconName = keyof typeof MuiIcons

export type SubMenuItem = {
  iconName: IconName
  text: string
  path: string
}

export type MenuItem = {
  iconName: IconName
  text: string
  path?: string
  children?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  { iconName: 'Dashboard', text: '대시보드', path: '/dashboard' },
  { iconName: 'Lightbulb', text: '상상하기', path: '/newIdea' },
  { iconName: 'AttachMoney', text: '마일리지', path: '/rqMileage' },
  { iconName: 'RateReview', text: '심사하기', path: '/judge' },
  { iconName: 'BarChart', text: '통계', path: '/stats' },
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
}

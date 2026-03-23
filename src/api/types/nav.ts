import type { UserRole } from '@/api/types/auth'

export type IconName =
  | 'Dashboard'
  | 'Lightbulb'
  | 'AutoStories'
  | 'AttachMoney'
  | 'RateReview'
  | 'Groups'
  | 'Security'
  | 'GroupAdd'
  | 'Settings'
  | 'InfoOutlined'

export type SubMenuItem = {
  iconName: IconName
  text: string
  path: string
  roles?: UserRole[]
}

export type MenuItem = {
  iconName: IconName
  text: string
  path?: string
  children?: SubMenuItem[]
  roles?: UserRole[]
}

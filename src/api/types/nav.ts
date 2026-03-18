import * as MuiIcons from '@mui/icons-material'
import type { UserRole } from '@/api/types/auth'

export type IconName = keyof typeof MuiIcons

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

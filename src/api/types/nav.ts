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

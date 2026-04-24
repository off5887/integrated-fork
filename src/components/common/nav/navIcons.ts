// src/components/common/nav/navIcons.ts
// 네비게이션에서 사용하는 MUI 아이콘만 개별 import — import * as MuiIcons 대체
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import BarChartIcon from '@mui/icons-material/BarChart'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupsIcon from '@mui/icons-material/Groups'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockResetIcon from '@mui/icons-material/LockReset'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LogoutIcon from '@mui/icons-material/Logout'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import type { SvgIconComponent } from '@mui/icons-material'
import type { IconName } from '@/api/types/nav'

// 동적 아이콘 조회용 맵 (navConfig의 iconName → 컴포넌트)
export const NAV_ICON_MAP: Record<IconName, SvgIconComponent> = {
  Dashboard:    DashboardIcon,
  Lightbulb:    LightbulbIcon,
  AutoStories:  AutoStoriesIcon,
  AttachMoney:  AttachMoneyIcon,
  RateReview:   RateReviewIcon,
  BarChart:     BarChartIcon,
  Groups:       GroupsIcon,
  Security:     SecurityIcon,
  GroupAdd:     GroupAddIcon,
  Settings:     SettingsIcon,
  InfoOutlined: InfoOutlinedIcon,
  Mail:         MailOutlineIcon,
}

// 직접 사용 아이콘 re-export
export {
  KeyboardArrowDownIcon,
  InfoOutlinedIcon,
  LockResetIcon,
  SettingsIcon,
  WbSunnyIcon,
  NightsStayIcon,
  LogoutIcon,
  HelpOutlineIcon,
}

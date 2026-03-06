// src/components/common/Header/Header.tsx
import * as MuiIcons from '@mui/icons-material'
import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import MobileToolbar from './MobileToolbar'

const menuItems = [
  { iconName: 'Dashboard' as const, text: '대시보드', path: '/dashboard' },
  { iconName: 'Lightbulb' as const, text: '상상하기', path: '/newIdea' },
  { iconName: 'AttachMoney' as const, text: '마일리지', path: '/rqMileage' }, // Savings → AttachMoney
  { iconName: 'RateReview' as const, text: '심사하기', path: '/judge' },
  { iconName: 'BarChart' as const, text: '통계', path: '/stats' },
  {
    iconName: 'Security' as const,
    text: '용병 지원',
    path: '/mercenary-support',
  },
  {
    iconName: 'GroupAdd' as const,
    text: '용병 관리',
    path: '/mercenary-management',
  },
] as const

const settingsItem = {
  iconName: 'Settings' as const,
  text: '설정',
  path: '/settings',
}

type IconName = keyof typeof MuiIcons

export default function Header() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navBg = isDarkMode
    ? 'rgba(13, 17, 30, 0.85)'
    : 'rgba(255, 255, 255, 0.85)'
  const borderBottomColor = isDarkMode
    ? 'rgba(148,163,184,0.08)'
    : 'rgba(203,213,225,0.4)'

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(24px) saturate(180%)',
          bgcolor: navBg,
          borderBottom: `1px solid ${borderBottomColor}`,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 60, md: 62 },
            px: { xs: 2, md: 3 },
          }}
        >
          {/* 로고 */}
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              flexShrink: 0,
              mr: { md: 3 },
            }}
          >
            <Box
              component="img"
              src="/gomgom_logo.png"
              alt="Gomgom"
              sx={{
                height: { xs: 32, md: 36 },
                width: 'auto',
                filter: isDarkMode
                  ? 'drop-shadow(0 0 8px rgba(99,102,241,0.4))'
                  : 'none',
                transition: 'filter 0.2s',
                '&:hover': {
                  filter: isDarkMode
                    ? 'drop-shadow(0 0 12px rgba(99,102,241,0.6))'
                    : 'drop-shadow(0 2px 8px rgba(99,102,241,0.3))',
                },
              }}
            />
          </Box>

          {/* PC 네비게이션 */}
          {!isMobile && (
            <DesktopNavigation
              menuItems={menuItems}
              settingsItem={settingsItem}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
            />
          )}

          {/* 모바일 툴바 액션 */}
          {isMobile && (
            <MobileToolbar
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onOpenDrawer={() => setDrawerOpen(true)}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      {isMobile && (
        <MobileNavigationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          menuItems={menuItems}
          settingsItem={settingsItem}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      )}

      <Box sx={{ minHeight: { xs: 60, md: 62 } }} />
    </>
  )
}

import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/ThemeContext'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import MobileToolbar from './MobileToolbar'

export default function Header() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { isDarkMode } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navBg = isDarkMode
    ? 'rgba(13, 17, 30, 0.85)'
    : 'rgba(255, 255, 255, 0.85)'
  const borderBottomColor = isDarkMode
    ? 'rgba(148,163,184,0.08)'
    : 'rgba(203,213,225,0.4)'

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
              src="/src/assets/gomgom_logo.png"
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

          {!isMobile && <DesktopNavigation />}

          {isMobile && <MobileToolbar onOpenDrawer={() => setDrawerOpen(true)} />}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <MobileNavigationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      <Box sx={{ minHeight: { xs: 60, md: 62 } }} />
    </>
  )
}

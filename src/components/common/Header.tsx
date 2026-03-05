// src/components/Common/Header.tsx
import BarChartIcon from '@mui/icons-material/BarChart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SavingsIcon from '@mui/icons-material/Savings'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  alpha,
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

const menuItems = [
  {
    icon: <DashboardIcon fontSize="small" />,
    text: '대시보드',
    path: '/dashboard',
  },
  {
    icon: <LightbulbIcon fontSize="small" />,
    text: '상상하기',
    path: '/newIdea',
  },
  {
    icon: <SavingsIcon fontSize="small" />,
    text: '마일리지',
    path: '/rqMileage',
  },
  {
    icon: <RateReviewIcon fontSize="small" />,
    text: '심사하기',
    path: '/judge',
  },
  { icon: <BarChartIcon fontSize="small" />, text: '통계', path: '/stats' },
]

const settingsItem = {
  icon: <SettingsIcon fontSize="small" />,
  text: '설정',
  path: '/settings',
}

export default function Header() {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const pillBg = isDarkMode
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.82) 0%, rgba(15, 23, 42, 0.72) 100%)'
    : 'linear-gradient(135deg, rgba(241, 245, 249, 0.88) 0%, rgba(226, 232, 240, 0.78) 100%)'

  const pillBorder = isDarkMode
    ? '1px solid rgba(255,255,255,0.10)'
    : '1px solid rgba(0,0,0,0.08)'

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open)

  const handleNavigate = (path: string) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }

  const navContent = (
    <>
      {/* 로고 */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Box
          component="img"
          src="/gomgom_logo.png"
          alt="Gomgom"
          sx={{
            height: { xs: 32, md: 36 },
            mr: 2,
            filter: isDarkMode ? 'brightness(1.15) contrast(1.05)' : 'none',
          }}
        />
      </Box>

      {/* PC 메뉴 아이템들 */}
      {!isMobile && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: { md: 1, lg: 2 } }}
        >
          {menuItems.map((item) => (
            <Box
              key={item.text}
              onClick={() => handleNavigate(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.8,
                borderRadius: 2,
                color: isDarkMode ? '#e2e8f0' : 'text.primary',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: isDarkMode
                    ? alpha('#6366f1', 0.14)
                    : alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 우측 아이콘들 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="설정" arrow>
          <IconButton
            size="small"
            onClick={() => handleNavigate(settingsItem.path)}
            sx={{ color: isDarkMode ? '#cbd5e1' : 'text.primary' }}
          >
            {settingsItem.icon}
          </IconButton>
        </Tooltip>

        <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'} arrow>
          <IconButton
            size="small"
            onClick={toggleTheme}
            sx={{ color: isDarkMode ? '#cbd5e1' : 'text.primary' }}
          >
            {isDarkMode ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="로그아웃" arrow>
          <IconButton
            size="small"
            onClick={handleLogout}
            sx={{ color: isDarkMode ? '#fca5a5' : 'error.main' }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {isMobile && (
          <IconButton
            size="medium"
            onClick={toggleDrawer(true)}
            sx={{ color: isDarkMode ? '#cbd5e1' : 'text.primary', ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
    </>
  )

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(20px) saturate(180%)',
          backgroundImage: pillBg,
          borderBottom: pillBorder,
          backgroundColor: 'transparent',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, sm: 3, md: 5, lg: 8 },
            justifyContent: 'space-between',
          }}
        >
          {navContent}
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 300,
            backdropFilter: 'blur(32px)',
            backgroundImage: pillBg,
            borderLeft: pillBorder,
          },
        }}
      >
        <Box sx={{ p: 3, pt: 5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box
              component="img"
              src="/gomgom_logo.png"
              alt="Gomgom"
              sx={{
                height: 42,
                filter: isDarkMode ? 'brightness(1.15) contrast(1.05)' : 'none',
              }}
            />
            <IconButton onClick={toggleDrawer(false)} size="large">
              <CloseIcon />
            </IconButton>
          </Box>

          <List disablePadding>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.4,
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isDarkMode ? '#c7d2fe' : 'primary.main' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding sx={{ mb: 0.5, mt: 2 }}>
              <ListItemButton
                onClick={() => handleNavigate(settingsItem.path)}
                sx={{ borderRadius: 2, py: 1.4 }}
              >
                <ListItemIcon
                  sx={{ color: isDarkMode ? '#c7d2fe' : 'primary.main' }}
                >
                  {settingsItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={settingsItem.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mt: 3 }}>
              <ListItemButton
                onClick={toggleTheme}
                sx={{ borderRadius: 2, py: 1.4 }}
              >
                <ListItemIcon
                  sx={{ color: isDarkMode ? '#fde68a' : 'warning.main' }}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                <ListItemText
                  primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mt: 1 }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{ borderRadius: 2, py: 1.4 }}
              >
                <ListItemIcon
                  sx={{ color: isDarkMode ? '#f87171' : 'error.main' }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="로그아웃"
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: isDarkMode ? '#f87171' : 'error.main',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 콘텐츠가 헤더에 가려지지 않도록 spacer */}
      <Box sx={{ height: { xs: 64, md: 72 } }} />
    </>
  )
}

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
import SettingsIcon from '@mui/icons-material/Settings' // ← 추가
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext' // 경로에 맞게 수정 필요

const menuItems = [
  { icon: <DashboardIcon />, text: '대시보드', path: '/dashboard' },
  { icon: <LightbulbIcon />, text: '상상하기', path: '/newIdea' },
  { icon: <SavingsIcon />, text: '마일리지', path: '/rqMileage' },
  { icon: <RateReviewIcon />, text: '심사하기', path: '/judge' },
  { icon: <BarChartIcon />, text: '통계', path: '/stats' },
]

// 설정 메뉴 항목 (필요하면 나중에 하위 메뉴로 확장 가능)
const settingsItem = { icon: <SettingsIcon />, text: '설정', path: '/settings' }

export default function Header() {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    setDrawerOpen(false)
  }

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
          bgcolor: isDarkMode
            ? 'rgba(15, 23, 42, 0.75)'
            : 'rgba(241, 245, 249, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 68 }, px: { xs: 2, md: 4 } }}>
          {/* 로고 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/gomgom_logo.png"
              alt="Gomgom Logo"
              sx={{
                height: { xs: 38, md: 46 },
                width: 'auto',
                filter: isDarkMode
                  ? 'drop-shadow(0 2px 12px rgba(99, 102, 241, 0.5))'
                  : 'drop-shadow(0 2px 12px rgba(59, 130, 246, 0.4))',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
              }}
            />
          </Box>

          {/* 중앙 빈 공간 */}
          <Box sx={{ flexGrow: 1 }} />

          {/* PC 버전: 텍스트 메뉴 + 설정 + 테마 + 로그아웃 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  startIcon={item.icon}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderRadius: 1.5,
                    px: 2,
                    py: 0.75,
                    minWidth: 'auto',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)',
                      color: isDarkMode ? '#c7d2fe' : '#1d4ed8',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* 설정 아이콘 (PC) */}
              <Tooltip title="설정" arrow placement="bottom">
                <IconButton
                  onClick={() => handleNavigate(settingsItem.path)}
                  sx={{
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)',
                    },
                  }}
                >
                  {settingsItem.icon}
                </IconButton>
              </Tooltip>

              {/* 테마 토글 */}
              <Tooltip
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                arrow
                placement="bottom"
              >
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(249, 115, 22, 0.15)'
                        : 'rgba(234, 88, 12, 0.15)',
                    },
                  }}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* 로그아웃 */}
              <Tooltip title="로그아웃" arrow placement="bottom">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(220, 38, 38, 0.15)',
                      color: '#ef4444',
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* 모바일 버전: 테마 토글 + 햄버거 메뉴 */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: isDarkMode ? '#f1f5f9' : '#111827',
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{
                  color: isDarkMode ? '#f1f5f9' : '#111827',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: isDarkMode ? '#0f172a' : '#f8fafc',
            backdropFilter: 'blur(24px)',
            borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
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
              alt="Gomgom Logo"
              sx={{ height: 40 }}
            />
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{ color: isDarkMode ? '#f1f5f9' : '#111827' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isDarkMode ? '#c7d2fe' : '#3b82f6' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: isDarkMode ? '#f1f5f9' : '#111827',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {/* 설정 메뉴 (모바일) */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(settingsItem.path)}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'rgba(59, 130, 246, 0.15)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isDarkMode ? '#c7d2fe' : '#3b82f6' }}
                >
                  {settingsItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={settingsItem.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Divider
              sx={{
                my: 2,
                borderColor: isDarkMode
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(0,0,0,0.12)',
              }}
            />

            {/* 모바일 테마 토글 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={toggleTheme}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(249, 115, 22, 0.15)'
                      : 'rgba(234, 88, 12, 0.15)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isDarkMode ? '#c7d2fe' : '#3b82f6' }}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                <ListItemText
                  primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: isDarkMode ? '#f1f5f9' : '#111827',
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* 모바일 로그아웃 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(220, 38, 38, 0.15)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ef4444' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="로그아웃"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: '#ef4444',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 헤더 높이만큼 spacer */}
      <Toolbar />
    </>
  )
}

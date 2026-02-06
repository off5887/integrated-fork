// src/components/Common/Header.tsx
import BarChartIcon from '@mui/icons-material/BarChart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LogoutIcon from '@mui/icons-material/Logout' // ← 로그아웃 아이콘 추가
import MenuIcon from '@mui/icons-material/Menu'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SavingsIcon from '@mui/icons-material/Savings'
import {
  AppBar,
  Box,
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
  { icon: <LightbulbIcon />, text: '상상하기', path: '/proposals/new' },
  { icon: <SavingsIcon />, text: '마일리지', path: '/mileage' },
  { icon: <RateReviewIcon />, text: '심사하기', path: '/review' },
  { icon: <BarChartIcon />, text: '통계', path: '/stats' },
]

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
    // 필요 시 다른 토큰/세션 정리
    // localStorage.clear(); // 전체 지우고 싶을 때 (주의)
    window.location.href = '/login' // 강제 리다이렉트 (새로고침 포함)
    // 또는 navigate('/login'); // 하지만 상태 초기화가 확실치 않을 수 있음
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isDarkMode
            ? 'rgba(15, 23, 42, 0.68)' // slate-950 기반 투명
            : 'rgba(241, 245, 249, 0.78)', // slate-50 기반 투명
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
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

          {/* PC 버전: 아이콘 메뉴 + 테마 토글 + 로그아웃 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {menuItems.map((item) => (
                <Tooltip
                  key={item.text}
                  title={item.text}
                  arrow
                  placement="bottom"
                >
                  <IconButton
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: isDarkMode
                          ? 'rgba(99, 102, 241, 0.12)'
                          : 'rgba(59, 130, 246, 0.12)',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}

              {/* 테마 토글 */}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(249, 115, 22, 0.12)'
                      : 'rgba(234, 88, 12, 0.12)',
                  },
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {/* 로그아웃 버튼 (PC) */}
              <Tooltip title="로그아웃" arrow placement="bottom">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(239, 68, 68, 0.12)'
                        : 'rgba(220, 38, 38, 0.12)',
                      color: 'error.main',
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
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                color="inherit"
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
            bgcolor: isDarkMode
              ? 'rgba(15, 23, 42, 0.94)'
              : 'rgba(241, 245, 249, 0.94)',
            backdropFilter: 'blur(24px)',
            borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
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
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* 모바일 테마 토글 */}
            <ListItem disablePadding>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                <ListItemText
                  primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>

            {/* 모바일 로그아웃 */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="로그아웃"
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'error.main',
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

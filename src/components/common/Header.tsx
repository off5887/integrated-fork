// src/components/common/Header.tsx  ← 최종 합본 예시

import BarChartIcon from '@mui/icons-material/BarChart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SavingsIcon from '@mui/icons-material/Savings'
import SecurityIcon from '@mui/icons-material/Security' // tf-management-ui에서 추가
import SettingsIcon from '@mui/icons-material/Settings'

import {
  AppBar,
  Box,
  Button,
  Divider, // tf-management-ui에서 사용
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
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

// ─────────────── 메뉴 아이템 합치기 ───────────────
// tf-management-ui의 구조 + integrated-main의 메뉴 이름/경로 유지
const menuItems = [
  { icon: <DashboardIcon />, text: '대시보드', path: '/dashboard' },
  { icon: <LightbulbIcon />, text: '상상하기', path: '/newIdea' },
  { icon: <SavingsIcon />, text: '마일리지', path: '/rqMileage' },
  { icon: <RateReviewIcon />, text: '심사하기', path: '/judge' },
  { icon: <BarChartIcon />, text: '통계', path: '/stats' },
  // tf-management-ui에서 새로 추가된 메뉴들
  { icon: <SecurityIcon />, text: '용병 지원', path: '/mercenary-support' },
  { icon: <GroupAddIcon />, text: '용병 관리', path: '/mercenary-management' },
]

const settingsItem = { icon: <SettingsIcon />, text: '설정', path: '/settings' }

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
      {/* 로고 - tf-management-ui 스타일 유지 (더 멋짐) */}
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

      <Box sx={{ flexGrow: 1 }} />

      {/* PC 메뉴 - tf-management-ui의 Button 스타일 유지 */}
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

          {/* 우측 아이콘들 - tf-management-ui 스타일 */}
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

      {isMobile && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: isDarkMode ? '#f1f5f9' : '#111827' }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ color: isDarkMode ? '#f1f5f9' : '#111827' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
    </>
  )

  // 나머지 부분은 tf-management-ui 버전 그대로 사용
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
        <Toolbar sx={{ minHeight: { xs: 64, md: 68 }, px: { xs: 2, md: 4 } }}>
          {navContent}
        </Toolbar>
      </AppBar>
      {/* 모바일 Drawer - tf-management-ui 버전 유지 */}
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
                  sx={{ borderRadius: 2, py: 1.4 }}
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

            <Divider
              sx={{
                my: 2,
                borderColor: isDarkMode
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(0,0,0,0.12)',
              }}
            />

            <ListItem disablePadding>
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

            <ListItem disablePadding>
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

            <ListItem disablePadding>
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
                  primaryTypographyProps={{ fontWeight: 600, color: '#ef4444' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Toolbar /> {/* spacer */}
    </>
  )
}

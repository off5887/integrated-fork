// src/components/common/Header.tsx
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
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'

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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'

const menuItems = [
  { icon: <DashboardIcon fontSize="small" />, text: '대시보드', path: '/dashboard' },
  { icon: <LightbulbIcon fontSize="small" />, text: '상상하기', path: '/newIdea' },
  { icon: <SavingsIcon fontSize="small" />, text: '마일리지', path: '/rqMileage' },
  { icon: <RateReviewIcon fontSize="small" />, text: '심사하기', path: '/judge' },
  { icon: <BarChartIcon fontSize="small" />, text: '통계', path: '/stats' },
  { icon: <SecurityIcon fontSize="small" />, text: '용병 지원', path: '/mercenary-support' },
  { icon: <GroupAddIcon fontSize="small" />, text: '용병 관리', path: '/mercenary-management' },
]

const settingsItem = { icon: <SettingsIcon fontSize="small" />, text: '설정', path: '/settings' }

export default function Header() {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open)

  const handleNavigate = (path: string) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }

  const isActive = (path: string) => location.pathname === path

  const navBg = isDarkMode
    ? 'rgba(13, 17, 30, 0.85)'
    : 'rgba(255, 255, 255, 0.85)'

  const activeColor = isDarkMode ? '#a5b4fc' : '#6366f1'
  const textColor = isDarkMode ? '#94a3b8' : '#64748b'
  const hoverBg = isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)'

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(24px) saturate(180%)',
          bgcolor: navBg,
          borderBottom: isDarkMode
            ? '1px solid rgba(148,163,184,0.08)'
            : '1px solid rgba(203,213,225,0.4)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 60, md: 62 },
            px: { xs: 2, md: 3 },
            gap: 0,
          }}
        >
          {/* 로고 */}
          <Box
            onClick={() => handleNavigate('/dashboard')}
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
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  mr: 2,
                }}
              >
                {menuItems.map((item) => {
                  const active = isActive(item.path)
                  return (
                    <Box
                      key={item.text}
                      onClick={() => handleNavigate(item.path)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        bgcolor: active ? (isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)') : 'transparent',
                        '&:hover': {
                          bgcolor: active ? (isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)') : hoverBg,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          color: active ? activeColor : textColor,
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '1rem',
                          transition: 'color 0.15s',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: '0.82rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? activeColor : textColor,
                          letterSpacing: '-0.01em',
                          transition: 'all 0.15s',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.text}
                      </Typography>
                      {active && (
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            borderRadius: '2px 2px 0 0',
                            bgcolor: activeColor,
                          }}
                        />
                      )}
                    </Box>
                  )
                })}
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* 우측 액션 아이콘 그룹 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <Tooltip title="설정" arrow placement="bottom">
                  <IconButton
                    onClick={() => handleNavigate(settingsItem.path)}
                    size="small"
                    sx={{
                      color: isActive('/settings') ? activeColor : textColor,
                      bgcolor: isActive('/settings') ? (isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)') : 'transparent',
                      '&:hover': { bgcolor: hoverBg, color: activeColor },
                      transition: 'all 0.15s',
                    }}
                  >
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={isDarkMode ? '라이트 모드' : '다크 모드'} arrow placement="bottom">
                  <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                      color: textColor,
                      '&:hover': { bgcolor: hoverBg, color: isDarkMode ? '#fbbf24' : '#f59e0b' },
                      transition: 'all 0.15s',
                    }}
                  >
                    {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="로그아웃" arrow placement="bottom">
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    sx={{
                      color: textColor,
                      '&:hover': { bgcolor: isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)', color: '#ef4444' },
                      transition: 'all 0.15s',
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}

          {/* 모바일 */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ color: textColor }}
              >
                {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                size="small"
                sx={{ color: textColor }}
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
            bgcolor: isDarkMode ? 'rgba(13,17,30,0.97)' : '#ffffff',
            backdropFilter: 'blur(24px)',
            borderLeft: isDarkMode ? '1px solid rgba(148,163,184,0.1)' : '1px solid rgba(203,213,225,0.4)',
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          {/* Drawer 헤더 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box
              component="img"
              src="/gomgom_logo.png"
              alt="Gomgom"
              sx={{
                height: 34,
                filter: isDarkMode ? 'brightness(1.1)' : 'none',
              }}
            />
            <IconButton
              onClick={toggleDrawer(false)}
              size="small"
              sx={{ color: textColor }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 네비게이션 */}
          <List disablePadding sx={{ mb: 1 }}>
            {menuItems.map((item) => {
              const active = isActive(item.path)
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      py: 1.1,
                      px: 1.5,
                      bgcolor: active ? (isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)') : 'transparent',
                      '&:hover': {
                        bgcolor: active
                          ? (isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)')
                          : (isDarkMode ? 'rgba(148,163,184,0.06)' : 'rgba(203,213,225,0.3)'),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: active ? activeColor : textColor }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: active ? 700 : 500, color: active ? activeColor : (isDarkMode ? '#e2e8f0' : '#0f172a') }}>
                          {item.text}
                        </Typography>
                      }
                    />
                    {active && (
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: activeColor,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>

          <Divider sx={{ borderColor: isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.4)', my: 1.5 }} />

          {/* 유틸리티 */}
          <List disablePadding>
            <ListItem disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                onClick={() => handleNavigate(settingsItem.path)}
                sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: textColor }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: isDarkMode ? '#e2e8f0' : '#0f172a' }}>설정</Typography>}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton onClick={toggleTheme} sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 36, color: isDarkMode ? '#fbbf24' : '#f59e0b' }}>
                  {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: isDarkMode ? '#e2e8f0' : '#0f172a' }}>{isDarkMode ? '라이트 모드' : '다크 모드'}</Typography>}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 36, color: '#ef4444' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#ef4444' }}>로그아웃</Typography>}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ minHeight: { xs: 60, md: 62 } }} />
    </>
  )
}

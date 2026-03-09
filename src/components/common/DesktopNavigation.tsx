// src/components/common/Header/DesktopNavigation.tsx
import * as MuiIcons from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

type IconName = keyof typeof MuiIcons

interface DesktopNavigationProps {
  menuItems: Array<{ iconName: IconName; text: string; path: string }>
  settingsItem: { iconName: IconName; text: string; path: string }
  isDarkMode: boolean
  toggleTheme: () => void
  onLogout: () => void
}

export default function DesktopNavigation({
  menuItems,
  settingsItem,
  isDarkMode,
  toggleTheme,
  onLogout,
}: DesktopNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const activeColor = isDarkMode ? '#a5b4fc' : '#6366f1'
  const textColor = isDarkMode ? '#94a3b8' : '#64748b'
  const hoverBg = isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)'

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* 메뉴 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path)
          const IconComponent = MuiIcons[item.iconName] || MuiIcons.HelpOutline // fallback

          return (
            <Box
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                bgcolor: active
                  ? isDarkMode
                    ? 'rgba(99,102,241,0.15)'
                    : 'rgba(99,102,241,0.1)'
                  : 'transparent',
                '&:hover': {
                  bgcolor: active
                    ? isDarkMode
                      ? 'rgba(99,102,241,0.2)'
                      : 'rgba(99,102,241,0.12)'
                    : hoverBg,
                },
                position: 'relative',
              }}
            >
              <IconComponent
                fontSize="small"
                sx={{ color: active ? activeColor : textColor }}
              />
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? activeColor : textColor,
                  letterSpacing: '-0.01em',
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

      {/* 우측 액션 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <Tooltip title="설정" arrow placement="bottom">
          <IconButton
            onClick={() => navigate(settingsItem.path)}
            size="small"
            sx={{
              color: isActive('/settings') ? activeColor : textColor,
              bgcolor: isActive('/settings')
                ? isDarkMode
                  ? 'rgba(99,102,241,0.12)'
                  : 'rgba(99,102,241,0.08)'
                : 'transparent',
              '&:hover': { bgcolor: hoverBg, color: activeColor },
            }}
          >
            <MuiIcons.Settings fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={isDarkMode ? '라이트 모드' : '다크 모드'}
          arrow
          placement="bottom"
        >
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              color: textColor,
              '&:hover': {
                bgcolor: hoverBg,
                color: isDarkMode ? '#fbbf24' : '#f59e0b',
              },
            }}
          >
            {isDarkMode ? (
              <MuiIcons.WbSunny fontSize="small" />
            ) : (
              <MuiIcons.NightsStay fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="로그아웃" arrow placement="bottom">
          <IconButton
            onClick={onLogout}
            size="small"
            sx={{
              color: textColor,
              '&:hover': {
                bgcolor: isDarkMode
                  ? 'rgba(239,68,68,0.12)'
                  : 'rgba(239,68,68,0.08)',
                color: '#ef4444',
              },
            }}
          >
            <MuiIcons.Logout fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  )
}

// src/components/common/Header/DesktopNavigation.tsx
import * as MuiIcons from '@mui/icons-material'
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuItem, SubMenuItem } from './headerConfig'

interface DesktopNavigationProps {
  menuItems: MenuItem[]
  settingsItem: SubMenuItem
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
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeColor = isDarkMode ? '#a5b4fc' : '#6366f1'
  const textColor = isDarkMode ? '#94a3b8' : '#64748b'
  const hoverBg = isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)'
  const dropdownBg = isDarkMode ? 'rgba(13,17,30,0.97)' : '#ffffff'
  const dropdownBorder = isDarkMode
    ? '1px solid rgba(148,163,184,0.15)'
    : '1px solid rgba(203,213,225,0.6)'

  const isActive = (path: string) => location.pathname === path
  const isGroupActive = (children: SubMenuItem[]) =>
    children.some((c) => location.pathname === c.path)

  const handleGroupEnter = (text: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setOpenGroup(text)
  }

  const handleGroupLeave = () => {
    hoverTimer.current = setTimeout(() => setOpenGroup(null), 120)
  }

  const handleDropdownEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
  }

  return (
    <>
      {/* 메뉴 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
        {menuItems.map((item) => {
          // 그룹 메뉴 (드롭다운)
          if (item.children) {
            const groupActive = isGroupActive(item.children)
            const isOpen = openGroup === item.text
            const IconComponent =
              MuiIcons[item.iconName] || MuiIcons.HelpOutline

            return (
              <Box
                key={item.text}
                onMouseEnter={() => handleGroupEnter(item.text)}
                onMouseLeave={handleGroupLeave}
                sx={{ position: 'relative' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    cursor: 'default',
                    transition: 'all 0.15s ease',
                    bgcolor:
                      groupActive || isOpen
                        ? isDarkMode
                          ? 'rgba(99,102,241,0.15)'
                          : 'rgba(99,102,241,0.1)'
                        : 'transparent',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99,102,241,0.15)'
                        : 'rgba(99,102,241,0.1)',
                    },
                    position: 'relative',
                  }}
                >
                  <IconComponent
                    fontSize="small"
                    sx={{ color: groupActive || isOpen ? activeColor : textColor }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.82rem',
                      fontWeight: groupActive || isOpen ? 700 : 500,
                      color: groupActive || isOpen ? activeColor : textColor,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.text}
                  </Typography>
                  <MuiIcons.KeyboardArrowDown
                    sx={{
                      fontSize: '1rem',
                      color: groupActive || isOpen ? activeColor : textColor,
                      transition: 'transform 0.2s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  {groupActive && (
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

                {/* 드롭다운 패널 */}
                {isOpen && (
                  <Paper
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleGroupLeave}
                    elevation={8}
                    sx={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: 148,
                      bgcolor: dropdownBg,
                      border: dropdownBorder,
                      borderRadius: 2,
                      overflow: 'hidden',
                      backdropFilter: 'blur(24px)',
                      zIndex: 1300,
                      py: 0.5,
                      animation: 'fadeSlideDown 0.15s ease',
                      '@keyframes fadeSlideDown': {
                        from: { opacity: 0, transform: 'translateX(-50%) translateY(-6px)' },
                        to: { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
                      },
                    }}
                  >
                    {item.children.map((child) => {
                      const childActive = isActive(child.path)
                      const ChildIcon =
                        MuiIcons[child.iconName] || MuiIcons.HelpOutline

                      return (
                        <Box
                          key={child.text}
                          onClick={() => {
                            navigate(child.path)
                            setOpenGroup(null)
                          }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1.5,
                            py: 0.9,
                            cursor: 'pointer',
                            bgcolor: childActive
                              ? isDarkMode
                                ? 'rgba(99,102,241,0.15)'
                                : 'rgba(99,102,241,0.08)'
                              : 'transparent',
                            transition: 'background 0.12s ease',
                            '&:hover': {
                              bgcolor: isDarkMode
                                ? 'rgba(99,102,241,0.12)'
                                : 'rgba(99,102,241,0.07)',
                            },
                          }}
                        >
                          <ChildIcon
                            fontSize="small"
                            sx={{
                              fontSize: '1rem',
                              color: childActive ? activeColor : textColor,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '0.82rem',
                              fontWeight: childActive ? 700 : 500,
                              color: childActive ? activeColor : textColor,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {child.text}
                          </Typography>
                        </Box>
                      )
                    })}
                  </Paper>
                )}
              </Box>
            )
          }

          // 일반 메뉴
          const active = isActive(item.path!)
          const IconComponent = MuiIcons[item.iconName] || MuiIcons.HelpOutline

          return (
            <Box
              key={item.text}
              onClick={() => navigate(item.path!)}
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

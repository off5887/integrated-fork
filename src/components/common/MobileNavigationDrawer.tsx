// src/components/common/Header/MobileNavigationDrawer.tsx
import * as MuiIcons from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuItem, SubMenuItem } from './headerConfig'

interface MobileNavigationDrawerProps {
  open: boolean
  onClose: () => void
  menuItems: MenuItem[]
  settingsItem: SubMenuItem
  isDarkMode: boolean
  toggleTheme: () => void
  onLogout: () => void
}

export default function MobileNavigationDrawer({
  open,
  onClose,
  menuItems,
  settingsItem,
  isDarkMode,
  toggleTheme,
  onLogout,
}: MobileNavigationDrawerProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const textColor = isDarkMode ? '#e2e8f0' : '#0f172a'
  const activeColor = isDarkMode ? '#a5b4fc' : '#6366f1'
  const subItemBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)'

  const isActive = (path: string) => location.pathname === path
  const isGroupActive = (children: SubMenuItem[]) =>
    children.some((c) => location.pathname === c.path)

  const handleGroupToggle = (text: string) => {
    setExpandedGroup((prev) => (prev === text ? null : text))
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: isDarkMode ? 'rgba(13,17,30,0.97)' : '#ffffff',
          backdropFilter: 'blur(24px)',
          borderLeft: isDarkMode
            ? '1px solid rgba(148,163,184,0.1)'
            : '1px solid rgba(203,213,225,0.4)',
        },
      }}
    >
      <Box sx={{ p: 2.5 }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            component="img"
            src="/src/assets/gomgom_logo.png"
            alt="Gomgom"
            sx={{ height: 34, filter: isDarkMode ? 'brightness(1.1)' : 'none' }}
          />
          <IconButton onClick={onClose} size="small" sx={{ color: textColor }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 메인 메뉴 */}
        <List disablePadding sx={{ mb: 1 }}>
          {menuItems.map((item) => {
            // 그룹 메뉴 (접기/펼치기)
            if (item.children) {
              const groupActive = isGroupActive(item.children)
              const isExpanded = expandedGroup === item.text
              const Icon = MuiIcons[item.iconName] || MuiIcons.HelpOutline

              return (
                <Box key={item.text}>
                  <ListItem disablePadding sx={{ mb: 0.25 }}>
                    <ListItemButton
                      onClick={() => handleGroupToggle(item.text)}
                      aria-expanded={isExpanded}
                      sx={{
                        borderRadius: 2,
                        py: 1.1,
                        px: 1.5,
                        bgcolor: groupActive
                          ? isDarkMode
                            ? 'rgba(99,102,241,0.1)'
                            : 'rgba(99,102,241,0.06)'
                          : 'transparent',
                        '&:hover': {
                          bgcolor: isDarkMode
                            ? 'rgba(99,102,241,0.1)'
                            : 'rgba(99,102,241,0.06)',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 36,
                          color: groupActive ? activeColor : textColor,
                        }}
                      >
                        <Icon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: groupActive ? 700 : 500,
                              color: groupActive ? activeColor : textColor,
                            }}
                          >
                            {item.text}
                          </Typography>
                        }
                      />
                      <MuiIcons.KeyboardArrowDown
                        sx={{
                          fontSize: '1.1rem',
                          color: groupActive ? activeColor : textColor,
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={isExpanded} timeout={200} unmountOnExit>
                    <Box
                      sx={{
                        ml: 1.5,
                        pl: 1.5,
                        borderLeft: `2px solid ${
                          isDarkMode
                            ? 'rgba(99,102,241,0.3)'
                            : 'rgba(99,102,241,0.25)'
                        }`,
                        mb: 0.5,
                      }}
                    >
                      {item.children.map((child) => {
                        const childActive = isActive(child.path)
                        const ChildIcon =
                          MuiIcons[child.iconName] || MuiIcons.HelpOutline

                        return (
                          <ListItem
                            key={child.text}
                            disablePadding
                            sx={{ mb: 0.25 }}
                          >
                            <ListItemButton
                              onClick={() => {
                                navigate(child.path)
                                onClose()
                              }}
                              sx={{
                                borderRadius: 2,
                                py: 0.9,
                                px: 1.5,
                                bgcolor: childActive ? subItemBg : 'transparent',
                                '&:hover': { bgcolor: subItemBg },
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 32,
                                  color: childActive ? activeColor : textColor,
                                }}
                              >
                                <ChildIcon
                                  sx={{ fontSize: '1rem' }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontSize: '0.825rem',
                                      fontWeight: childActive ? 700 : 500,
                                      color: childActive ? activeColor : textColor,
                                    }}
                                  >
                                    {child.text}
                                  </Typography>
                                }
                              />
                              {childActive && (
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: activeColor,
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </Box>
                  </Collapse>
                </Box>
              )
            }

            // 일반 메뉴
            const Icon = MuiIcons[item.iconName] || MuiIcons.HelpOutline
            const active = isActive(item.path!)

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path!)
                    onClose()
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    px: 1.5,
                    bgcolor: active
                      ? isDarkMode
                        ? 'rgba(99,102,241,0.1)'
                        : 'rgba(99,102,241,0.06)'
                      : 'transparent',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99,102,241,0.08)'
                        : 'rgba(99,102,241,0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: 36, color: active ? activeColor : textColor }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? activeColor : textColor,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Divider
          sx={{
            borderColor: isDarkMode
              ? 'rgba(148,163,184,0.1)'
              : 'rgba(203,213,225,0.4)',
            my: 1.5,
          }}
        />

        {/* 설정, 테마, 로그아웃 */}
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              onClick={() => {
                navigate(settingsItem.path)
                onClose()
              }}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: textColor }}>
                <MuiIcons.Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: textColor,
                    }}
                  >
                    설정
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              onClick={toggleTheme}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 36, color: isDarkMode ? '#fbbf24' : '#f59e0b' }}
              >
                {isDarkMode ? (
                  <MuiIcons.WbSunny fontSize="small" />
                ) : (
                  <MuiIcons.NightsStay fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: textColor,
                    }}
                  >
                    {isDarkMode ? '라이트 모드' : '다크 모드'}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={onLogout}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: '#ef4444' }}>
                <MuiIcons.Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#ef4444',
                    }}
                  >
                    로그아웃
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

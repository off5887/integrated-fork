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
import { menuItems, settingsItem } from './headerConfig'
import type { MenuItem, SubMenuItem } from './headerConfig'
import { useLogout } from './hooks/useLogout'
import { useNavColors } from './hooks/useNavColors'

interface MobileNavigationDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileNavigationDrawer({ open, onClose }: MobileNavigationDrawerProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode, toggleTheme, activeColor, drawerTextColor } = useNavColors()
  const logout = useLogout()
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  const subItemBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)'

  const isActive = (path: string) => location.pathname === path
  const isGroupActive = (children: SubMenuItem[]) =>
    children.some((c) => location.pathname === c.path)

  const handleGroupToggle = (text: string) => {
    setExpandedGroup((prev) => (prev === text ? null : text))
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 280,
            bgcolor: isDarkMode ? 'rgba(13,17,30,0.97)' : '#ffffff',
            backdropFilter: 'blur(24px)',
            borderLeft: isDarkMode
              ? '1px solid rgba(148,163,184,0.1)'
              : '1px solid rgba(203,213,225,0.4)',
          },
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
          <IconButton onClick={onClose} size="small" sx={{ color: drawerTextColor }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 메인 메뉴 */}
        <List disablePadding sx={{ mb: 1 }}>
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <GroupMenuItem
                  key={item.text}
                  item={item as MenuItem & { children: SubMenuItem[] }}
                  isExpanded={expandedGroup === item.text}
                  isGroupActive={isGroupActive(item.children)}
                  onToggle={() => handleGroupToggle(item.text)}
                  onNavigate={handleNavigate}
                  isDarkMode={isDarkMode}
                  activeColor={activeColor}
                  drawerTextColor={drawerTextColor}
                  subItemBg={subItemBg}
                  isActive={isActive}
                />
              )
            }

            const active = isActive(item.path!)
            const Icon = MuiIcons[item.iconName] ?? MuiIcons.HelpOutline

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path!)}
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
                    sx={{ minWidth: 36, color: active ? activeColor : drawerTextColor }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? activeColor : drawerTextColor,
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
              onClick={() => handleNavigate(settingsItem.path)}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: drawerTextColor }}>
                <MuiIcons.Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: drawerTextColor }}
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
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: drawerTextColor }}
                  >
                    {isDarkMode ? '라이트 모드' : '다크 모드'}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: '#ef4444' }}>
                <MuiIcons.Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#ef4444' }}
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

// ─── GroupMenuItem ────────────────────────────────────────────────────────────

interface GroupMenuItemProps {
  item: MenuItem & { children: SubMenuItem[] }
  isExpanded: boolean
  isGroupActive: boolean
  onToggle: () => void
  onNavigate: (path: string) => void
  isDarkMode: boolean
  activeColor: string
  drawerTextColor: string
  subItemBg: string
  isActive: (path: string) => boolean
}

function GroupMenuItem({
  item,
  isExpanded,
  isGroupActive,
  onToggle,
  onNavigate,
  isDarkMode,
  activeColor,
  drawerTextColor,
  subItemBg,
  isActive,
}: GroupMenuItemProps) {
  const Icon = MuiIcons[item.iconName] ?? MuiIcons.HelpOutline

  return (
    <Box>
      <ListItem disablePadding sx={{ mb: 0.25 }}>
        <ListItemButton
          onClick={onToggle}
          aria-expanded={isExpanded}
          sx={{
            borderRadius: 2,
            py: 1.1,
            px: 1.5,
            bgcolor: isGroupActive
              ? isDarkMode
                ? 'rgba(99,102,241,0.1)'
                : 'rgba(99,102,241,0.06)'
              : 'transparent',
            '&:hover': {
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 36, color: isGroupActive ? activeColor : drawerTextColor }}
          >
            <Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: isGroupActive ? 700 : 500,
                  color: isGroupActive ? activeColor : drawerTextColor,
                }}
              >
                {item.text}
              </Typography>
            }
          />
          <MuiIcons.KeyboardArrowDown
            sx={{
              fontSize: '1.1rem',
              color: isGroupActive ? activeColor : drawerTextColor,
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
              isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)'
            }`,
            mb: 0.5,
          }}
        >
          {item.children.map((child) => {
            const childActive = isActive(child.path)
            const ChildIcon = MuiIcons[child.iconName] ?? MuiIcons.HelpOutline

            return (
              <ListItem key={child.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => onNavigate(child.path)}
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
                      color: childActive ? activeColor : drawerTextColor,
                    }}
                  >
                    <ChildIcon sx={{ fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: '0.825rem',
                          fontWeight: childActive ? 700 : 500,
                          color: childActive ? activeColor : drawerTextColor,
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

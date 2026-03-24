import gomgomLogo from '@/assets/gomgom_logo.png'
import CloseIcon from '@mui/icons-material/Close'
import {
  NAV_ICON_MAP,
  KeyboardArrowDownIcon,
  InfoOutlinedIcon,
  SettingsIcon,
  WbSunnyIcon,
  NightsStayIcon,
  LogoutIcon,
} from './navIcons'
import {
  Avatar,
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
import { menuItems, settingsItem, introItem } from './navConfig'
import type { MenuItem, SubMenuItem } from '@/api/types/nav'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useNavColors } from './useNavColors'

interface NavMobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function NavMobileDrawer({ open, onClose }: NavMobileDrawerProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { nt, isDarkMode, toggleTheme } = useNavColors()
  const logout = useLogout()
  const user = useCurrentUser()
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  const subItemBg = nt.subItemBg

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
            bgcolor: nt.drawerBg,
            backdropFilter: 'blur(24px)',
            borderLeft: nt.drawerBorderLeft,
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
            src={gomgomLogo}
            alt="Gomgom"
            sx={{ height: 34, filter: isDarkMode ? nt.logoFilter : 'none' }}
          />
          <IconButton onClick={onClose} size="small" sx={{ color: nt.drawerTextColor }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 유저 프로필 */}
        {user && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              bgcolor: nt.profileBoxBg,
              border: `1px solid ${nt.profileBoxBorder}`,
            }}
          >
            <Avatar
              src={user.avatarUrl}
              sx={{
                width: 40,
                height: 40,
                fontSize: '1rem',
                fontWeight: 700,
                flexShrink: 0,
                bgcolor: nt.avatarBg,
                color: nt.activeColor,
                border: `1.5px solid ${nt.avatarBorderStrong}`,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: nt.drawerTextColor,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: nt.textColor,
                  lineHeight: 1.3,
                }}
              >
                {user.position}{user.department ? ` · ${user.department}` : ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  color: nt.employeeIdColor,
                  lineHeight: 1.3,
                }}
              >
                {user.employeeId}
              </Typography>
            </Box>
          </Box>
        )}

        {/* 메인 메뉴 */}
        <List disablePadding sx={{ mb: 1 }}>
          {menuItems.flatMap((item) => {
            if (item.roles && (!user?.role || !item.roles.includes(user.role))) return []
            if (item.children) {
              return [(
                <GroupMenuItem
                  key={item.text}
                  item={item as MenuItem & { children: SubMenuItem[] }}
                  isExpanded={expandedGroup === item.text}
                  isGroupActive={isGroupActive(item.children)}
                  onToggle={() => handleGroupToggle(item.text)}
                  onNavigate={handleNavigate}
                  subItemBg={subItemBg}
                  isActive={isActive}
                />
              )]
            }

            const active = isActive(item.path!)
            const Icon = NAV_ICON_MAP[item.iconName]

            return [(
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path!)}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    px: 1.5,
                    bgcolor: active ? nt.activeBg : 'transparent',
                    '&:hover': {
                      bgcolor: nt.hoverStrongBg,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: 36, color: active ? nt.activeColor : nt.drawerTextColor }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? nt.activeColor : nt.drawerTextColor,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )]
          })}
        </List>

        <Divider
          sx={{
            borderColor: nt.dividerColorWeak,
            my: 1.5,
          }}
        />

        {/* 시스템소개, 설정, 테마, 로그아웃 */}
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              onClick={() => handleNavigate(introItem.path)}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: nt.drawerTextColor }}>
                <InfoOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: nt.drawerTextColor }}
                  >
                    시스템소개
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          {user?.role === 'admin' && (
            <ListItem disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                onClick={() => handleNavigate(settingsItem.path)}
                sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: nt.drawerTextColor }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontSize: '0.875rem', fontWeight: 500, color: nt.drawerTextColor }}
                    >
                      설정
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              onClick={toggleTheme}
              sx={{ borderRadius: 2, py: 1.1, px: 1.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 36, color: nt.themeIconColor }}
              >
                {isDarkMode ? (
                  <WbSunnyIcon fontSize="small" />
                ) : (
                  <NightsStayIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: nt.drawerTextColor }}
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
              <ListItemIcon sx={{ minWidth: 36, color: nt.logoutColor }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 600, color: nt.logoutColor }}
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
  subItemBg: string
  isActive: (path: string) => boolean
}

function GroupMenuItem({
  item,
  isExpanded,
  isGroupActive,
  onToggle,
  onNavigate,
  subItemBg,
  isActive,
}: GroupMenuItemProps) {
  const { nt } = useNavColors()
  const Icon = NAV_ICON_MAP[item.iconName]

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
            bgcolor: isGroupActive ? nt.groupActiveBg : 'transparent',
            '&:hover': {
              bgcolor: nt.groupHoverBg,
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 36, color: isGroupActive ? nt.activeColor : nt.drawerTextColor }}
          >
            <Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: isGroupActive ? 700 : 500,
                  color: isGroupActive ? nt.activeColor : nt.drawerTextColor,
                }}
              >
                {item.text}
              </Typography>
            }
          />
          <KeyboardArrowDownIcon
            sx={{
              fontSize: '1.1rem',
              color: isGroupActive ? nt.activeColor : nt.drawerTextColor,
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
            borderLeft: `2px solid ${nt.groupBorderLeft}`,
            mb: 0.5,
          }}
        >
          {item.children.map((child) => {
            const childActive = isActive(child.path)
            const ChildIcon = NAV_ICON_MAP[child.iconName]

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
                      color: childActive ? nt.activeColor : nt.drawerTextColor,
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
                          color: childActive ? nt.activeColor : nt.drawerTextColor,
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
                        bgcolor: nt.activeColor,
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

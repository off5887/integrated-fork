// src/components/common/Header/MobileNavigationDrawer.tsx
import * as MuiIcons from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
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
import { useNavigate } from 'react-router-dom'

type IconName = keyof typeof MuiIcons

interface MobileNavigationDrawerProps {
  open: boolean
  onClose: () => void
  menuItems: Array<{ iconName: IconName; text: string; path: string }>
  settingsItem: { iconName: IconName; text: string; path: string }
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
  const textColor = isDarkMode ? '#e2e8f0' : '#0f172a'

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
            src="/gomgom_logo.png"
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
            const Icon = MuiIcons[item.iconName]

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path)
                    onClose()
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    px: 1.5,
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(99,102,241,0.08)'
                        : 'rgba(99,102,241,0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: textColor }}>
                    <Icon fontSize="small" />
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

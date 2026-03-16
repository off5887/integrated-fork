import * as MuiIcons from '@mui/icons-material'
import { Avatar, Box, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems, settingsItem } from './headerConfig'
import type { MenuItem, SubMenuItem } from './headerConfig'
import { useCurrentUser } from './hooks/useCurrentUser'
import { useLogout } from './hooks/useLogout'
import { useNavColors } from './hooks/useNavColors'

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({ item }: { item: MenuItem & { path: string } }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode, activeColor, textColor, hoverBg } = useNavColors()
  const active = location.pathname === item.path
  const Icon = MuiIcons[item.iconName] ?? MuiIcons.HelpOutline

  return (
    <Box
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
        position: 'relative',
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
      }}
    >
      <Icon fontSize="small" sx={{ color: active ? activeColor : textColor }} />
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
}

// ─── NavGroup ─────────────────────────────────────────────────────────────────

function NavGroup({ item }: { item: MenuItem & { children: SubMenuItem[] } }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode, activeColor, textColor, dropdownBg, dropdownBorder } = useNavColors()
  const [isOpen, setIsOpen] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const groupActive = item.children.some((c) => location.pathname === c.path)
  const Icon = MuiIcons[item.iconName] ?? MuiIcons.HelpOutline

  const handleEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setIsOpen(true)
  }

  const handleLeave = () => {
    hoverTimer.current = setTimeout(() => setIsOpen(false), 120)
  }

  return (
    <Box onMouseEnter={handleEnter} onMouseLeave={handleLeave} sx={{ position: 'relative' }}>
      {/* 그룹 트리거 */}
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
          position: 'relative',
          bgcolor:
            groupActive || isOpen
              ? isDarkMode
                ? 'rgba(99,102,241,0.15)'
                : 'rgba(99,102,241,0.1)'
              : 'transparent',
          '&:hover': {
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
          },
        }}
      >
        <Icon
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
          onMouseEnter={() => {
            if (hoverTimer.current) clearTimeout(hoverTimer.current)
          }}
          onMouseLeave={handleLeave}
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
            const childActive = location.pathname === child.path
            const ChildIcon = MuiIcons[child.iconName] ?? MuiIcons.HelpOutline

            return (
              <Box
                key={child.text}
                onClick={() => {
                  navigate(child.path)
                  setIsOpen(false)
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
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                  },
                }}
              >
                <ChildIcon
                  fontSize="small"
                  sx={{ fontSize: '1rem', color: childActive ? activeColor : textColor }}
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

// ─── UserChip ─────────────────────────────────────────────────────────────────

function UserChip() {
  const { isDarkMode, textColor, activeColor } = useNavColors()
  const user = useCurrentUser()
  if (!user) return null

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pl: 1.5,
        mr: 0.5,
        borderLeft: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'}`,
      }}
    >
      <Avatar
        src={user.avatarUrl}
        sx={{
          width: 28,
          height: 28,
          fontSize: '0.75rem',
          fontWeight: 700,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.13)',
          color: activeColor,
          border: `1.5px solid ${isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'}`,
        }}
      >
        {user.name.charAt(0)}
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: isDarkMode ? '#e2e8f0' : '#1e293b',
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
          }}
        >
          {user.name}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.68rem',
            color: textColor,
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
          }}
        >
          {user.position}{user.department ? ` · ${user.department}` : ''}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── HeaderActions ────────────────────────────────────────────────────────────

function HeaderActions() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode, toggleTheme, activeColor, textColor, hoverBg } = useNavColors()
  const logout = useLogout()

  const settingsActive = location.pathname === settingsItem.path

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
      <Tooltip title="설정" arrow placement="bottom">
        <IconButton
          onClick={() => navigate(settingsItem.path)}
          size="small"
          sx={{
            color: settingsActive ? activeColor : textColor,
            bgcolor: settingsActive
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
          onClick={logout}
          size="small"
          sx={{
            color: textColor,
            '&:hover': {
              bgcolor: isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
              color: '#ef4444',
            },
          }}
        >
          <MuiIcons.Logout fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

// ─── DesktopNavigation ────────────────────────────────────────────────────────

export default function DesktopNavigation() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
        {menuItems.map((item) =>
          item.children ? (
            <NavGroup
              key={item.text}
              item={item as MenuItem & { children: SubMenuItem[] }}
            />
          ) : (
            <NavItem
              key={item.text}
              item={item as MenuItem & { path: string }}
            />
          ),
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <UserChip />
      <HeaderActions />
    </>
  )
}

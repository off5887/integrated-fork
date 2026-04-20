// src/components/common/nav/NavDesktop.tsx
// 데스크톱 네비게이션 바 — NavItem(단일 링크), NavGroup(드롭다운 그룹) 렌더링 및 UserMenu 조합
import { Box, Paper, Typography } from '@mui/material'
import { NAV_ICON_MAP, KeyboardArrowDownIcon } from './navIcons'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from './navConfig'
import type { MenuItem, SubMenuItem } from '@/api/types/nav'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useNavColors } from './useNavColors'
import NavDesktopUserMenu from './NavDesktopUserMenu'

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({ item }: { item: MenuItem & { path: string } }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { nt } = useNavColors()
  const active = location.pathname === item.path
  const Icon = NAV_ICON_MAP[item.iconName]

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
        bgcolor: active ? nt.activeBg : 'transparent',
        '&:hover': {
          bgcolor: active ? nt.activeHoverBg : nt.hoverBg,
        },
      }}
    >
      <Icon fontSize="small" sx={{ color: active ? nt.activeColor : nt.textColor }} />
      <Typography
        sx={{
          fontSize: '0.82rem',
          fontWeight: active ? 700 : 500,
          color: active ? nt.activeColor : nt.textColor,
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
            bgcolor: nt.activeColor,
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
  const { nt } = useNavColors()
  const [isOpen, setIsOpen] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const groupActive = item.children.some((c) => location.pathname === c.path)
  const Icon = NAV_ICON_MAP[item.iconName]

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
          bgcolor: groupActive || isOpen ? nt.activeBg : 'transparent',
          '&:hover': {
            bgcolor: nt.activeBg,
          },
        }}
      >
        <Icon
          fontSize="small"
          sx={{ color: groupActive || isOpen ? nt.activeColor : nt.textColor }}
        />
        <Typography
          sx={{
            fontSize: '0.82rem',
            fontWeight: groupActive || isOpen ? 700 : 500,
            color: groupActive || isOpen ? nt.activeColor : nt.textColor,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {item.text}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: '1rem',
            color: groupActive || isOpen ? nt.activeColor : nt.textColor,
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
              bgcolor: nt.activeColor,
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
            bgcolor: nt.dropdownBg,
            border: nt.dropdownBorder,
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
            const ChildIcon = NAV_ICON_MAP[child.iconName]

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
                  bgcolor: childActive ? nt.dropdownChildActiveBg : 'transparent',
                  transition: 'background 0.12s ease',
                  '&:hover': {
                    bgcolor: nt.dropdownChildHoverBg,
                  },
                }}
              >
                <ChildIcon
                  fontSize="small"
                  sx={{ fontSize: '1rem', color: childActive ? nt.activeColor : nt.textColor }}
                />
                <Typography
                  sx={{
                    fontSize: '0.82rem',
                    fontWeight: childActive ? 700 : 500,
                    color: childActive ? nt.activeColor : nt.textColor,
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

// ─── NavDesktop ────────────────────────────────────────────────────────────────

export default function NavDesktop() {
  const { role } = useCurrentUser()

  const visibleItems = menuItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  )

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
        {visibleItems.map((item) =>
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

      <NavDesktopUserMenu />
    </>
  )
}

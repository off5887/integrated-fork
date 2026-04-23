// src/components/common/nav/NavDesktop.tsx
import { Box, Paper, Typography } from '@mui/material'
import { NAV_ICON_MAP, KeyboardArrowDownIcon } from './navIcons'
import { useLayoutEffect, useRef, useState } from 'react'
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
      data-active={active ? 'true' : undefined}
      onClick={() => navigate(item.path)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        cursor: 'pointer',
        position: 'relative',
        zIndex: 1,
        bgcolor: 'transparent',
        transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: active ? nt.activeHoverBg : nt.hoverBg },
      }}
    >
      <Icon fontSize="small" sx={{ color: active ? nt.activeColor : nt.textColor, transition: 'color 0.2s ease' }} />
      <Typography
        sx={{
          fontSize: '0.82rem',
          fontWeight: active ? 700 : 500,
          color: active ? nt.activeColor : nt.textColor,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s ease, font-weight 0.15s ease',
        }}
      >
        {item.text}
      </Typography>
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
      <Box
        data-active={groupActive ? 'true' : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          cursor: 'default',
          position: 'relative',
          zIndex: 1,
          bgcolor: 'transparent',
          transition: 'background-color 0.15s ease',
          '&:hover': { bgcolor: nt.activeBg },
        }}
      >
        <Icon fontSize="small" sx={{ color: groupActive || isOpen ? nt.activeColor : nt.textColor, transition: 'color 0.2s ease' }} />
        <Typography
          sx={{
            fontSize: '0.82rem',
            fontWeight: groupActive || isOpen ? 700 : 500,
            color: groupActive || isOpen ? nt.activeColor : nt.textColor,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
          }}
        >
          {item.text}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: '1rem',
            color: groupActive || isOpen ? nt.activeColor : nt.textColor,
            transition: 'transform 0.2s ease, color 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      {/* 드롭다운 패널 */}
      {isOpen && (
        <Paper
          onMouseEnter={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current) }}
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
              to:   { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
            },
          }}
        >
          {item.children.map((child) => {
            const childActive = location.pathname === child.path
            const ChildIcon = NAV_ICON_MAP[child.iconName]
            return (
              <Box
                key={child.text}
                onClick={() => { navigate(child.path); setIsOpen(false) }}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1,
                  px: 1.5, py: 0.9, cursor: 'pointer',
                  bgcolor: childActive ? nt.dropdownChildActiveBg : 'transparent',
                  transition: 'background 0.12s ease',
                  '&:hover': { bgcolor: nt.dropdownChildHoverBg },
                }}
              >
                <ChildIcon fontSize="small" sx={{ fontSize: '1rem', color: childActive ? nt.activeColor : nt.textColor }} />
                <Typography sx={{ fontSize: '0.82rem', fontWeight: childActive ? 700 : 500, color: childActive ? nt.activeColor : nt.textColor, whiteSpace: 'nowrap' }}>
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
  const { nt } = useNavColors()
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)

  // 슬라이딩 pill(배경) + underline 위치
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeEl = container.querySelector('[data-active="true"]') as HTMLElement | null
    if (!activeEl) { setPill(null); return }
    const cr = container.getBoundingClientRect()
    const ar = activeEl.getBoundingClientRect()
    setPill({ left: ar.left - cr.left, width: ar.width })
  }, [location.pathname])

  const visibleItems = menuItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  )

  const TRANSITION = 'left 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1)'

  return (
    <>
      <Box ref={containerRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2, position: 'relative' }}>
        {/* 슬라이딩 배경 pill */}
        {pill && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: pill.left,
              width: pill.width,
              height: 'calc(100% - 4px)',
              bgcolor: nt.activeBg,
              borderRadius: 2,
              transition: TRANSITION,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}
        {/* 슬라이딩 하단 underline */}
        {pill && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: pill.left,
              width: pill.width,
              height: 2,
              bgcolor: nt.activeColor,
              borderRadius: '2px 2px 0 0',
              transition: TRANSITION,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {visibleItems.map((item) =>
          item.children ? (
            <NavGroup key={item.text} item={item as MenuItem & { children: SubMenuItem[] }} />
          ) : (
            <NavItem key={item.text} item={item as MenuItem & { path: string }} />
          ),
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <NavDesktopUserMenu />
    </>
  )
}

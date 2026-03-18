import * as MuiIcons from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem as MuiMenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems, settingsItem, introItem } from './navConfig'
import type { MenuItem, SubMenuItem } from '@/api/types/nav'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useNavColors } from './useNavColors'

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({ item }: { item: MenuItem & { path: string } }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { nt } = useNavColors()
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
        <MuiIcons.KeyboardArrowDown
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

// ─── UserMenu ─────────────────────────────────────────────────────────────────

function UserMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { nt, isDarkMode, toggleTheme } = useNavColors()
  const logout = useLogout()
  const user = useCurrentUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  if (!user) return null

  const settingsActive = location.pathname === settingsItem.path
  const introActive = location.pathname === introItem.path

  return (
    <>
      {/* 트리거: 아바타 + 이름 버튼 */}
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        role="button"
        aria-label="사용자 메뉴 열기"
        aria-haspopup="true"
        aria-expanded={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pl: 1.5,
          pr: 1,
          py: 0.5,
          ml: 0.5,
          borderLeft: `1px solid ${nt.headerBorderLeft}`,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'background 0.15s ease',
          '&:hover': { bgcolor: nt.hoverBg },
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: 30,
            height: 30,
            fontSize: '0.8rem',
            fontWeight: 700,
            bgcolor: nt.avatarBg,
            color: nt.activeColor,
            border: `1.5px solid ${nt.avatarBorder}`,
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: nt.nameColor,
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
            }}
          >
            {user.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.68rem',
              color: nt.textColor,
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
            }}
          >
            {user.position}
            {user.department ? ` · ${user.department}` : ''}
          </Typography>
        </Box>
        <MuiIcons.KeyboardArrowDown
          sx={{
            fontSize: '1rem',
            color: nt.textColor,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      {/* 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 8,
            sx: {
              mt: 0.75,
              minWidth: 210,
              bgcolor: nt.dropdownBg,
              border: nt.dropdownBorder,
              borderRadius: 2,
              backdropFilter: 'blur(24px)',
              overflow: 'visible',
              '& .MuiList-root': { py: 0.5 },
            },
          },
        }}
      >
        {/* 프로필 헤더 */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={user.avatarUrl}
              sx={{
                width: 40,
                height: 40,
                fontSize: '1rem',
                fontWeight: 700,
                bgcolor: nt.avatarBg,
                color: nt.activeColor,
                border: `2px solid ${nt.avatarBorder}`,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: nt.profileNameColor,
                  lineHeight: 1.3,
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{ fontSize: '0.75rem', color: nt.textColor, lineHeight: 1.3 }}
              >
                {user.position}
                {user.department ? ` · ${user.department}` : ''}
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
        </Box>

        <Divider sx={{ borderColor: nt.dividerColor }} />

        {/* 시스템소개 */}
        <MuiMenuItem
          onClick={() => { navigate(introItem.path); setAnchorEl(null) }}
          sx={{
            px: 2,
            py: 1,
            gap: 1.5,
            color: introActive ? nt.activeColor : nt.menuItemColor,
            bgcolor: introActive ? nt.settingsActiveBg : 'transparent',
            '&:hover': { bgcolor: nt.hoverBg, color: nt.activeColor },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
            <MuiIcons.InfoOutlined fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: introActive ? 700 : 500 }}>
            시스템소개
          </Typography>
        </MuiMenuItem>

        {/* 설정 */}
        <MuiMenuItem
          onClick={() => { navigate(settingsItem.path); setAnchorEl(null) }}
          sx={{
            px: 2,
            py: 1,
            gap: 1.5,
            color: settingsActive ? nt.activeColor : nt.menuItemColor,
            bgcolor: settingsActive ? nt.settingsActiveBg : 'transparent',
            '&:hover': { bgcolor: nt.hoverBg, color: nt.activeColor },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
            <MuiIcons.Settings fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: settingsActive ? 700 : 500 }}>
            설정
          </Typography>
        </MuiMenuItem>

        {/* 테마 전환 */}
        <MuiMenuItem
          onClick={toggleTheme}
          sx={{
            px: 2,
            py: 1,
            gap: 1.5,
            color: nt.menuItemColor,
            '&:hover': {
              bgcolor: nt.themeHoverBg,
              color: nt.themeHoverColor,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
            {isDarkMode ? (
              <MuiIcons.WbSunny fontSize="small" />
            ) : (
              <MuiIcons.NightsStay fontSize="small" />
            )}
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
            {isDarkMode ? '라이트 모드' : '다크 모드'}
          </Typography>
        </MuiMenuItem>

        <Divider sx={{ borderColor: nt.dividerColor }} />

        {/* 로그아웃 */}
        <MuiMenuItem
          onClick={() => { setAnchorEl(null); logout() }}
          sx={{
            px: 2,
            py: 1,
            gap: 1.5,
            color: nt.logoutColor,
            '&:hover': {
              bgcolor: nt.logoutHoverBg,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
            <MuiIcons.Logout fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>로그아웃</Typography>
        </MuiMenuItem>
      </Menu>
    </>
  )
}

// ─── NavDesktop ────────────────────────────────────────────────────────────────

export default function NavDesktop() {
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

      <UserMenu />
    </>
  )
}

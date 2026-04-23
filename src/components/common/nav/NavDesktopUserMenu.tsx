// src/components/common/nav/NavDesktopUserMenu.tsx
// 데스크톱 네비게이션 우측 사용자 아바타 + 드롭다운 메뉴 (설정, 테마 전환, 로그아웃 포함)
import {
  KeyboardArrowDownIcon,
  InfoOutlinedIcon,
  LockResetIcon,
  SettingsIcon,
  WbSunnyIcon,
  NightsStayIcon,
  LogoutIcon,
} from './navIcons'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem as MuiMenuItem,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { settingsItem, introItem } from './navConfig'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useNavColors } from './useNavColors'
import PasswordChangeDialog from '@/features/auth/components/PasswordChangeDialog'

export default function NavDesktopUserMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { nt, isDarkMode, toggleTheme } = useNavColors()
  const logout = useLogout()
  const { user, isAdmin } = useCurrentUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [pwOpen, setPwOpen] = useState(false)

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
            {[user.position, user.department].filter(Boolean).join(' · ')}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon
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
                {[user.position, user.department].filter(Boolean).join(' · ')}
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

        {/* 비밀번호 변경 */}
        <MuiMenuItem
          onClick={() => { setPwOpen(true); setAnchorEl(null) }}
          sx={{
            px: 2, py: 1, gap: 1.5,
            color: nt.menuItemColor,
            '&:hover': { bgcolor: nt.hoverBg, color: nt.activeColor },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
            <LockResetIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>비밀번호 변경</Typography>
        </MuiMenuItem>

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
            <InfoOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: introActive ? 700 : 500 }}>
            시스템소개
          </Typography>
        </MuiMenuItem>

        {/* 설정 — 관리자 전용 */}
        {isAdmin && (
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
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: settingsActive ? 700 : 500 }}>
              설정
            </Typography>
          </MuiMenuItem>
        )}

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
              <WbSunnyIcon fontSize="small" />
            ) : (
              <NightsStayIcon fontSize="small" />
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
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>로그아웃</Typography>
        </MuiMenuItem>
      </Menu>
      <PasswordChangeDialog open={pwOpen} onClose={() => setPwOpen(false)} />
    </>
  )
}

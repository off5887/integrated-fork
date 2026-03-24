// src/components/UserManagement.tsx
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { mockUsers as initialUsers } from '@/api/mock/settings'
import type { User } from '@/api/types/settings'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import UserFormDialog from './UserFormDialog'

export default function UserManagement() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, cardBg, rowBg, rowHoverBg, headerBg } = usePageColors()
  const st = getSettingsTheme(isDarkMode)
  const { showSnackbar } = useSnackbar()

  const [users, setUsers] = useState<User[]>(initialUsers)
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User & { password: string }>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const isEditing = editUser !== null

  const handleAddOpen = () => {
    setEditUser(null)
    setFormData({})
    setShowPassword(false)
    setOpen(true)
  }

  const handleEditOpen = (user: User) => {
    setEditUser(user)
    setFormData({ ...user })
    setShowPassword(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({})
    setEditUser(null)
  }

  const handleSave = () => {
    if (!formData.name || !formData.employeeNumber || !formData.email || !formData.role || !formData.department) {
      showSnackbar('모든 필수 항목을 입력해주세요.', 'warning')
      return
    }
    if (isEditing) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...formData } : u))
    } else {
      if (!formData.password) {
        showSnackbar('비밀번호를 입력해주세요.', 'warning')
        return
      }
      setUsers(prev => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1,
          name: formData.name!,
          employeeNumber: formData.employeeNumber!,
          email: formData.email!,
          role: formData.role!,
          department: formData.department!,
          active: true,
        },
      ])
    }
    handleClose()
  }

  const handleToggleActive = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u))
  }

  const handleDelete = (id: number) => {
    setDeleteConfirmId(id)
  }

  const ROLE_OPTIONS = [
    { value: 'user',     label: '일반 사용자' },
    { value: 'reviewer', label: '심사자' },
    { value: 'admin',    label: '관리자' },
  ]

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u))
    const label = ROLE_OPTIONS.find(r => r.value === newRole)?.label ?? newRole
    showSnackbar(`권한이 '${label}'으로 변경되었습니다.`, 'success')
  }

  const RoleSelect = ({ user }: { user: User }) => (
    <Select
      value={user.role}
      onChange={(e) => handleRoleChange(user.id, e.target.value)}
      size="small"
      variant="outlined"
      sx={{
        fontSize: '0.75rem', fontWeight: 600, height: 26, minWidth: 96,
        bgcolor: st.chipBg,
        color: st.primaryColor,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: st.avatarBorder },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: st.primaryColor },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: st.primaryColor },
        '& .MuiSelect-icon': { color: st.primaryColor, fontSize: '1rem' },
        '& .MuiSelect-select': { py: '3px', px: 1 },
      }}
    >
      {ROLE_OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.8rem' }}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  )

  const handleDeleteConfirm = () => {
    if (deleteConfirmId !== null) {
      setUsers(prev => prev.filter(u => u.id !== deleteConfirmId))
      setDeleteConfirmId(null)
    }
  }

  const ActiveChip = ({ user }: { user: User }) => (
    <Tooltip title={user.active ? '클릭하여 비활성화' : '클릭하여 활성화'} placement="top">
      <Chip
        label={user.active ? '활성' : '비활성'}
        size="small"
        onClick={() => handleToggleActive(user.id)}
        sx={{
          cursor: 'pointer',
          bgcolor: user.active ? st.activeChipBg : st.inactiveChipBg,
          color: user.active ? st.activeChipColor : st.inactiveChipColor,
          border: `1px solid ${user.active ? st.activeChipBorder : st.inactiveChipBorder}`,
          fontWeight: 700,
          fontSize: '0.7rem',
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: user.active ? st.activeChipBgHover : st.inactiveChipBgHover,
          },
        }}
      />
    </Tooltip>
  )

  return (
    <Box>
      {/* 상단 액션 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 3, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: st.primaryColor, color: st.primaryBtnColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ManageAccountsIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
              사용자 관리
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              총 {users.length}명 등록됨 · 활성 {users.filter(u => u.active).length}명
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={handleAddOpen}
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.9,
            fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
            bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none',
            '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
            transition: 'all 0.2s ease',
          }}
        >
          사용자 추가
        </Button>
      </Box>

      {/* 모바일 카드 목록 (xs only) */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 1.5 }}>
        {users.map(user => (
          <Box
            key={user.id}
            sx={{
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 2.5,
              overflow: 'hidden',
              transition: 'all 0.15s ease',
            }}
          >
            {/* 카드 상단 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, borderBottom: `1px solid ${borderColor}` }}>
              <Avatar
                sx={{
                  width: 36, height: 36,
                  bgcolor: st.avatarBgLight,
                  color: st.primaryColor,
                  fontSize: '0.875rem', fontWeight: 700,
                  border: `1px solid ${st.avatarBorder}`,
                  flexShrink: 0,
                }}
              >
                {user.name[0]}
              </Avatar>
              <Box flex={1} minWidth={0}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace' }}>
                  {user.employeeNumber}
                </Typography>
              </Box>
              <ActiveChip user={user} />
            </Box>

            {/* 카드 본문 */}
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
                <RoleSelect user={user} />
                <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>
                  {user.department}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>
                {user.email}
              </Typography>
            </Box>

            {/* 카드 하단 액션 */}
            <Box sx={{ display: 'flex', gap: 1, px: 2, pb: 1.5, justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                onClick={() => handleEditOpen(user)}
                sx={{
                  color: textSecondary, opacity: 0.7,
                  '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg },
                  transition: 'all 0.15s ease',
                }}
              >
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleToggleActive(user.id)}
                sx={{
                  color: user.active ? st.activeChipColor : textSecondary,
                  opacity: 0.7,
                  '&:hover': { opacity: 1, bgcolor: st.activeChipBg },
                  transition: 'all 0.15s ease',
                }}
              >
                <PowerSettingsNewIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDelete(user.id)}
                sx={{
                  color: textSecondary, opacity: 0.7,
                  '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg },
                  transition: 'all 0.15s ease',
                }}
              >
                <DeleteIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
          </Box>
        ))}

        {users.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ManageAccountsIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
            <Typography variant="body2" sx={{ color: textSecondary }}>
              등록된 사용자가 없습니다
            </Typography>
          </Box>
        )}
      </Box>

      {/* 데스크탑 테이블 (sm+) */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          borderRadius: 2.5,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: headerBg }}>
              {['이름', '사번', '이메일', '역할', '부서', '상태', ''].map((label, i) => (
                <TableCell
                  key={label || `col-${i}`}
                  align={i === 6 ? 'right' : 'left'}
                  sx={{
                    color: textSecondary, fontWeight: 600, fontSize: '0.72rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    py: 1.75, borderBottomColor: borderColor,
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                sx={{
                  bgcolor: rowBg,
                  transition: 'background-color 0.15s ease',
                  '&:hover': { bgcolor: rowHoverBg },
                  '& .MuiTableCell-root': { borderBottomColor: borderColor, py: 1.5 },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 30, height: 30,
                        bgcolor: st.avatarBgLight,
                        color: st.primaryColor,
                        fontSize: '0.75rem', fontWeight: 700,
                        border: `1px solid ${st.avatarBorder}`,
                      }}
                    >
                      {user.name[0]}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontFamily: 'monospace' }}>
                    {user.employeeNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontFamily: 'monospace' }}>
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <RoleSelect user={user} />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>
                    {user.department || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <ActiveChip user={user} />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="수정">
                    <IconButton
                      size="small"
                      onClick={() => handleEditOpen(user)}
                      sx={{
                        mr: 0.5, color: textSecondary, opacity: 0.6,
                        '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <EditIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.active ? '비활성화' : '활성화'}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleActive(user.id)}
                      sx={{
                        mr: 0.5,
                        color: user.active ? st.activeChipColor : textSecondary,
                        opacity: 0.6,
                        '&:hover': { opacity: 1, bgcolor: st.activeChipBg },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <PowerSettingsNewIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="삭제">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(user.id)}
                      sx={{
                        color: textSecondary, opacity: 0.6,
                        '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8, borderBottomColor: borderColor }}>
                  <ManageAccountsIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    등록된 사용자가 없습니다
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* 추가/수정 다이얼로그 */}
      <UserFormDialog
        open={open}
        isEditing={isEditing}
        formData={formData}
        showPassword={showPassword}
        onClose={handleClose}
        onSave={handleSave}
        onFormChange={setFormData}
        onTogglePassword={() => setShowPassword(v => !v)}
      />

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={deleteConfirmId !== null}
        title="사용자 삭제"
        message="정말 이 사용자를 삭제하시겠습니까?"
        confirmLabel="삭제"
        variant="error"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </Box>
  )
}

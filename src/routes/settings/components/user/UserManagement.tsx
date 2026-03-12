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
import { mockUsers as initialUsers } from '@/api/mock/settings'
import type { User } from '@/api/types/settings'
import UserFormDialog from './UserFormDialog'

export default function UserManagement() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, cardBg, rowBg, rowHoverBg, headerBg } = usePageColors()

  const [users, setUsers] = useState<User[]>(initialUsers)
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User & { password: string }>>({})
  const [showPassword, setShowPassword] = useState(false)

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
      alert('모든 필수 항목을 입력해주세요.')
      return
    }
    if (isEditing) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...formData } : u))
    } else {
      if (!formData.password) {
        alert('비밀번호를 입력해주세요.')
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
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setUsers(prev => prev.filter(u => u.id !== id))
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
          bgcolor: user.active
            ? (isDarkMode ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.07)')
            : (isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)'),
          color: user.active
            ? (isDarkMode ? '#34d399' : '#059669')
            : (isDarkMode ? '#f87171' : '#dc2626'),
          border: `1px solid ${user.active
            ? (isDarkMode ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)')
            : (isDarkMode ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.2)')}`,
          fontWeight: 700,
          fontSize: '0.7rem',
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: user.active
              ? (isDarkMode ? 'rgba(16,185,129,0.22)' : 'rgba(16,185,129,0.14)')
              : (isDarkMode ? 'rgba(239,68,68,0.22)' : 'rgba(239,68,68,0.14)'),
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
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
            bgcolor: '#6366f1', color: '#fff', boxShadow: 'none',
            '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 6px 20px rgba(99,102,241,0.4)' },
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
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  fontSize: '0.875rem', fontWeight: 700,
                  border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.15)'}`,
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
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                    color: isDarkMode ? '#a5b4fc' : '#4338ca',
                    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                    fontWeight: 600, fontSize: '0.72rem',
                  }}
                />
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
                  '&:hover': { color: isDarkMode ? '#a5b4fc' : '#4338ca', opacity: 1, bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' },
                  transition: 'all 0.15s ease',
                }}
              >
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleToggleActive(user.id)}
                sx={{
                  color: user.active ? (isDarkMode ? '#34d399' : '#059669') : textSecondary,
                  opacity: 0.7,
                  '&:hover': { opacity: 1, bgcolor: isDarkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.06)' },
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
                  '&:hover': { color: '#ef4444', opacity: 1, bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
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
                  key={i}
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
                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                        color: isDarkMode ? '#a5b4fc' : '#4338ca',
                        fontSize: '0.75rem', fontWeight: 700,
                        border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.15)'}`,
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
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                      color: isDarkMode ? '#a5b4fc' : '#4338ca',
                      border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                      fontWeight: 600, fontSize: '0.72rem',
                    }}
                  />
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
                        '&:hover': { color: isDarkMode ? '#a5b4fc' : '#4338ca', opacity: 1, bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' },
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
                        color: user.active ? (isDarkMode ? '#34d399' : '#059669') : textSecondary,
                        opacity: 0.6,
                        '&:hover': { opacity: 1, bgcolor: isDarkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.06)' },
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
                        '&:hover': { color: '#ef4444', opacity: 1, bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
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
    </Box>
  )
}

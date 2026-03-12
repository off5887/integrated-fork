import CloseIcon from '@mui/icons-material/Close'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { mockDepartments } from '@/api/mock/settings'
import type { User } from '../../types'

interface Props {
  open: boolean
  isEditing: boolean
  formData: Partial<User & { password: string }>
  showPassword: boolean
  onClose: () => void
  onSave: () => void
  onFormChange: (data: Partial<User & { password: string }>) => void
  onTogglePassword: () => void
}

export default function UserFormDialog({
  open,
  isEditing,
  formData,
  showPassword,
  onClose,
  onSave,
  onFormChange,
  onTogglePassword,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
      fontSize: '0.875rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#6366f1' },
    },
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiInputLabel-root': { color: textSecondary, '&.Mui-focused': { color: '#6366f1' } },
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: isDarkMode ? 'rgba(15,23,42,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            borderRadius: 3,
            overflow: 'hidden',
            backgroundImage: 'none',
          },
        },
      }}
    >
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />
      <Box sx={{ px: 3.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${borderColor}` }}>
        <Box
          sx={{
            width: 32, height: 32, borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <ManageAccountsIcon sx={{ color: '#fff', fontSize: '1rem' }} />
        </Box>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, flex: 1 }}>
          {isEditing ? '사용자 수정' : '새 사용자 추가'}
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: textSecondary,
            '&:hover': { color: '#ef4444', bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
            transition: 'all 0.15s ease',
          }}
        >
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3.5 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="이름"
            fullWidth required size="small"
            value={formData.name || ''}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
            autoFocus
            sx={inputSx}
          />
          <TextField
            label="사번"
            fullWidth required size="small"
            value={formData.employeeNumber || ''}
            onChange={(e) => onFormChange({ ...formData, employeeNumber: e.target.value })}
            placeholder="예: DEV001"
            sx={{ ...inputSx, '& .MuiInputBase-input': { color: textPrimary, fontFamily: 'monospace' } }}
          />
          <TextField
            label="이메일"
            fullWidth required size="small" type="email"
            value={formData.email || ''}
            onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
            sx={{ ...inputSx, '& .MuiInputBase-input': { color: textPrimary, fontFamily: 'monospace' } }}
          />
          {!isEditing && (
            <TextField
              label="비밀번호"
              fullWidth required size="small"
              type={showPassword ? 'text' : 'password'}
              value={formData.password || ''}
              onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
              sx={inputSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={onTogglePassword}
                        edge="end" size="small"
                        sx={{ color: textSecondary }}
                      >
                        {showPassword
                          ? <VisibilityOff sx={{ fontSize: '1rem' }} />
                          : <Visibility sx={{ fontSize: '1rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
          <FormControl fullWidth required size="small" sx={inputSx}>
            <InputLabel id="role-label">역할</InputLabel>
            <Select
              labelId="role-label" label="역할"
              value={formData.role || ''}
              onChange={(e) => onFormChange({ ...formData, role: e.target.value })}
            >
              {['사원', '팀장', '부장', '부문장', '임원'].map(r => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required size="small" sx={inputSx}>
            <InputLabel id="department-label">부서</InputLabel>
            <Select
              labelId="department-label" label="부서"
              value={formData.department || ''}
              onChange={(e) => onFormChange({ ...formData, department: e.target.value })}
            >
              {mockDepartments.map(dept => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <Box
        sx={{
          px: 3.5, py: 2.5,
          display: 'flex', justifyContent: 'flex-end', gap: 1.5,
          borderTop: `1px solid ${borderColor}`,
          bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : 'rgba(248,250,252,0.8)',
        }}
      >
        <Button
          onClick={onClose}
          size="small"
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.8,
            fontWeight: 600, fontSize: '0.82rem', textTransform: 'none',
            color: textSecondary,
            '&:hover': { bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(100,116,139,0.06)' },
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={onSave}
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.8,
            fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
            bgcolor: '#6366f1', color: '#fff', boxShadow: 'none',
            '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 6px 20px rgba(99,102,241,0.4)' },
            transition: 'all 0.2s ease',
          }}
        >
          {isEditing ? '저장하기' : '추가하기'}
        </Button>
      </Box>
    </Dialog>
  )
}

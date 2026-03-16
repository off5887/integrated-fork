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
import { getSettingsTheme } from '@/theme/settingsTheme'
import { mockDepartments } from '@/api/mock/settings'
import type { User } from '@/api/types/settings'

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
  const st = getSettingsTheme(isDarkMode)

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: st.inputBg,
      fontSize: '0.875rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: st.inputHoverBorder },
      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
    },
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiInputLabel-root': { color: textSecondary, '&.Mui-focused': { color: st.inputFocusBorder } },
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
            bgcolor: st.dialogBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 3,
            overflow: 'hidden',
            backgroundImage: 'none',
          },
        },
      }}
    >
      <Box sx={{ height: 3, background: st.headerGradient }} />
      <Box sx={{ px: 3.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${borderColor}` }}>
        <Box
          sx={{
            width: 32, height: 32, borderRadius: 2,
            background: st.iconGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <ManageAccountsIcon sx={{ color: st.primaryBtnColor, fontSize: '1rem' }} />
        </Box>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, flex: 1 }}>
          {isEditing ? '사용자 수정' : '새 사용자 추가'}
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: textSecondary,
            '&:hover': { color: st.deleteHoverColor, bgcolor: st.deleteHoverBg },
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
          bgcolor: st.dialogFooterBg,
        }}
      >
        <Button
          onClick={onClose}
          size="small"
          sx={{
            borderRadius: 9999, px: 2.5, py: 0.8,
            fontWeight: 600, fontSize: '0.82rem', textTransform: 'none',
            color: textSecondary,
            '&:hover': { bgcolor: st.cancelBtnHoverBg },
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
            bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none',
            '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
            transition: 'all 0.2s ease',
          }}
        >
          {isEditing ? '저장하기' : '추가하기'}
        </Button>
      </Box>
    </Dialog>
  )
}

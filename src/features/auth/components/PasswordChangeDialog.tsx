// src/features/auth/components/PasswordChangeDialog.tsx
// 초기 로그인 시 비밀번호 변경 강제 다이얼로그 (닫기 불가)
import LockResetIcon from '@mui/icons-material/LockReset'
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useChangePassword } from '@/api/queries/useAuth'
import { useSnackbar } from '@/context/SnackbarContext'
import { useThemeMode } from '@/context/ThemeContext'
import { getApiErrorMessage } from '@/utils/apiError'

export default function PasswordChangeDialog({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const { isDarkMode } = useThemeMode()
  const { showSnackbar } = useSnackbar()
  const mutation = useChangePassword()

  const [currentPassword, setCurrentPassword]   = useState('')
  const [newPassword, setNewPassword]           = useState('')
  const [confirmPassword, setConfirmPassword]   = useState('')
  const [showCurrent, setShowCurrent]           = useState(false)
  const [showNew, setShowNew]                   = useState(false)
  const [showConfirm, setShowConfirm]           = useState(false)
  const [errors, setErrors] = useState<{ current?: string; new?: string; confirm?: string }>({})

  useEffect(() => {
    if (!open) {
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
      setShowCurrent(false); setShowNew(false); setShowConfirm(false)
      setErrors({})
    }
  }, [open])

  const bg      = isDarkMode ? '#0f172a' : '#ffffff'
  const surface = isDarkMode ? '#1e293b' : '#f8fafc'
  const border  = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const text    = isDarkMode ? '#f1f5f9' : '#0f172a'
  const muted   = isDarkMode ? '#94a3b8' : '#64748b'
  const accent  = '#6366f1'

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (!currentPassword) next.current = '현재 비밀번호를 입력해주세요.'
    if (!newPassword) next.new = '새 비밀번호를 입력해주세요.'
    else if (newPassword.length < 8) next.new = '새 비밀번호는 8자 이상이어야 합니다.'
    if (!confirmPassword) next.confirm = '새 비밀번호 확인을 입력해주세요.'
    else if (newPassword && newPassword !== confirmPassword) next.confirm = '새 비밀번호가 일치하지 않습니다.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await mutation.mutateAsync({ currentPassword, newPassword })
      showSnackbar('비밀번호가 변경되었습니다.', 'success')
      onClose?.()
    } catch (err) {
      const msg = getApiErrorMessage(err, '비밀번호 변경에 실패했습니다.')
      if (msg.includes('현재 비밀번호')) {
        setErrors({ current: msg })
      } else if (msg.includes('달라야')) {
        setErrors({ new: msg })
      } else {
        showSnackbar(msg, 'error')
      }
    }
  }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: surface,
      fontSize: '0.9rem',
      '& fieldset': { borderColor: border },
      '&:hover fieldset': { borderColor: accent },
      '&.Mui-focused fieldset': { borderColor: accent },
    },
    '& .MuiInputBase-input': { color: text, WebkitTextFillColor: text },
    '& .MuiInputLabel-root': { color: muted },
    '& .MuiInputLabel-root.Mui-focused': { color: accent },
    '& .MuiFormHelperText-root': { mx: 0 },
  }

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown={!onClose}
      onClose={onClose ?? (() => {})}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: bg,
            border: `1px solid ${border}`,
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: { sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(0,0,0,0.6)' } },
      }}
    >
      {/* 상단 강조 바 */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${accent}, #818cf8)` }} />

      <Box sx={{ px: 3, pt: 3, pb: 3.5 }}>
        {/* 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: 2,
              bgcolor: `${accent}20`, border: `1px solid ${accent}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <LockResetIcon sx={{ fontSize: '1.3rem', color: accent }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontWeight={700} sx={{ color: text, fontSize: '1rem', lineHeight: 1.3 }}>
              {onClose ? '비밀번호 변경' : '비밀번호 변경 필요'}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: muted, lineHeight: 1.4 }}>
              {onClose ? '현재 비밀번호를 확인 후 새 비밀번호를 설정하세요' : '초기 비밀번호를 변경해야 서비스를 이용할 수 있습니다'}
            </Typography>
          </Box>
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ color: muted, '&:hover': { color: text } }}>
              <CloseIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="현재 비밀번호"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => { setCurrentPassword(e.target.value); setErrors((p) => ({ ...p, current: undefined })) }}
            error={!!errors.current}
            helperText={errors.current}
            size="small"
            fullWidth
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowCurrent((v) => !v)} sx={{ color: muted }}>
                      {showCurrent ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={fieldSx}
          />

          <TextField
            label="새 비밀번호"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setErrors((p) => ({ ...p, new: undefined })) }}
            error={!!errors.new}
            helperText={errors.new ?? '8자 이상 입력해주세요'}
            size="small"
            fullWidth
            autoComplete="new-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowNew((v) => !v)} sx={{ color: muted }}>
                      {showNew ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={fieldSx}
          />

          <TextField
            label="새 비밀번호 확인"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })) }}
            error={!!errors.confirm}
            helperText={errors.confirm}
            size="small"
            fullWidth
            autoComplete="new-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowConfirm((v) => !v)} sx={{ color: muted }}>
                      {showConfirm ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={fieldSx}
          />

          <Button
            variant="contained"
            fullWidth
            disabled={mutation.isPending}
            onClick={handleSubmit}
            sx={{
              mt: 0.5, py: 1.3, borderRadius: 2,
              fontWeight: 700, fontSize: '0.9rem', textTransform: 'none',
              bgcolor: accent, boxShadow: 'none',
              '&:hover': { bgcolor: '#4f46e5', boxShadow: 'none' },
              '&.Mui-disabled': { bgcolor: accent, opacity: 0.5 },
            }}
          >
            {mutation.isPending
              ? <><CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />변경 중...</>
              : '비밀번호 변경'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

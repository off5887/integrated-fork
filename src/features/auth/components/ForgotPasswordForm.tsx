// src/features/auth/components/ForgotPasswordForm.tsx
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>
  isLoading?: boolean
  error?: string | null
  successMessage?: string | null
}

export default function ForgotPasswordForm({
  onSubmit,
  isLoading = false,
  error = null,
  successMessage = null,
}: ForgotPasswordFormProps) {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email.trim()) {
      setLocalError('이메일을 입력해주세요.')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError('올바른 이메일 형식이 아닙니다.')
      return
    }

    try {
      await onSubmit(email.trim())
    } catch (err: any) {
      setLocalError(err.message || '비밀번호 재설정 요청에 실패했습니다.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
      </Typography>

      <TextField
        fullWidth
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        autoFocus
        autoComplete="email"
        disabled={isLoading}
        error={!!localError}
        helperText={localError}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{
          mt: 3,
          py: 1.5,
          bgcolor: theme.palette.primary.main,
          '&:hover': { bgcolor: theme.palette.primary.dark },
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
            처리 중...
          </>
        ) : (
          '비밀번호 재설정 링크 받기'
        )}
      </Button>
    </Box>
  )
}

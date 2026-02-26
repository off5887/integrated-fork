// src/routes/MileageExchangeDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  open: boolean
  onClose: () => void
  amount: number
  onConfirm: () => void
}

export default function MileageExchangeDialog({
  open,
  onClose,
  amount,
  onConfirm,
}: Props) {
  const isDarkMode = useThemeMode().isDarkMode

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: isDarkMode
            ? 'rgba(30,41,59,0.94)'
            : 'rgba(255,255,255,0.97)',
          border: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.28)' : 'rgba(148,163,184,0.32)'}`,
          color: isDarkMode ? '#f1f5f9' : '#0f172a',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>
        현금 전환 신청
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {amount.toLocaleString()} 마리
        </Typography>
        <Typography variant="body1" color={isDarkMode ? '#cbd5e1' : '#475569'}>
          선택한 생선을 현금으로 전환하시겠습니까?
          <br />
          <strong>전환 후에는 취소할 수 없습니다.</strong>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 120,
            borderColor: isDarkMode ? '#94a3b8' : '#cbd5e1',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            minWidth: 120,
            bgcolor: isDarkMode ? '#6366f1' : '#4f46e5',
            color: '#fff',
            '&:hover': { bgcolor: isDarkMode ? '#818cf8' : '#4338ca' },
          }}
        >
          전환 신청
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// src/features/idea/components/DraftRestoreBanner.tsx
// 임시저장된 내용이 있을 때 복원 또는 버리기를 선택하는 배너
import HistoryIcon from '@mui/icons-material/History'
import RestoreIcon from '@mui/icons-material/Restore'
import { Box, Button, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'
import type { DraftData } from '@/api/types/idea'

interface DraftRestoreBannerProps {
  savedDraft: DraftData
  onRestore: () => void
  onDiscard: () => void
}

export default function DraftRestoreBanner({ savedDraft, onRestore, onDiscard }: DraftRestoreBannerProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary } = it

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.75,
        mb: 2.5,
        borderRadius: 2.5,
        bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
        border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.18)'}`,
        flexWrap: 'wrap',
      }}
    >
      <HistoryIcon sx={{ fontSize: '1.2rem', color: '#6366f1', flexShrink: 0 }} />
      <Box flex={1} minWidth={0}>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>
          작성 중인 임시저장 내용이 있습니다
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
          {new Date(savedDraft.savedAt).toLocaleString('ko-KR', {
            month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })} 에 자동저장됨
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={onDiscard}
          sx={{
            fontSize: '0.78rem',
            fontWeight: 600,
            borderRadius: 1.5,
            px: 1.75,
            py: 0.5,
            borderColor: isDarkMode ? 'rgba(148,163,184,0.25)' : 'rgba(203,213,225,0.7)',
            color: textSecondary,
            textTransform: 'none',
            '&:hover': { borderColor: textSecondary, bgcolor: 'transparent' },
          }}
        >
          무시
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<RestoreIcon sx={{ fontSize: '0.9rem' }} />}
          onClick={onRestore}
          sx={{
            fontSize: '0.78rem',
            fontWeight: 700,
            borderRadius: 1.5,
            px: 1.75,
            py: 0.5,
            bgcolor: '#6366f1',
            color: '#fff',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' },
          }}
        >
          불러오기
        </Button>
      </Box>
    </Box>
  )
}

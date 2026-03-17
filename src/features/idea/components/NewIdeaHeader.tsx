// src/features/idea/components/NewIdeaHeader.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SaveIcon from '@mui/icons-material/Save'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'

function formatTime(date: Date) {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
}

interface NewIdeaHeaderProps {
  lastSavedAt: Date | null
  onBack: () => void
  onManualSave: () => void
}

export default function NewIdeaHeader({ lastSavedAt, onBack, onManualSave }: NewIdeaHeaderProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor } = it

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
      }}
    >
      <IconButton
        onClick={onBack}
        size="small"
        sx={{
          color: textSecondary,
          bgcolor: borderColor,
          borderRadius: 2,
          '&:hover': {
            bgcolor: it.inputBorder,
          },
        }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>

      <Box flex={1} minWidth={0}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          새로운 상상 제안
        </Typography>
        <Typography variant="caption" sx={{ color: textSecondary }}>
          아이디어를 제안하고 함께 실현해보세요
        </Typography>
      </Box>

      {/* 마지막 저장 시각 + 수동저장 버튼 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {lastSavedAt && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              bgcolor: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: '0.8rem', color: '#10b981' }} />
            <Typography sx={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {formatTime(lastSavedAt)} 임시저장
            </Typography>
          </Box>
        )}
        <Tooltip title="임시저장" placement="bottom">
          <IconButton
            size="small"
            onClick={onManualSave}
            sx={{
              color: textSecondary,
              border: `1px solid ${borderColor}`,
              borderRadius: 1.5,
              width: 34,
              height: 34,
              '&:hover': {
                bgcolor: it.accent.bgStrong,
                borderColor: '#6366f1',
                color: '#6366f1',
              },
            }}
          >
            <SaveIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

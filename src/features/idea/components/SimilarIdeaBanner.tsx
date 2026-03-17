// src/features/idea/components/SimilarIdeaBanner.tsx
import { Box, Button, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'

interface SimilarIdeaBannerProps {
  onOpenSearch: () => void
}

export default function SimilarIdeaBanner({ onOpenSearch }: SimilarIdeaBannerProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary } = it

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2 },
        px: 2.5, py: 1.75, mb: 2.5,
        borderRadius: 2.5,
        bgcolor: it.accent.bgHover,
        border: `1px solid ${it.accent.border}`,
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          bgcolor: it.accent.bgStrong,
          border: `1px solid ${it.accent.borderHover}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}
      >
        🔍
      </Box>
      <Box flex={1} minWidth={0}>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>
          유사한 아이디어가 이미 있을 수 있어요
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
          제안 전 기존 아이디어와 중복 여부를 확인해 보세요
        </Typography>
      </Box>
      <Button
        size="small"
        variant="outlined"
        onClick={onOpenSearch}
        sx={{
          borderRadius: 2, px: 2, py: 0.7,
          fontWeight: 700, fontSize: '0.8rem',
          textTransform: 'none', flexShrink: 0,
          borderColor: it.accent.borderHover,
          color: it.accent.text,
          '&:hover': {
            borderColor: '#6366f1',
            bgcolor: it.accent.bgStrong,
          },
        }}
      >
        유사 아이디어 검색
      </Button>
    </Box>
  )
}

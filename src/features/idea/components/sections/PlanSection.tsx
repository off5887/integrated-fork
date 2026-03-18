// src/features/idea/components/sections/PlanSection.tsx
// 실행 계획 입력 섹션 (자유 텍스트 에디터)
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'

interface PlanSectionProps {
  plan: string
  setPlan: (value: string) => void
}

export default function PlanSection({ plan, setPlan }: PlanSectionProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary } = it

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: it.accent.color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          3
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          실행 계획
        </Typography>
      </Box>
      <Box
        component="textarea"
        value={plan}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlan(e.target.value)}
        placeholder="구체적인 실행 계획을 작성해주세요"
        rows={7}
        sx={{
          width: '100%',
          resize: 'vertical',
          minHeight: 160,
          p: 2,
          borderRadius: 2,
          border: `1px solid ${it.inputBorder}`,
          bgcolor: it.inputBg,
          color: textPrimary,
          fontSize: '0.9rem',
          fontFamily: 'inherit',
          lineHeight: 1.7,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease',
          '&::placeholder': { color: textSecondary },
          '&:hover': {
            borderColor: it.inputHoverBorder,
          },
          '&:focus': {
            borderColor: it.accent.color,
            borderWidth: '1.5px',
            boxShadow: `0 0 0 3px ${it.accent.bgStrong}`,
          },
        }}
      />
    </Box>
  )
}

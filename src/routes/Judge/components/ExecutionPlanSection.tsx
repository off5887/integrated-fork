// src/routes/Judge/components/ExecutionPlanSection.tsx
import DescriptionIcon from '@mui/icons-material/Description'
import { Box, Typography } from '@mui/material'

interface Props {
  executionPlan: string
  isDarkMode: boolean
}

export default function ExecutionPlanSection({
  executionPlan,
  isDarkMode,
}: Props) {
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <DescriptionIcon sx={{ color: accent, fontSize: 24 }} />
        <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
          실행 계획
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.9,
          fontSize: '1.05rem',
          color: isDarkMode ? '#cbd5e1' : '#334155',
          whiteSpace: 'pre-line',
        }}
      >
        {executionPlan}
      </Typography>
    </Box>
  )
}

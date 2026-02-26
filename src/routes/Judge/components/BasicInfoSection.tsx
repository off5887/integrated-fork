// src/routes/Judge/components/BasicInfoSection.tsx
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Typography } from '@mui/material'

interface Props {
  problem: string
  solution: string
  isDarkMode: boolean
}

export default function BasicInfoSection({
  problem,
  solution,
  isDarkMode,
}: Props) {
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
          기본 정보
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WarningAmberIcon sx={{ color: accent, fontSize: 22 }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
            >
              문제점 도출
            </Typography>
          </Box>
          <Typography
            sx={{
              lineHeight: 1.8,
              color: isDarkMode ? '#cbd5e1' : '#334155',
              whiteSpace: 'pre-line',
            }}
          >
            {problem}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LightbulbIcon sx={{ color: accent, fontSize: 22 }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
            >
              해결 대안
            </Typography>
          </Box>
          <Typography
            sx={{
              lineHeight: 1.8,
              color: isDarkMode ? '#cbd5e1' : '#334155',
              whiteSpace: 'pre-line',
            }}
          >
            {solution}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

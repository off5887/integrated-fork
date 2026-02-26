// src/routes/Judge/components/ScheduleSection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Box, Typography } from '@mui/material'

interface Props {
  startDate: string
  endDate: string
  scope: string
  isDarkMode: boolean
}

export default function ScheduleSection({
  startDate,
  endDate,
  scope,
  isDarkMode,
}: Props) {
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <CalendarTodayIcon sx={{ color: accent, fontSize: 24 }} />
        <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
          실행 일정 & 공개 범위
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 5,
        }}
      >
        {/* 실행 일정 */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              mb: 1.5,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
            }}
          >
            실행 기간
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: isDarkMode ? '#cbd5e1' : '#334155',
            }}
          >
            {startDate} ~ {endDate}
          </Typography>
        </Box>

        {/* 공개 범위 */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              mb: 1.5,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
            }}
          >
            공개 범위
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: isDarkMode ? '#cbd5e1' : '#334155',
            }}
          >
            {scope}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

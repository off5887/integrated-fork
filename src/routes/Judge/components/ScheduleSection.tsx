// src/routes/Judge/components/ScheduleSection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PublicIcon from '@mui/icons-material/Public'
import { Box, Typography } from '@mui/material'

interface Props {
  startDate: string
  endDate: string
  scope: string
  isDarkMode: boolean
}

export default function ScheduleSection({ startDate, endDate, scope, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textBody = isDarkMode ? '#cbd5e1' : '#334155'

  const panelBase = {
    flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
    bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.09)'}`,
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          3
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          실행 일정 & 공개 범위
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CalendarTodayIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem' }}>
              실행 기간
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: textBody, fontSize: '0.95rem' }}>
            {startDate} ~ {endDate}
          </Typography>
        </Box>

        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <PublicIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem' }}>
              공개 범위
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: textBody, fontSize: '0.95rem' }}>
            {scope}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

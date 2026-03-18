// src/routes/Judge/components/ScheduleSection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PublicIcon from '@mui/icons-material/Public'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  startDate: string
  endDate: string
  scope: string
}

export default function ScheduleSection({ startDate, endDate, scope }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  const panelBase = {
    flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
    bgcolor: theme.panelBg,
    border: `1px solid ${theme.panelBorder}`,
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: theme.sectionNumBg, color: theme.sectionNumColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          3
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          실행 일정 & 공개 범위
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CalendarTodayIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              실행 기간
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: theme.textBody, fontSize: '0.95rem' }}>
            {startDate} ~ {endDate}
          </Typography>
        </Box>

        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <PublicIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              공개 범위
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: theme.textBody, fontSize: '0.95rem' }}>
            {scope}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

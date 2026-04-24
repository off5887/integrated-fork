// src/routes/Judge/components/ScheduleSection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import { Box, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  startDate: string
  endDate: string
  security?: 'public' | 'private'
}

export default function ScheduleSection({ startDate, endDate, security }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

  const isPublic = security !== 'private'

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
        {/* 실행 기간 */}
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CalendarTodayIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              실행 기간
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: theme.textBody, fontSize: '0.95rem' }}>
            {startDate && endDate
              ? `${startDate} ~ ${endDate}`
              : startDate || endDate || '일정 미등록'}
          </Typography>
          {startDate && endDate && (() => {
            const days = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
            if (days < 0) return null
            const label = days === 0 ? '당일' : days < 7 ? `${days}일` : days < 30 ? `약 ${Math.round(days / 7)}주` : days < 365 ? `약 ${Math.round(days / 30)}개월` : `약 ${Math.round(days / 365)}년`
            return (
              <Typography sx={{ fontSize: '0.75rem', color: colors.textSecondary, mt: 0.5 }}>
                총 {label}
              </Typography>
            )
          })()}
        </Box>

        {/* 공개 범위 */}
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            {isPublic
              ? <PublicIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
              : <LockIcon sx={{ color: '#8b5cf6', fontSize: '1.1rem' }} />
            }
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              공개 범위
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                px: 1.25, py: 0.4, borderRadius: 1.5,
                bgcolor: isPublic ? 'rgba(99,102,241,0.1)' : 'rgba(139,92,246,0.1)',
                border: `1px solid ${isPublic ? 'rgba(99,102,241,0.3)' : 'rgba(139,92,246,0.3)'}`,
              }}
            >
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: isPublic ? theme.primaryIconColor : '#8b5cf6' }}>
                {isPublic ? '🌐 전체 공개' : '🔒 비공개'}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: colors.textSecondary, mt: 1, lineHeight: 1.5 }}>
            {isPublic
              ? '등록 후 모든 구성원에게 공개됩니다.'
              : '제안자와 심사자만 열람할 수 있습니다.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

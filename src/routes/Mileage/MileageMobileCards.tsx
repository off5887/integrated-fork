// src/routes/MileageMobileCards.tsx
import { alpha, Box, Checkbox, Divider, Paper, Typography } from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  data: any[]
  selected: number[]
  onToggle: (id: number) => void
}

export default function MileageMobileCards({
  data,
  selected,
  onToggle,
}: Props) {
  const { isDarkMode } = useThemeMode()

  const colors = {
    surface2: isDarkMode ? '#1e293b' : '#ffffff',
    border: isDarkMode ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.25)',
    textPrimary: isDarkMode ? '#e2e8f0' : '#0f172a',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    primary: isDarkMode ? '#6366f1' : '#4f46e5',
    success: isDarkMode ? '#22d3ee' : '#06b6d4',
    warning: isDarkMode ? '#fbbf24' : '#d97706',
    danger: isDarkMode ? '#f87171' : '#ef4444',
    selected: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.08)',
    hover: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(79,70,229,0.04)',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        px: { xs: 1, sm: 2 },
      }}
    >
      {data.map((item) => {
        const isSelected = selected.includes(item.id)
        return (
          <Paper
            key={item.id}
            elevation={isDarkMode ? 4 : 1}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: isSelected ? colors.selected : colors.surface2,
              border: `1px solid ${colors.border}`,
              maxWidth: 480,
              mx: 'auto',
              width: '100%',
              transition: 'all 0.18s ease',
              boxShadow: isDarkMode
                ? '0 4px 20px rgba(0,0,0,0.35)'
                : '0 2px 12px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: isDarkMode
                  ? '0 12px 32px rgba(99,102,241,0.25)'
                  : '0 8px 24px rgba(79,70,229,0.15)',
                bgcolor: isSelected ? colors.selected : colors.hover,
              },
            }}
            onClick={() => onToggle(item.id)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Checkbox
                  checked={isSelected}
                  color="primary"
                  size="small"
                  sx={{ p: 0 }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color={colors.textPrimary}
                >
                  #{item.id}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  color:
                    item.status === '전환완료'
                      ? colors.success
                      : item.status === '전환요청중'
                        ? colors.warning
                        : colors.danger,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  bgcolor: alpha(
                    item.status === '전환완료'
                      ? colors.success
                      : item.status === '전환요청중'
                        ? colors.warning
                        : colors.danger,
                    0.12,
                  ),
                }}
              >
                {item.status}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: colors.border }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color={colors.textSecondary}>
                  지급일
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={colors.textPrimary}
                >
                  {item.paymentDate}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography variant="body2" color={colors.textSecondary}>
                  내역
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={colors.textPrimary}
                  sx={{ textAlign: 'right', flex: 1, pl: 3 }}
                >
                  {item.detail}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color={colors.textSecondary}>
                  생선
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  color={colors.primary}
                >
                  {item.fish} 마리
                </Typography>
              </Box>
            </Box>
          </Paper>
        )
      })}

      {data.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10, color: colors.textSecondary }}>
          <Typography variant="h6">표시할 데이터가 없습니다</Typography>
        </Box>
      )}
    </Box>
  )
}

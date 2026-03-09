// src/routes/Mileage/MileageMobileCards.tsx
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  data: any[]
}

const STATUS_MAP: Record<string, { color: string; bg: string; border: string }> = {
  전환완료:   { color: '#10b981', bg: '#10b98112', border: '#10b98128' },
  전환요청중: { color: '#f59e0b', bg: '#f59e0b12', border: '#f59e0b28' },
  default:   { color: '#ef4444', bg: '#ef444412', border: '#ef444428' },
}

export default function MileageMobileCards({ data }: Props) {
  const { isDarkMode } = useThemeMode()

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cardBg        = isDarkMode ? 'rgba(22,30,46,0.92)' : '#ffffff'
  const dividerColor  = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.4)'

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="body2" sx={{ color: textSecondary }}>표시할 데이터가 없습니다</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data.map((item) => {
        const statusStyle = STATUS_MAP[item.status] ?? STATUS_MAP.default

        return (
          <Box
            key={item.id}
            sx={{
              p: 2.5, borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 2px 12px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* 헤더 행 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: textSecondary }}>
                #{item.id}
              </Typography>

              {/* 상태 배지 */}
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center',
                  px: 1.25, py: 0.35, borderRadius: '999px',
                  bgcolor: statusStyle.bg, border: `1px solid ${statusStyle.border}`, gap: 0.75,
                }}
              >
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: statusStyle.color, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: statusStyle.color }}>
                  {item.status}
                </Typography>
              </Box>
            </Box>

            {/* 구분선 */}
            <Box sx={{ height: '1px', bgcolor: dividerColor, mb: 2 }} />

            {/* 내용 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 500 }}>지급일</Typography>
                <Typography variant="body2" sx={{ color: textPrimary }}>{item.paymentDate}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 500, flexShrink: 0 }}>내역</Typography>
                <Typography variant="body2" sx={{ color: textPrimary, textAlign: 'right', flex: 1 }}>
                  {item.detail}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 500 }}>생선</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={800} sx={{ color: '#6366f1' }}>
                    {item.fish.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 500 }}>마리</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

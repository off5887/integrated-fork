// src/routes/Mileage/MileageMobileCards.tsx
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import type { AwardItem } from '@/api/types/mileage'

interface Props {
  data: AwardItem[]
}

export default function MileageMobileCards({ data }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)

  const statusMap: Record<string, { color: string; bg: string; border: string }> = {
    전환완료:   { color: t.statusSuccessColor, bg: t.statusSuccessBg, border: t.statusSuccessBorder },
    전환요청중: { color: t.statusWarningColor, bg: t.statusWarningBg, border: t.statusWarningBorder },
    default:   { color: t.statusErrorColor,   bg: t.statusErrorBg,   border: t.statusErrorBorder },
  }

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="body2" sx={{ color: t.textSecondary }}>표시할 데이터가 없습니다</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data.map((item) => {
        const statusStyle = statusMap[item.status] ?? statusMap.default

        return (
          <Box
            key={item.id}
            sx={{
              p: 2.5, borderRadius: 3,
              bgcolor: t.cardBgMobile,
              border: `1px solid ${t.borderColor}`,
              boxShadow: t.mobileShadow,
              transition: 'box-shadow 0.2s ease',
              '&:hover': { boxShadow: t.mobileShadowHover },
            }}
          >
            {/* 헤더 행 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: t.textSecondary }}>
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
            <Box sx={{ height: '1px', bgcolor: t.borderColor, mb: 2 }} />

            {/* 내용 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: t.textSecondary, fontWeight: 500 }}>지급일</Typography>
                <Typography variant="body2" sx={{ color: t.textPrimary }}>{item.paymentDate}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Typography variant="caption" sx={{ color: t.textSecondary, fontWeight: 500, flexShrink: 0 }}>내역</Typography>
                <Typography variant="body2" sx={{ color: t.textPrimary, textAlign: 'right', flex: 1 }}>
                  {item.detail}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: t.textSecondary, fontWeight: 500 }}>생선</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={800} sx={{ color: t.primaryColor }}>
                    {item.fish.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: t.textSecondary, fontWeight: 500 }}>마리</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

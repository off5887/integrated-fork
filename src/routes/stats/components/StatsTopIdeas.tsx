// src/routes/stats/components/StatsTopIdeas.tsx
import { Box, Card, CardContent, Typography, alpha, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import type { StatsTheme } from '@/theme/statsTheme'

const TOP_IDEAS = [
  { title: '사내 카페 메뉴 다양화', likes: 142 },
  { title: '원격 근무 시간 유연화', likes: 98 },
  { title: '재택근무 복지 확대', likes: 87 },
  { title: '회의 문화 개선', likes: 76 },
  { title: '사내 도서관 디지털화', likes: 65 },
]

interface Props {
  t: StatsTheme
}

export default function StatsTopIdeas({ t }: Props) {
  const theme = useTheme()

  const cardStyle = {
    borderRadius: 16,
    background: t.cardBg,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${t.cardBorder}`,
    boxShadow: t.cardShadow,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: t.cardHoverShadow,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ scale: 1.015 }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={{ p: { xs: 3, md: 10, lg: 10 } }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 2.5, color: t.primaryColor }}
          >
            인기 상상 TOP 5
          </Typography>

          {TOP_IDEAS.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                borderBottom:
                  i < 4
                    ? `1px solid ${alpha(theme.palette.divider, 0.15)}`
                    : 'none',
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ minWidth: 32, color: t.textPrimary }}
              >
                {i + 1}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1, ml: 2, color: t.textPrimary }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color={t.textSecondary}
                sx={{ minWidth: 80, textAlign: 'right' }}
              >
                {item.likes} 공감
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

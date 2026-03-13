// src/routes/stats/components/StatsMyGom.tsx
import { Box, Card, CardContent, LinearProgress, Typography, alpha, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import type { StatsTheme } from '@/theme/statsTheme'

interface Props {
  t: StatsTheme
  fishTotal: number
  fishToNextLevel: number
}

export default function StatsMyGom({ t, fishTotal, fishToNextLevel }: Props) {
  const theme = useTheme()
  const progress = (fishTotal / fishToNextLevel) * 100

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
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.015 }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 2.5, color: t.primaryColor }}
          >
            나의 곰곰이
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <img
              src="/gomgom_level3.png"
              alt="곰곰이"
              style={{
                width: 110,
                height: 110,
                borderRadius: 20,
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography variant="h4" fontWeight={800} sx={{ color: t.textPrimary }}>
                Lv.12
              </Typography>
              <Typography variant="subtitle1" color={t.textSecondary}>
                상상직급 : 마스터 곰
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: t.textPrimary }}>
              생선 {fishTotal.toLocaleString()} 마리
            </Typography>
            <Typography variant="body2" color={t.textSecondary} sx={{ mt: 0.5 }}>
              현금 환산 : {(fishTotal * 100).toLocaleString()} 원
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: alpha(t.primaryColor, 0.2),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${t.primaryColor})`,
                  borderRadius: 6,
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                right: 0,
                top: -24,
                color: t.primaryColor,
                fontWeight: 600,
              }}
            >
              {progress.toFixed(0)}%
            </Typography>
          </Box>

          <Typography variant="body2" align="right" color={t.textSecondary}>
            다음 레벨까지 {(fishToNextLevel - fishTotal).toLocaleString()} 마리 남음
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

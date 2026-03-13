// src/routes/stats/components/StatsExecutionRate.tsx
import { Box, Card, CardContent, LinearProgress, Typography, alpha, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import type { StatsTheme } from '@/theme/statsTheme'

interface Props {
  t: StatsTheme
}

export default function StatsExecutionRate({ t }: Props) {
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
      transition={{ duration: 0.7, delay: 0.3 }}
      whileHover={{ scale: 1.015 }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 }, textAlign: 'center' }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 3, color: t.primaryColor }}
          >
            실행 완료율
          </Typography>

          <Box
            sx={{
              position: 'relative',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ color: t.primaryColor, lineHeight: 1 }}
            >
              73.4%
            </Typography>

            <LinearProgress
              variant="determinate"
              value={73.4}
              sx={{
                position: 'absolute',
                bottom: 30,
                left: '10%',
                right: '10%',
                height: 12,
                borderRadius: 6,
                backgroundColor: alpha(t.primaryColor, 0.2),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${t.primaryColor})`,
                  borderRadius: 6,
                },
              }}
            />
          </Box>

          <Typography variant="body2" color={t.textSecondary} sx={{ mt: 3 }}>
            실행요청 후 방치 비율 개선 필요
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

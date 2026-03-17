// src/components/CommonHeader.tsx
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getTFTheme } from '@/theme/tfTheme'

export default function CommonHeader({ fishCount = 12480 }) {
  const { isDarkMode } = useThemeMode()
  const tf = getTFTheme(isDarkMode)

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: tf.headerBg,
        borderBottom: tf.headerBorder,
        color: tf.headerColor,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
          px: { xs: 3, md: 6 },
          py: 2.5,
          justifyContent: 'space-between',
        }}
      >
        {/* 왼쪽: 마일리지 숫자만 */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight={800}>
            {fishCount.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            마일리지
          </Typography>
        </Box>

        {/* 오른쪽: 아무것도 없음 (토글 삭제) */}
        <Box />
      </Toolbar>
    </AppBar>
  )
}

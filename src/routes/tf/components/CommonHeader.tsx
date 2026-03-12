// src/components/CommonHeader.tsx
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

export default function CommonHeader({ fishCount = 12480 }) {
  const { isDarkMode } = useThemeMode()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        borderBottom: isDarkMode
          ? '1px solid rgba(226,232,240,0.08)'
          : '1px solid rgba(15,23,42,0.06)',
        color: isDarkMode ? '#e2e8f0' : '#0f172a',
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

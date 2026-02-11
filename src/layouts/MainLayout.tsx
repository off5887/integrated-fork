// src/layouts/MainLayout.tsx
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* 헤더 높이만큼 패딩 + 콘텐츠 영역 */}
      <Box
        component="main"
        sx={{
          pt: { xs: 8, sm: 9 }, // AppBar 높이 (64px + 여유)
          px: { xs: 2, sm: 3, md: 4 },
          pb: 6,
        }}
      >
        <Outlet /> {/* ← 여기서 Dashboard가 들어옴 */}
      </Box>
    </Box>
  )
}

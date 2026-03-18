// src/features/error/NotFoundPage.tsx
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 800 }}>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        페이지를 찾을 수 없습니다
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        대시보드로 이동
      </Button>
    </Box>
  )
}

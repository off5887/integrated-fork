// src/layouts/MainLayout.tsx
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/nav/NavShell'
import PasswordChangeDialog from '@/features/auth/components/PasswordChangeDialog'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useThemeMode } from '@/context/ThemeContext'
import ErrorBoundary from '@/components/common/routing/ErrorBoundary'

export default function MainLayout() {
  const { isDarkMode } = useThemeMode()
  const { user } = useCurrentUser()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0b121f' : 'background.default',
      }}
    >
      <Header />

      {/* 헤더 높이만큼 패딩 + 콘텐츠 영역 */}
      <Box
        component="main"
        sx={{
          px: 0,
          py: 0,
        }}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>

      <PasswordChangeDialog open={!!user?.mustChangePassword} />
    </Box>
  )
}

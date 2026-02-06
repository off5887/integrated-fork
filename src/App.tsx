// src/App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles' // ← 이름은 그대로 써도 되지만
import { Navigate, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { lightTheme } from './theme' // lightTheme만 import (다크모드는 Context에서 동적 처리)

import ProtectedRoute from './components/common/ProtectedRoute'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

import Dashboard from './routes/Dashboard/Dashboard'
import Login from './routes/Login'
import Welcome from './routes/Welcome/Welcome'

export default function App() {
  return (
    <ThemeProvider>
      {/* Context에서 muiTheme을 동적으로 가져오려면 아래처럼 */}
      {/* 하지만 지금은 App.tsx 최상위에서 useThemeMode 호출이 안 되므로 lightTheme 기본 */}
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Routes>
          {/* 루트 경로: 토큰 유무에 따라 자동 리다이렉트 */}
          <Route
            path="/"
            element={
              localStorage.getItem('accessToken') ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 공개 페이지들 (헤더 없음) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>

          {/* 인증 필요 + 헤더 있는 페이지들 */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* 다른 보호된 페이지들 */}
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

// src/App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { lightTheme } from './theme' // lightTheme만 import (다크모드는 Context에서 동적 처리)

import ProtectedRoute from './components/common/ProtectedRoute'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

import Dashboard from './routes/Dashboard/Dashboard'
import NewIdea from './routes/Idea/NewIdea'
import Judge from './routes/Judge/Judge'
import RqMileage from './routes/Mileage/MileagePage'
import Stats from './routes/Stats/Stats'

import Login from './routes/Login'
import Settings from './routes/Settings/Settings'
import Welcome from './routes/Welcome/Welcome'

export default function App() {
  return (
    <ThemeProvider>
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

          {/* 공개 페이지들 (헤더 없음, AuthLayout 적용) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>

          {/* 인증 필요 + 헤더 있는 페이지들 (MainLayout 적용) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* 대시보드 */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 새 아이디어 작성 페이지 */}
              <Route path="/newIdea" element={<NewIdea />} />

              {/* 마일리지 신청 페이지 */}
              <Route path="/rqMileage" element={<RqMileage />} />

              {/* 심사 페이지 */}
              <Route path="/judge" element={<Judge />} />

              {/* 심사 페이지 */}
              <Route path="/stats" element={<Stats />} />
              {/* 필요 시 다른 보호된 페이지들 추가 */}
              {/* 예: <Route path="/mileage" element={<Mileage />} /> */}
              {/* 예: <Route path="/stats" element={<Stats />} /> */}

              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

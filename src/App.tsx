// src/App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { lightTheme } from './theme'

import ProtectedRoute from './components/common/ProtectedRoute'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

import Dashboard from './routes/Dashboard/Dashboard'
import IdeaBrowse from './routes/IdeaBrowse/IdeaBrowse'
import NewIdea from './routes/Idea/NewIdea'
import Judge from './routes/Judge/Judge'
import RqMileage from './routes/Mileage/MileagePage'
import Stats from './routes/Stats/Stats'

import Login from './routes/Login'
import Settings from './routes/Settings/Settings'
import Welcome from './routes/Welcome/Welcome'

// ─────────────── 새로 추가 ───────────────
import MercenaryManagementPage from './routes/TF/MercenaryManagementPage'
import MercenarySupportPage from './routes/TF/MercenarySupportPage'
// ────────────────────────────────────────

export default function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Routes>
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

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/newIdea" element={<NewIdea />} />
              <Route path="/ideaBrowse" element={<IdeaBrowse />} />
              <Route path="/rqMileage" element={<RqMileage />} />
              <Route path="/judge" element={<Judge />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />

              {/* ─────────────── 새로 추가 ─────────────── */}
              <Route
                path="/mercenary-support"
                element={<MercenarySupportPage />}
              />
              <Route
                path="/mercenary-management"
                element={<MercenaryManagementPage />}
              />
              {/* ──────────────────────────────────────── */}
            </Route>
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

// src/routes/index.tsx
import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from '@/components/common/ProtectedRoute'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { isAuthenticated } from '@/utils/auth'

import Login from '@/features/auth/Login'
import Dashboard from '@/features/dashboard/Dashboard'
import NewIdea from '@/features/idea/NewIdea'
import IdeaBrowse from '@/features/ideaBrowse/IdeaBrowse'
import Judge from '@/features/judge/Judge'
import RqMileage from '@/features/mileage/MileagePage'
import Stats from '@/features/stats/Stats'
import Settings from '@/features/settings/Settings'
import Welcome from '@/features/welcome/Welcome'
import MercenaryManagementPage from '@/features/tf/MercenaryManagementPage'
import MercenarySupportPage from '@/features/tf/MercenarySupportPage'
import NotFoundPage from '@/features/error/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
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
          <Route path="/mercenary-support" element={<MercenarySupportPage />} />
          <Route path="/mercenary-management" element={<MercenaryManagementPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

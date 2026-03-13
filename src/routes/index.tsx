// src/routes/index.tsx
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from '@/components/common/ProtectedRoute'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { isAuthenticated } from '@/utils/auth'

const Login                 = lazy(() => import('@/features/auth/Login'))
const Dashboard             = lazy(() => import('@/features/dashboard/Dashboard'))
const NewIdea               = lazy(() => import('@/features/idea/NewIdea'))
const IdeaBrowse            = lazy(() => import('@/features/ideaBrowse/IdeaBrowse'))
const Judge                 = lazy(() => import('@/features/judge/Judge'))
const RqMileage             = lazy(() => import('@/features/mileage/MileagePage'))
const Stats                 = lazy(() => import('@/features/stats/Stats'))
const Settings              = lazy(() => import('@/features/settings/Settings'))
const Welcome               = lazy(() => import('@/features/welcome/Welcome'))
const MercenaryManagementPage = lazy(() => import('@/features/tf/MercenaryManagementPage'))
const MercenarySupportPage    = lazy(() => import('@/features/tf/MercenarySupportPage'))
const NotFoundPage            = lazy(() => import('@/features/error/NotFoundPage'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  )
}

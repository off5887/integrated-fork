// src/routes/index.tsx
import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router'

import ErrorBoundary from '@/components/common/routing/ErrorBoundary'
import ProtectedRoute from '@/components/common/routing/ProtectedRoute'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { useCurrentUserQuery } from '@/api/queries/useCurrentUser'

const Login = lazy(() => import('@/features/auth/Login'))
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'))
const NewIdea = lazy(() => import('@/features/idea/NewIdea'))
const IdeaBrowse = lazy(() => import('@/features/ideaBrowse/IdeaBrowse'))
const Judge = lazy(() => import('@/features/judge/Judge'))
const RqMileage = lazy(() => import('@/features/mileage/MileagePage'))
const Stats = lazy(() => import('@/features/stats/Stats'))
const Settings = lazy(() => import('@/features/settings/Settings'))
const Welcome = lazy(() => import('@/features/welcome/Welcome'))
const MercenaryManagementPage = lazy(
  () => import('@/features/tf/MercenaryManagementPage'),
)
const MercenarySupportPage = lazy(
  () => import('@/features/tf/MercenarySupportPage'),
)
const NotFoundPage = lazy(() => import('@/features/error/NotFoundPage'))

// Suspense + ErrorBoundary 루트 레이아웃
function RootLayout() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}

// 루트("/") 리디렉트 — 인증 여부 확인 후 분기
function RootRedirect() {
  const { data: user, isLoading } = useCurrentUserQuery()
  if (isLoading) return <LoadingSpinner />
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Route>

      {/* 로그인 필요 — 모든 역할 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newIdea" element={<NewIdea />} />
          <Route path="/ideaBrowse" element={<IdeaBrowse />} />
          <Route path="/rqMileage" element={<RqMileage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/mercenary-support" element={<MercenarySupportPage />} />
          <Route path="/mercenary-management" element={<MercenaryManagementPage />} />
        </Route>
      </Route>

      {/* 심사자 + 관리자 전용 */}
      <Route element={<ProtectedRoute roles={['reviewer', 'admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/judge" element={<Judge />} />
        </Route>
      </Route>

      {/* 관리자 전용 */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
)

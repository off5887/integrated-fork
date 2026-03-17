import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '@/utils/auth'

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // 토큰 있으면 자식 라우트(Outlet) 렌더링
  return <Outlet />
}

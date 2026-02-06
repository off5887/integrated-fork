import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const token = localStorage.getItem('accessToken')

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // 토큰 있으면 자식 라우트(Outlet) 렌더링
  return <Outlet />
}

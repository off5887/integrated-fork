import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import TopProgressBar from './TopProgressBar'
import type { UserRole } from '@/api/types/auth'

interface Props {
  roles?: UserRole[]
}

export default function ProtectedRoute({ roles }: Props) {
  const { user, isLoading, role } = useCurrentUser()

  if (isLoading) return <TopProgressBar />
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" replace />

  return <Outlet />
}

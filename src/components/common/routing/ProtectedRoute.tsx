import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '@/utils/auth'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { UserRole } from '@/api/types/auth'

interface Props {
  roles?: UserRole[]
}

export default function ProtectedRoute({ roles }: Props) {
  const user = useCurrentUser()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

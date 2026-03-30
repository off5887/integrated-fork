import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUserWithLoading } from '@/features/auth/hooks/useCurrentUser'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import type { UserRole } from '@/api/types/auth'

interface Props {
  roles?: UserRole[]
}

export default function ProtectedRoute({ roles }: Props) {
  const { user, isLoading } = useCurrentUserWithLoading()

  if (isLoading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />

  return <Outlet />
}

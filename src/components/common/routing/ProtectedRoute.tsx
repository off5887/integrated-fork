import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUserQuery } from '@/api/queries/useCurrentUser'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import type { UserRole } from '@/api/types/auth'

interface Props {
  roles?: UserRole[]
}

export default function ProtectedRoute({ roles }: Props) {
  const { data: user, isLoading } = useCurrentUserQuery()

  if (isLoading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />

  return <Outlet />
}

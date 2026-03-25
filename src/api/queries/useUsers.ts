/**
 * 사용자 관련 쿼리/뮤테이션
 * - useUsers      : GET  /api/users
 * - useUpdateUser : PUT  /api/users/{employeeId}
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { type UserApiBizArea, type User } from '@/api/types/settings'
import { flattenUsers } from '@/utils/userUtils'
import type { ApiResponse } from '@/api/types/auth'
import { mockUsers } from '@/api/mock/settings'
import { withDemoFallback } from '@/utils/demoMode'

// ─── GET /api/users ───────────────────────────────────────────────────────────

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () =>
      withDemoFallback<User[]>(
        mockUsers,
        async () => {
          const res = await api.get<ApiResponse<UserApiBizArea[]>>('/api/users')
          return flattenUsers(res.data.data)
        },
      ),
    staleTime: 0,
  })
}

// ─── PUT /api/users/{employeeId} ─────────────────────────────────────────────

export interface UpdateUserRequest {
  name?: string
  email?: string
  rollNm?: string      // position (직급)
  section?: string     // department (팀)
  department?: string  // businessSite (사업소)
  isAdmin?: boolean
  isReviewer?: boolean
  isActive?: boolean
  password?: string
}

function toUpdateRequest(user: Partial<User & { password: string }>): UpdateUserRequest {
  const req: UpdateUserRequest = {}
  if (user.name !== undefined)         req.name = user.name
  if (user.email !== undefined)        req.email = user.email
  if (user.position !== undefined)     req.rollNm = user.position
  if (user.department !== undefined)   req.section = user.department
  if (user.businessSite !== undefined) req.department = user.businessSite
  if (user.role !== undefined) {
    req.isAdmin    = user.role === 'admin'
    req.isReviewer = user.role === 'reviewer'
  }
  if (user.active !== undefined)       req.isActive = user.active
  if (user.password)                   req.password = user.password
  return req
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: queryKeys.users.update(),
    mutationFn: ({ employeeId, data }: { employeeId: string; data: Partial<User & { password: string }> }) =>
      api.put(`/api/users/${employeeId}`, toUpdateRequest(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() })
    },
  })
}

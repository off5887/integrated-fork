/**
 * 사용자 관련 쿼리/뮤테이션
 * - useUsers      : GET  /api/users             (관리자 전용 — 전체 사용자)
 * - useUserRoles  : GET  /api/users/roles        (관리자 전용 — 권한별 분리 목록)
 * - useAdminUsers : GET  /api/users/admins       (로그인 — 쪽지 수신자용)
 * - useUpdateUser : PUT  /api/users/{employeeId}
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { type AdminUserItem, type UserRolesData, type UserApiBizArea, type User } from '@/api/types/settings'
import { flattenUsers } from '@/utils/userUtils'
import type { ApiResponse } from '@/api/types/auth'
import { mockAdminUsers, mockUserRoles, mockUsers, mockUsersBizArea } from '@/api/mock/settings'
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
          return flattenUsers(res.data.data ?? [])
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/users/roles — 권한별 분리 목록 (관리자 전용) ──────────────────

/** 관리자/심사자 목록 — GET /api/users/roles */
export function useUserRoles() {
  return useQuery({
    queryKey: queryKeys.users.roles(),
    queryFn: () =>
      withDemoFallback<UserRolesData>(
        mockUserRoles,
        async () => {
          const res = await api.get<ApiResponse<UserRolesData>>('/api/users/roles')
          return res.data.data
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/users/admins — 관리자 목록 (쪽지 수신자용, 로그인 접근 가능) ───

/** 관리자 수신자 목록 조회 — GET /api/users/admins */
export function useAdminUsers() {
  return useQuery({
    queryKey: queryKeys.users.admins(),
    queryFn: () =>
      withDemoFallback<AdminUserItem[]>(
        mockAdminUsers,
        async () => {
          const res = await api.get<ApiResponse<AdminUserItem[]>>('/api/users/admins')
          return res.data.data ?? []
        },
      ),
    staleTime: 0,
  })
}

// ─── GET /api/users (org tree — 공동제안자 선택용) ──────────────────────────

export function useOrgUsersTree() {
  return useQuery({
    queryKey: queryKeys.users.tree(),
    queryFn: () =>
      withDemoFallback<UserApiBizArea[]>(
        mockUsersBizArea,
        async () => {
          const res = await api.get<ApiResponse<UserApiBizArea[]>>('/api/users')
          return res.data.data ?? []
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

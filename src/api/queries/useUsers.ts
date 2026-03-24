/**
 * useUsers
 * GET /api/users — 사업소 → 팀 → 멤버 구조를 평탄화한 User[] 반환
 */
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { type UserApiBizArea, type User, flattenUsers } from '@/api/types/settings'

async function fetchUsers(): Promise<User[]> {
  const res = await api.get<UserApiBizArea[]>('/api/users')
  return flattenUsers(res.data)
}

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: fetchUsers,
  })
}

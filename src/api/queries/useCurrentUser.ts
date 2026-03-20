// src/api/queries/useCurrentUser.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import type { ApiResponse, UserProfile } from '@/api/types/auth'
import { queryKeys } from '@/api/queryKeys'

/**
 * 현재 로그인 사용자 정보를 반환합니다.
 * - 데모 계정: localStorage의 userProfile을 반환 (API 호출 없음)
 * - 실제 계정: GET /api/users/me 호출 (httpOnly 쿠키 자동 전송)
 * - 미인증: null 반환
 */
export function useCurrentUserQuery() {
  return useQuery<UserProfile | null>({
    queryKey: queryKeys.users.me(),
    queryFn: async (): Promise<UserProfile | null> => {
      // 데모 계정은 실제 쿠키 세션이 없으므로 localStorage에서 바로 반환
      const demoRaw = localStorage.getItem('userProfile')
      if (demoRaw) {
        try {
          return JSON.parse(demoRaw) as UserProfile
        } catch {
          localStorage.removeItem('userProfile')
        }
      }

      try {
        const res = await api.get<ApiResponse<UserProfile>>('/api/users/me')
        return res.data.data
      } catch {
        return null
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

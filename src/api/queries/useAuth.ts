/**
 * 인증 관련 쿼리/뮤테이션
 * - useLoginMutation : POST /api/auth/login
 * - useCurrentUserQuery : GET /api/users/me (또는 localStorage 데모 프로필)
 * - useChangePassword : PATCH /api/users/me/password
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { getApiErrorMessage } from '@/utils/apiError'
import { DEMO_STORAGE_KEY, clearDemoProfile } from '@/utils/demoMode'
import { handleSessionExpired } from '@/utils/sessionExpired'
import type { ApiResponse, LoginRequest, LoginResponse, UserProfile, UserMeResponse } from '@/api/types/auth'
import { mapUserProfile } from '@/api/types/auth'

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: queryKeys.auth.login(),
    mutationFn: async (credentials) => {
      const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
        '/api/auth/login',
        credentials,
      )
      // 래퍼 유무 모두 처리
      const payload = (response.data as ApiResponse<LoginResponse>).data ?? response.data
      return payload as LoginResponse
    },
  })
}

export function getLoginErrorMessage(err: unknown): string {
  return getApiErrorMessage(err, '알 수 없는 오류가 발생했습니다')
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

/** PATCH /api/users/me/password — 비밀번호 변경 */
export function useChangePassword() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ChangePasswordRequest) =>
      api.patch('/api/users/me/password', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() })
    },
  })
}

/**
 * 현재 로그인 사용자 정보를 반환합니다.
 * - 데모 계정 : localStorage 프로필 반환 (API 호출 없음)
 * - 실제 계정 : GET /api/users/me (httpOnly 쿠키 자동 전송)
 * - 미인증    : null 반환
 */
export function useCurrentUserQuery() {
  return useQuery<UserProfile | null>({
    queryKey: queryKeys.users.me(),
    queryFn: async (): Promise<UserProfile | null> => {
      const demoRaw = localStorage.getItem(DEMO_STORAGE_KEY)
      if (demoRaw) {
        try {
          return JSON.parse(demoRaw) as UserProfile
        } catch {
          clearDemoProfile()
        }
      }
      try {
        const res = await api.get<ApiResponse<UserMeResponse>>('/api/users/me')
        return mapUserProfile(res.data.data)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          await handleSessionExpired(() => api.post('/api/auth/logout'))
        }
        return null
      }
    },
    retry: false,
    staleTime: 0,
  })
}

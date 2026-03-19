import type { ApiResponse, LoginRequest, LoginResponse } from '@/api/types/auth'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/client'
import { isAxiosError } from 'axios'
import { queryKeys } from '@/api/queryKeys'

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: queryKeys.auth.login(),

    mutationFn: async (credentials: LoginRequest) => {
      const response = await api.post<ApiResponse<LoginResponse>>(
        '/api/auth/login',
        credentials,
      )
      return response.data.data
    },
  })
}

// 에러 메시지 헬퍼 함수 (any 없이 안전하게)
export function getLoginErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    const serverMessage = (err.response?.data as ApiResponse<unknown>)?.message
    if (serverMessage) return serverMessage
    return err.message || '서버 오류가 발생했습니다'
  }
  if (err instanceof Error) return err.message
  return '알 수 없는 오류가 발생했습니다'
}

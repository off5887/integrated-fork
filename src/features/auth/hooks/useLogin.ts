// src/features/auth/hooks/useLogin.ts
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { findDemoAccount } from '@/api/mock/auth'
import { queryKeys } from '@/api/queryKeys'
import { getLoginErrorMessage, useLoginMutation } from '@/api/queries/useAuth'
import { setDemoProfile, clearDemoProfile } from '@/utils/demoMode'

/**
 * 로그인 핸들러와 pending 상태를 반환합니다.
 * - 데모 계정: localStorage 저장 → 쿼리 캐시 제거 → /dashboard 이동
 * - 실제 계정: POST /api/auth/login (쿠키 발급) → /dashboard 이동
 * - 실패: 에러 메시지 string 반환 (성공 시 null)
 */
export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useLoginMutation()

  const login = async (employeeId: string, password: string): Promise<string | null> => {
    if (!employeeId.trim()) return '사번을 입력해주세요.'
    if (!password.trim()) return '비밀번호를 입력해주세요.'

    const demo = findDemoAccount(employeeId, password)
    if (demo) {
      setDemoProfile(demo.profile)
      queryClient.removeQueries({ queryKey: queryKeys.users.me() })
      startTransition(() => navigate('/dashboard'))
      return null
    }

    try {
      await mutation.mutateAsync({ employeeId, password })
      clearDemoProfile()
      queryClient.removeQueries()
      startTransition(() => navigate('/dashboard'))
      return null
    } catch (err) {
      return getLoginErrorMessage(err)
    }
  }

  return { login, isPending: mutation.isPending }
}

// src/features/auth/hooks/useCurrentUser.ts
import { useCurrentUserQuery } from '@/api/queries/useAuth'
import type { UserProfile } from '@/api/types/auth'

/**
 * 현재 로그인 사용자 프로필을 반환합니다.
 * - user: 로그인 중이면 UserProfile, 아니면 null
 * - isLoading: 인증 상태 확인 중
 */
export function useCurrentUser(): UserProfile | null {
  const { data } = useCurrentUserQuery()
  return data ?? null
}

/**
 * 로딩 상태까지 필요한 경우 사용합니다.
 */
export function useCurrentUserWithLoading(): { user: UserProfile | null; isLoading: boolean } {
  const { data, isLoading } = useCurrentUserQuery()
  return { user: data ?? null, isLoading }
}

// src/features/auth/hooks/useCurrentUser.ts
import { useCurrentUserQuery } from '@/api/queries/useCurrentUser'

/**
 * 현재 로그인 사용자 프로필을 반환합니다.
 * 로딩 중이거나 미인증이면 null을 반환합니다.
 */
export function useCurrentUser() {
  const { data } = useCurrentUserQuery()
  return data ?? null
}

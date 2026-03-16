import type { UserProfile } from '@/api/types/auth'

/**
 * localStorage에서 로그인한 사용자 프로필을 반환합니다.
 */
export function useCurrentUser(): UserProfile | null {
  const raw = localStorage.getItem('userProfile')
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserProfile
  } catch {
    return null
  }
}

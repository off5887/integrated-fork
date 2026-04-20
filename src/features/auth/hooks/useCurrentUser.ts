// src/features/auth/hooks/useCurrentUser.ts
import { useCurrentUserQuery } from '@/api/queries/useAuth'
import type { UserProfile, UserRole } from '@/api/types/auth'

export interface CurrentUserInfo {
  /** 전체 프로필 (avatarUrl 등 기타 필드 접근 시 사용) */
  user:       UserProfile | null
  isLoading:  boolean
  isAdmin:    boolean
  isReviewer: boolean
  name:       string
  role:       UserRole
  department: string
  employeeId: string
}

/**
 * 현재 로그인 사용자 정보와 파생값을 반환합니다.
 * - isAdmin / isReviewer: role 비교 반복 제거
 * - name / role / department / employeeId: 옵셔널 체이닝 없이 바로 사용 가능
 * - isLoading: 인증 상태 확인 중 (useCurrentUserWithLoading 대체)
 */
export function useCurrentUser(): CurrentUserInfo {
  const { data, isLoading } = useCurrentUserQuery()
  return {
    user:       data ?? null,
    isLoading,
    isAdmin:    data?.role === 'admin',
    isReviewer: data?.role === 'reviewer',
    name:       data?.name ?? '',
    role:       data?.role ?? 'user',
    department: data?.department ?? '',
    employeeId: data?.employeeId ?? '',
  }
}

/** @deprecated useCurrentUser()에 isLoading이 포함되어 있습니다 */
export function useCurrentUserWithLoading() {
  return useCurrentUser()
}

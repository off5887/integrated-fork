import type { UserProfile } from '@/api/types/auth'

/** localStorage 키를 한 곳에서 관리합니다. */
export const DEMO_STORAGE_KEY = 'gomgom_user_v1'

/**
 * 데모 계정으로 로그인한 경우 true를 반환합니다.
 * - 데모 계정: localStorage에 프로필 저장
 * - 실제 계정: httpOnly 쿠키 세션
 */
export function isDemoMode(): boolean {
  return !!localStorage.getItem(DEMO_STORAGE_KEY)
}

export function setDemoProfile(profile: UserProfile): void {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile))
}

export function clearDemoProfile(): void {
  localStorage.removeItem(DEMO_STORAGE_KEY)
}

/**
 * 데모 모드이면 mockData를 반환하고,
 * 실제 계정이면 apiFn()을 호출합니다.
 *
 * withDemoFallback을 사용하는 쿼리는 반드시 staleTime: 0을 명시해야 합니다.
 * (전역 staleTime으로 인해 캐시된 mock 데이터가 실제 계정에서도 표시되는 버그 방지)
 *
 * @example
 * queryFn: () => withDemoFallback(mockUsers, () =>
 *   api.get<ApiResponse<UserApiBizArea[]>>('/api/users').then(r => flattenUsers(r.data.data))
 * )
 */
export async function withDemoFallback<T>(mockData: T, apiFn: () => Promise<T>): Promise<T> {
  if (isDemoMode()) return mockData
  return apiFn()
}

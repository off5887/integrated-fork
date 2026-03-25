// src/api/types/auth.ts
export type UserRole = 'user' | 'reviewer' | 'admin'

export interface DemoAccount {
  id: string
  password: string
  profile: UserProfile
  roleLabel: string
  description: string
}

/** UI 전반에서 사용하는 사용자 프로필 모델 */
export interface UserProfile {
  employeeId: string
  name: string
  email: string
  position: string      // rollNm (사용자 목록 API) — /me 응답엔 없어서 빈값 허용
  department: string    // section (팀)
  businessSite: string  // department (사업소)
  role: UserRole        // isAdmin/isReviewer로 파생
  totalMileage: number
  gomLevel: number
  avatarUrl?: string
}

/** 모든 API 응답의 공통 래퍼 */
export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
}

export interface LoginRequest {
  employeeId: string
  password: string
}

/** /api/auth/login 응답의 data 필드 */
export interface LoginResponse {
  employeeId: string
  name: string
}

/** GET /api/users/me 응답의 data 필드 (원본 구조) */
export interface UserMeResponse {
  employeeId: string
  name: string
  email?: string            // 일부 계정은 이메일 없을 수 있음
  department?: string       // 사업소
  section?: string          // 팀
  rollNm?: string           // 직급 (null 허용)
  isAdmin: boolean
  isReviewer: boolean | null
  totalMileage?: number
  gomLevel?: number
  createdAt?: string
  lastSyncAt?: string
}

/** UserMeResponse → UserProfile 변환 */
export function mapUserProfile(data: UserMeResponse): UserProfile {
  return {
    employeeId: data.employeeId,
    name: data.name,
    email: data.email ?? '',
    position: data.rollNm ?? '',
    department: data.section ?? '',
    businessSite: data.department ?? '',
    role: data.isAdmin ? 'admin' : data.isReviewer ? 'reviewer' : 'user',
    totalMileage: data.totalMileage ?? 0,
    gomLevel: data.gomLevel ?? 0,
  }
}

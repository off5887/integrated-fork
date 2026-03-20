// src/api/types/auth.ts
export type UserRole = 'user' | 'reviewer' | 'admin'

export interface DemoAccount {
  id: string
  password: string
  profile: UserProfile
  roleLabel: string
  description: string
}

export interface UserProfile {
  employeeId: string
  name: string
  position: string
  department: string
  role: UserRole
  avatarUrl?: string
}

/** 모든 API 응답의 공통 래퍼: { data, message, success } */
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
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

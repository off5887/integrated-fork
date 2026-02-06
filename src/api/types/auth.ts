// src/api/types/auth.ts
export interface LoginRequest {
  employeeId: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  // 백엔드가 실제로 주는 다른 필드가 있다면 여기에 명시적으로 추가
  // 예시:
  // refreshToken?: string;
  // userId?: number;
  // role?: string;
  token: string
  employeeId: string
  name: string

  // 모르는 필드가 있을 수 있으니 unknown으로 열어둠 (any보다 안전)
  [key: string]: unknown
}

import type { UserProfile } from '@/api/types/auth'

// 로그인 데모 계정
export const DEMO_CREDENTIALS = { id: 'demo', password: 'demo1234' } as const

// 데모 사용자 프로필
export const DEMO_USER_PROFILE: UserProfile = {
  employeeId: 'demo',
  name: '홍길동',
  position: '대리',
  department: '개발팀',
}

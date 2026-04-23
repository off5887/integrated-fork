import type { DemoAccount, UserProfile, UserRole } from '@/api/types/auth'

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo',
    password: 'demo1234',
    roleLabel: '일반사용자',
    description: '대시보드·상상하기·마일리지 등 기본 기능',
    profile: {
      employeeId: 'demo',
      name: '홍길동',
      email: 'demo@example.com',
      position: '대리',
      department: '개발팀',
      businessSite: '서울사업소',
      role: 'user',
      totalMileage: 1200,
      gomLevel: 4,
      levelName: '곰신',
    },
  },
  {
    id: 'demo2',
    password: 'demo1234',
    roleLabel: '심사자',
    description: '일반 기능 + 심사하기',
    profile: {
      employeeId: 'demo2',
      name: '김심사',
      email: 'demo2@example.com',
      position: '과장',
      department: '기획팀',
      businessSite: '서울사업소',
      role: 'reviewer',
      totalMileage: 800,
      gomLevel: 1,
      levelName: '꼬마 곰곰이',
    },
  },
  {
    id: 'demo3',
    password: 'demo1234',
    roleLabel: '관리자',
    description: '모든 기능 + 시스템 설정',
    profile: {
      employeeId: 'demo3',
      name: '이관리',
      email: 'demo3@example.com',
      position: '부장',
      department: '경영지원부문',
      businessSite: '본사',
      role: 'admin',
      totalMileage: 500,
      gomLevel: 1,
      levelName: '꼬마 곰곰이',
    },
  },
]

/** 백엔드 연동 시 삭제 — 데모 계정 ID로 프로필 조회 */
export function findDemoAccount(id: string, password: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.id === id && a.password === password)
}

// 기존 호환용 (ideaBrowse.ts 등에서 DEMO_USER_PROFILE 참조)
export const DEMO_USER_PROFILE: UserProfile = DEMO_ACCOUNTS[0].profile
export const DEMO_REVIEWER_PROFILE: UserProfile = DEMO_ACCOUNTS[1].profile

export const ROLE_LABELS: Record<UserRole, string> = {
  user: '일반사용자',
  reviewer: '심사자',
  admin: '관리자',
}

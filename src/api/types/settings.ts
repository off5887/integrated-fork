import type { OrgMember } from '@/api/types/reviewer'

// ─── 이모지 ───────────────────────────────────────────────────────────────────

export interface EmojiGroup {
  label: string
  emojis: string[]
}

// ─── 사용자 관리 ─────────────────────────────────────────────────────────────

/** GET /api/users 응답 구조 */
export interface UserApiMember {
  employeeId: string
  name: string
  email: string
  rollNm: string       // 직급
  isAdmin: boolean
  isReviewer: boolean
}

export interface UserApiTeam {
  deptCd: string
  deptNm: string
  members: UserApiMember[]
}

export interface UserApiBizArea {
  bizAreaNm: string
  teams: UserApiTeam[]
}

/** UI에서 사용하는 평탄화된 사용자 모델 */
export interface User {
  id: string           // employeeId
  name: string
  employeeNumber: string
  email: string
  role: 'user' | 'reviewer' | 'admin'
  position: string     // rollNm
  department: string   // deptNm
  businessSite: string // bizAreaNm
  active: boolean
}

/** API 응답 → User[] 변환 */
export function flattenUsers(data: UserApiBizArea[]): User[] {
  return data.flatMap((biz) =>
    biz.teams.flatMap((team) =>
      team.members.map((m) => ({
        id: m.employeeId,
        name: m.name,
        employeeNumber: m.employeeId,
        email: m.email,
        role: m.isAdmin ? 'admin' : m.isReviewer ? 'reviewer' : 'user',
        position: m.rollNm,
        department: team.deptNm,
        businessSite: biz.bizAreaNm,
        active: true,
      } satisfies User)),
    ),
  )
}

// ─── 특별 마일리지 ────────────────────────────────────────────────────────────

export interface MileageMember extends OrgMember {
  employeeNumber: string
}

export interface MileageEntry extends MileageMember {
  mileage: string
  reason: string
}

export interface SpecialMileageHistory {
  id: number
  grantedAt: string
  name: string
  department: string
  position: string
  employeeNumber: string
  mileage: number
  reason: string
  revoked?: boolean
}

// ─── 심사 변경 ────────────────────────────────────────────────────────────────

export type IdeaStatus =
  | '임시저장'
  | '1차 심사 대기'
  | '실행자 선택'
  | '결과등록'
  | '결과심사'

export interface Idea {
  id: string
  title: string
  submitter: string
  department: string
  submittedAt: string
  status: IdeaStatus
  reviewers: {
    level1: OrgMember | null
  }
}

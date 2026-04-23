import type { OrgMember } from '@/api/types/reviewer'

// ─── 레벨 설정 ────────────────────────────────────────────────────────────────

export interface LevelConfig {
  level: number
  levelName: string
  minMileage: number
}

export interface LevelConfigUpdateRequest {
  levelName: string
  minMileage: number
}

// ─── 이모지 ───────────────────────────────────────────────────────────────────

export interface EmojiGroup {
  label: string
  emojis: string[]
}

// ─── 사용자 관리 ─────────────────────────────────────────────────────────────

/** GET /api/users/admins 응답 항목 — 쪽지 수신자 선택용 */
export interface AdminUserItem {
  employeeId: string
  name: string
}

/** GET /api/users/roles 응답 항목 */
export interface UserRoleItem {
  employeeId: string
  name: string
  department: string
  section: string
  rollNm: string
  email: string
  isAdmin: boolean
  isReviewer: boolean
  totalMileage: number
  gomLevel: number
}

/** GET /api/users/roles 응답 data */
export interface UserRolesData {
  admins: UserRoleItem[]
  reviewers: UserRoleItem[]
}

/** GET /api/users 응답 구조 */
export interface UserApiMember {
  employeeId: string
  name: string
  email: string
  rollNm: string           // 직급
  isAdmin: boolean
  isReviewer: boolean
  isActive?: boolean       // 활성화 여부 (없으면 true로 간주)
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


// ─── 부서별 심사자 ────────────────────────────────────────────────────────────

/** GET /api/section-reviewers, GET /api/section-reviewers/my-department 응답 항목 */
export interface SectionReviewer {
  id: number
  deptCd: string
  reviewerEmployeeId: string
  name: string
  rollNm: string
  deptNm: string
  reviewStage: number
  assignedBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}

/** POST /api/section-reviewers, PUT /api/section-reviewers/{id} 요청 바디 */
export interface SectionReviewerRequest {
  deptCd: string
  sectionName: string        // 팀명 (deptNm)
  reviewerEmployeeId: string // 심사자 사번
  reviewStage: number
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

/** 실제 API 상태값과 동일 */
export type IdeaStatus = '심사대기' | '승인' | '반려' | '실행중' | '완료'

export interface Idea {
  id: number
  title: string
  submitter: string
  department: string
  deptCd: string
  submittedAt: string
  status: IdeaStatus
}

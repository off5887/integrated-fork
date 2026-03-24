import type { OrgMember } from '@/api/types/reviewer'

// ─── 이모지 ───────────────────────────────────────────────────────────────────

export interface EmojiGroup {
  label: string
  emojis: string[]
}

// ─── 사용자 관리 ─────────────────────────────────────────────────────────────

export interface User {
  id: number
  name: string
  employeeNumber: string
  email: string
  role: 'user' | 'reviewer' | 'admin'
  position: string
  department: string
  active: boolean
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

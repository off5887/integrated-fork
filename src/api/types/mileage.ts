import type { MileageTheme } from '@/theme/mileageTheme'

// ── API 응답 타입 ────────────────────────────────────────────────────────────

export type MileageType = 'idea' | 'special'
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected'

/** GET /api/mileages, /api/mileages/me, /api/mileages/users/{id} 응답 항목 */
export interface MileageRecord {
  mileageId: number
  employeeId: string
  ideaId: number | null
  points: number
  type: MileageType
  reason: string
  awardedBy: string | null
  awardDate: string
  createdAt: string
}

/** GET /api/mileage-withdrawals, /api/mileage-withdrawals/me 응답 항목 */
export interface WithdrawalRecord {
  withdrawalId: number
  employeeId: string
  requestPoints: number
  status: WithdrawalStatus
  adminComment: string | null
  processedBy: string | null
  requestDate: string
  processedDate: string | null
  createdAt: string
}

/** POST /api/mileages/grant 요청 바디 */
export interface GrantMileageRequest {
  employeeId: string
  points: number
  reason: string
}

/** POST /api/mileage-withdrawals 요청 바디 */
export interface WithdrawalRequest {
  requestPoints: number
}

/** PUT /api/mileage-withdrawals/{id}/approve|reject 요청 바디 */
export interface WithdrawalActionRequest {
  adminComment?: string
}

/** API status → 한국어 레이블 */
export const WITHDRAWAL_STATUS_KR: Record<WithdrawalStatus, '신청중' | '완료' | '반려'> = {
  pending:  '신청중',
  approved: '완료',
  rejected: '반려',
}

/** MileageRecord → AwardItem 변환 */
export function toAwardItem(r: MileageRecord): AwardItem {
  return {
    id: r.mileageId,
    paymentDate: r.awardDate.split('T')[0],
    detail: r.reason,
    fish: r.points,
    status: r.type === 'special' ? '특별' : '일반',
  }
}

/** WithdrawalRecord → ExchangeItem 변환 */
export function toExchangeItem(r: WithdrawalRecord): ExchangeItem {
  return {
    id: r.withdrawalId,
    requestDate: r.requestDate.split('T')[0],
    amount: r.requestPoints,
    cashAmount: r.requestPoints * 100,
    status: WITHDRAWAL_STATUS_KR[r.status],
  }
}

/** MileageRecord → UserAwardItem 변환 */
export function toUserAwardItem(r: MileageRecord): UserAwardItem {
  return {
    id: r.mileageId,
    awardedAt: r.awardDate.split('T')[0],
    ideaTitle: r.ideaId != null ? `아이디어 #${r.ideaId}` : r.reason,
    reason: r.reason,
    fish: r.points,
  }
}

export interface StatCardConfig {
  label: string
  unit: string
  icon: string
  colorKey: keyof Pick<MileageTheme, 'primaryColor' | 'statusSuccessColor' | 'statusWarningColor'>
  getSub: (value: number) => string
}

export interface AwardItem {
  id: number
  paymentDate: string
  detail: string
  fish: number
  status: string
  score?: number
}

export interface ExchangeItem {
  id: number
  requestDate: string
  amount: number
  cashAmount: number
  status: string
}

export interface UserAwardItem {
  id: number
  awardedAt: string
  ideaTitle: string
  reason: string
  fish: number
}

export interface AdminExchangeItem {
  id: number
  employeeId: string
  requestDate: string
  name: string
  department: string
  position: string
  employeeNumber: string
  amount: number
  cashAmount: number
  status: '신청중' | '완료' | '반려'
}

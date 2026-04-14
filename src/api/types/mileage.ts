import type { MileageTheme } from '@/theme/mileageTheme'

// ── API 응답 타입 ────────────────────────────────────────────────────────────

/** GET /api/mileages/me/summary 응답 */
export interface MileageSummary {
  totalMileage: number        // 보유 마일리지 (승인 환전분 차감 후)
  pendingMileage: number      // 신청중인 마일리지 (아직 차감 안 된)
  availableMileage: number    // 환전 신청 가능 (totalMileage - pendingMileage)
  thisMonthMileage: number    // 이달 받은 마일리지
  thisMonthWithdrawal: number // 이달 환전 신청 마일리지
}

export type MileageType = 'idea' | 'special'
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected'

/** GET /api/mileages, /api/mileages/me, /api/mileages/users/{id} 응답 항목 */
export interface MileageRecord {
  mileageId: number
  employeeId: string
  ideaId: number | null
  ideaTitle: string | null   // type=idea일 때 연결된 아이디어 제목
  ideaScore: number | null   // type=idea일 때 심사 점수
  points: number
  type: MileageType
  reason: string
  awardedBy: string | null
  awardDate: string
}

/** GET /api/mileage-withdrawals, /api/mileage-withdrawals/me 응답 항목 */
export interface WithdrawalRecord {
  withdrawalId: number
  employeeId: string
  requestPoints: number
  cashAmount: number          // requestPoints × 100원 (서버 계산값)
  status: WithdrawalStatus
  adminComment: string | null
  processedBy: string | null
  requestDate: string
  processedDate: string | null
  createdAt: string
}

/** GET /api/mileage-withdrawals/statuses 응답 */
export type WithdrawalStatusesData = Record<WithdrawalStatus, string>

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
    detail: r.ideaTitle ?? r.reason,
    fish: r.points,
    status: r.type === 'special' ? '특별' : '일반',
    score: r.ideaScore ?? undefined,
  }
}

/** WithdrawalRecord → ExchangeItem 변환 */
export function toExchangeItem(r: WithdrawalRecord): ExchangeItem {
  return {
    id: r.withdrawalId,
    requestDate: r.requestDate.split('T')[0],
    amount: r.requestPoints,
    cashAmount: r.cashAmount,
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
  key: keyof MileageSummary
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

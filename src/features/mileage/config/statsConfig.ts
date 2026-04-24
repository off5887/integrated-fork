// src/features/mileage/config/statsConfig.ts
import type { StatCardConfig } from '@/api/types/mileage'

export type { StatCardConfig }

/** 보유 현황 메인 카드 3개 */
export const STAT_CARD_CONFIGS: StatCardConfig[] = [
  {
    label:    '보유 생선',
    unit:     '마리',
    icon:     '🐟',
    key:      'totalMileage',
    colorKey: 'primaryColor',
    getSub:   (v) => `현금 환산 ≈ ${(v * 100).toLocaleString()}원`,
  },
  {
    label:    '신청중인 생선',
    unit:     '마리',
    icon:     '⏳',
    key:      'pendingMileage',
    colorKey: 'statusWarningColor',
    getSub:   (v) => v > 0 ? '처리 대기 중' : '신청 중인 내역 없음',
  },
  {
    label:    '환전 가능 생선',
    unit:     '마리',
    icon:     '✅',
    key:      'availableMileage',
    colorKey: 'statusSuccessColor',
    getSub:   (v) => `현금 환산 ≈ ${(v * 100).toLocaleString()}원`,
  },
]

/** 이달 요약 보조 항목 2개 */
export const MONTHLY_STAT_CONFIGS: StatCardConfig[] = [
  {
    label:    '이달에 잡은 생선',
    unit:     '마리',
    icon:     '🌱',
    key:      'thisMonthMileage',
    colorKey: 'statusSuccessColor',
    getSub:   () => '이번 달 누적 획득량',
  },
  {
    label:    '이달에 신청한 생선',
    unit:     '마리',
    icon:     '💰',
    key:      'thisMonthWithdrawal',
    colorKey: 'statusWarningColor',
    getSub:   (v) => `현금 환산 ≈ ${(v * 100).toLocaleString()}원`,
  },
]

// src/features/mileage/config/statsConfig.ts
import type { StatCardConfig } from '@/api/types/mileage'

export type { StatCardConfig }

export const STAT_CARD_CONFIGS: StatCardConfig[] = [
  {
    label:    '내가 잡은 생선',
    unit:     '마리',
    icon:     '🐟',
    colorKey: 'primaryColor',
    getSub:   (v) => `현금 환산 ≈ ${(v * 100).toLocaleString()}원`,
  },
  {
    label:    '이달에 잡은 생선',
    unit:     '마리',
    icon:     '🌱',
    colorKey: 'statusSuccessColor',
    getSub:   () => '이번 달 누적 획득량',
  },
  {
    label:    '이달에 바꾼 생선',
    unit:     '마리',
    icon:     '💰',
    colorKey: 'statusWarningColor',
    getSub:   (v) => `현금 환산 ≈ ${(v * 100).toLocaleString()}원`,
  },
]

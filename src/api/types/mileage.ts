import type { MileageTheme } from '@/theme/mileageTheme'

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
  requestDate: string
  name: string
  department: string
  position: string
  employeeNumber: string
  amount: number
  cashAmount: number
  status: '신청중' | '완료' | '반려'
}

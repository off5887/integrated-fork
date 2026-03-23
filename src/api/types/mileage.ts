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

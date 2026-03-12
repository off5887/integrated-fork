export interface AwardItem {
  id: number
  paymentDate: string
  detail: string
  fish: number
  status: string
}

export interface ExchangeItem {
  id: number
  requestDate: string
  amount: number
  cashAmount: number
  status: string
}

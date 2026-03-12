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

// 마일리지 수상내역
export const awardData: AwardItem[] = [
  { id: 1,  paymentDate: '2026-01-15', detail: '제안 채택',   fish: 50,  status: '미전환' },
  { id: 2,  paymentDate: '2026-01-20', detail: '실행 완료',   fish: 100, status: '전환완료' },
  { id: 3,  paymentDate: '2026-02-05', detail: '팀 기여',     fish: 30,  status: '전환요청중' },
  { id: 4,  paymentDate: '2026-02-10', detail: '아이디어 등록', fish: 20, status: '미전환' },
  { id: 5,  paymentDate: '2026-02-12', detail: '부문장 결재', fish: 80,  status: '전환완료' },
  { id: 6,  paymentDate: '2026-02-15', detail: '실행 요청',   fish: 60,  status: '미전환' },
  { id: 7,  paymentDate: '2026-02-18', detail: '팀장 검토',   fish: 40,  status: '전환요청중' },
  { id: 8,  paymentDate: '2026-02-20', detail: '제안 채택',   fish: 50,  status: '미전환' },
  { id: 9,  paymentDate: '2026-02-25', detail: '실행 완료',   fish: 100, status: '전환완료' },
  { id: 10, paymentDate: '2026-03-01', detail: '팀 기여',     fish: 30,  status: '전환요청중' },
]

// 환전 신청내역
export const exchangeData: ExchangeItem[] = [
  { id: 1, requestDate: '2026-01-25', amount: 180, cashAmount: 18000, status: '완료' },
  { id: 2, requestDate: '2026-02-28', amount: 70,  cashAmount: 7000,  status: '완료' },
  { id: 3, requestDate: '2026-03-05', amount: 30,  cashAmount: 3000,  status: '신청중' },
]

// 기존 호환용
export const data = awardData

// src/data.ts
export const data = [
  {
    id: 1,
    paymentDate: '2026-01-15',
    detail: '제안 채택',
    fish: 50,
    status: '미전환',
  },
  {
    id: 2,
    paymentDate: '2026-01-20',
    detail: '실행 완료',
    fish: 100,
    status: '전환완료',
  },
  {
    id: 3,
    paymentDate: '2026-02-05',
    detail: '팀 기여',
    fish: 30,
    status: '전환요청중',
  },
  {
    id: 4,
    paymentDate: '2026-02-10',
    detail: '아이디어 등록',
    fish: 20,
    status: '미전환',
  },
  {
    id: 5,
    paymentDate: '2026-02-12',
    detail: '부문장 결재',
    fish: 80,
    status: '전환완료',
  },
  {
    id: 6,
    paymentDate: '2026-02-15',
    detail: '실행 요청',
    fish: 60,
    status: '미전환',
  },
  {
    id: 7,
    paymentDate: '2026-02-18',
    detail: '팀장 검토',
    fish: 40,
    status: '전환요청중',
  },
  {
    id: 8,
    paymentDate: '2026-02-20',
    detail: '제안 채택',
    fish: 50,
    status: '미전환',
  },
  {
    id: 9,
    paymentDate: '2026-02-25',
    detail: '실행 완료',
    fish: 100,
    status: '전환완료',
  },
  {
    id: 10,
    paymentDate: '2026-03-01',
    detail: '팀 기여',
    fish: 30,
    status: '전환요청중',
  },
  // 추가 데이터로 페이징 테스트용
  // ... (총 50개 정도 추가하면 페이징 잘 됨)
] as const

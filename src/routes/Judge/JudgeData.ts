// src/data/judgeData.ts
export interface Proposal {
  id: number
  title: string
  problem: string
  solution: string
  proposers: string[]
  reviewer: string
  startDate: string
  endDate: string
  scope: string
  executionPlan: string
  attachments: { name: string; url: string }[]
  status: '심사대기' | '심사중' | '승인' | '반려'
  submittedAt: string
}

export const judgeData: Proposal[] = [
  {
    id: 101,
    title: '생산라인 LED 조명 교체로 전기요금 절감',
    problem: '현재 형광등 사용으로 전기요금 과다 발생',
    solution: 'LED 교체 시 연간 1,200만원 절감 예상',
    proposers: ['김개발', '이생산'],
    reviewer: '박부장',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    scope: '전사',
    executionPlan: '1단계: 견적 수집\n2단계: 시범 설치\n3단계: 전체 교체',
    attachments: [
      { name: '견적서.pdf', url: '#' },
      { name: '절감효과.xlsx', url: '#' },
    ],
    status: '심사대기',
    submittedAt: '2026-02-20',
  },
  {
    id: 102,
    title: '사내 카페 메뉴 다양화 제안',
    problem: '메뉴 단조로워 직원 만족도 낮음',
    solution: '계절 메뉴 + 건강식 추가',
    proposers: ['최복지'],
    reviewer: '김과장',
    startDate: '2026-04-01',
    endDate: '2026-12-31',
    scope: '본사',
    executionPlan: '설문 → 메뉴 선정 → 시범 운영',
    attachments: [{ name: '설문결과.pdf', url: '#' }],
    status: '심사중',
    submittedAt: '2026-02-22',
  },
  {
    id: 103,
    title: '사무실 공기청정기 추가 설치',
    problem: '미세먼지 농도 높아 직원 건강 우려',
    solution: '고성능 공기청정기 10대 설치',
    proposers: ['박안전', '최환경'],
    reviewer: '이부장',
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    scope: '본사 5층',
    executionPlan: '입찰 → 설치 → 성능 테스트',
    attachments: [{ name: '미세먼지_측정데이터.pdf', url: '#' }],
    status: '심사대기',
    submittedAt: '2026-02-25',
  },
  {
    id: 104,
    title: '재택근무 확대를 위한 화상회의 시스템 업그레이드',
    problem: '현재 시스템 화질·지연 문제로 회의 효율 저하',
    solution: 'Zoom Enterprise → Microsoft Teams Premium 도입',
    proposers: ['김개발', '박인사'],
    reviewer: '최이사',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    scope: '전사',
    executionPlan: '벤더 비교 → 계약 → 직원 교육 → 전환',
    attachments: [{ name: '비교표.xlsx', url: '#' }],
    status: '승인',
    submittedAt: '2026-02-10',
  },
  {
    id: 105,
    title: '사내 헬스케어 프로그램 도입',
    problem: '직원 건강관리 부족으로 결근 증가',
    solution: '매월 건강검진 + 운동 클래스 운영',
    proposers: ['이복지'],
    reviewer: '박인사',
    startDate: '2026-07-01',
    endDate: '2027-06-30',
    scope: '본사',
    executionPlan: '업체 선정 → 프로그램 구성 → 시범 운영',
    attachments: [{ name: '제안서.pdf', url: '#' }],
    status: '반려',
    submittedAt: '2026-02-18',
  },
]
